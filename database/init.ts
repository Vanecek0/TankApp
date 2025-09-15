// database/init.ts
import { SQLiteDatabase } from "expo-sqlite";
import Database from "./database"
import { seed } from "./seeders/seed"
import { createTables } from "./migrations/001_create_tables";

export async function initializeDemoDatabase() {
    const db = await Database.getConnection()
    await resetDatabase(db);
    await init(db);
    await seedData(db);
}

async function resetDatabase(db: SQLiteDatabase) {
    try {
        await db.execAsync(`PRAGMA foreign_keys = OFF;`)
        await db.execAsync(`BEGIN IMMEDIATE TRANSACTION;`)

        const views = await db.getAllAsync<{ name: string }>(`
        SELECT name FROM sqlite_master
        WHERE type = 'view' AND name NOT LIKE 'sqlite_%';
      `)

        for (const { name } of views) {
            await db.execAsync(`DROP VIEW IF EXISTS "${name}";`)
        }

        const tables = await db.getAllAsync<{ name: string }>(`
        SELECT name FROM sqlite_master
        WHERE type = 'table' AND name NOT LIKE 'sqlite_%';
      `)

        for (const { name } of tables) {
            await db.execAsync(`DROP TABLE IF EXISTS "${name}";`)
        }

        await db.execAsync(`COMMIT;`)
        await db.execAsync(`PRAGMA foreign_keys = ON;`)
    } catch (error) {
        console.error("Database reset failed, rolling back:", error)
        try {
            await db.execAsync("ROLLBACK;")
        } catch (rollbackError) {
            console.error("Rollback failed:", rollbackError)
        }
        throw error
    }
}

async function init(db: SQLiteDatabase) {
    try {
        await db.execAsync(`PRAGMA foreign_keys = ON;`)
        await db.execAsync(`BEGIN TRANSACTION;`)
        await createTables(db)
        await db.execAsync(`COMMIT;`)
    } catch (error) {
        await db.execAsync(`ROLLBACK;`)
        console.error("Database init failed:", error)
        throw error
    }
}

async function seedData(db: SQLiteDatabase) {
    try {
        await db.runAsync("PRAGMA foreign_keys = ON;")
        await seed(db)
    } catch (error) {
        console.error("Failed to seed database:", error)
        throw error
    }
}