import type { SQLiteDatabase } from "expo-sqlite"
import * as SQLite from "expo-sqlite"

export interface Migration {
    version: number
    up: string[]
    down: string[]
}

export default abstract class DatabaseCore {
    private db: SQLiteDatabase | null = null
    private isInitialized = false

    async initialize(databaseName = "app.db"): Promise<void> {
        if (this.isInitialized) return

        try {
            this.db = await SQLite.openDatabaseAsync(databaseName)
            //await this.runMigrations()
            this.isInitialized = true
        } catch (error) {
            console.error("Database initialization failed:", error)
            throw error
        }
    }

    private async runMigrations(): Promise<void> {
        if (!this.db) throw new Error("Database not initialized")

        // Create migrations table if it doesn't exist
        await this.db.execAsync(`
          CREATE TABLE IF NOT EXISTS migrations (
            version INTEGER PRIMARY KEY,
            executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `)

        // Get current version
        const result = await this.db.getFirstAsync<{ version: number }>(`
          SELECT MAX(version) as version FROM migrations
        `)

        const currentVersion = result?.version || 0

        // Run pending migrations
        const migrations = this.getMigrations()
        for (const migration of migrations) {
            if (migration.version > currentVersion) {
                await this.runMigration(migration)
            }
        }
    }

    private async runMigration(migration: Migration): Promise<void> {
        if (!this.db) throw new Error("Database not initialized")

        try {
            await this.db.withTransactionAsync(async () => {
                for (const statement of migration.up) {
                    await this.db!.execAsync(statement)
                }
                await this.db!.runAsync("INSERT INTO migrations (version) VALUES (?)", [migration.version])
            })
            console.log(`Migration ${migration.version} completed successfully`)
        } catch (error) {
            console.error(`Migration ${migration.version} failed:`, error)
            throw error
        }
    }

    private getMigrations(): Migration[] {
        return [
            {
                version: 1,
                up: [
                    `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
              )`,
                    `CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT,
                user_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id)
              )`,
                ],
                down: ["DROP TABLE IF EXISTS posts", "DROP TABLE IF EXISTS users"],
            },
        ]
    }
}