import Config from "react-native-config"
import * as SQLite from "expo-sqlite"
import { createTables } from "./migrations/001_create_tables"
import { seed } from "./seeders/seed"

const DB_NAME = Config.DB_NAME ?? "database.db"

export class Database {
  static dbInstance: SQLite.SQLiteDatabase | null = null
  static dbOpeningPromise: Promise<SQLite.SQLiteDatabase> | null = null

  static async getConnection(): Promise<SQLite.SQLiteDatabase> {
    if (this.dbInstance) {
      console.log("Returning existing DB instance")
      return this.dbInstance
    }

    if (!this.dbOpeningPromise) {
      console.log("Opening new DB connection...")
      this.dbOpeningPromise = SQLite.openDatabaseAsync(DB_NAME)
        .then((db) => {
          this.dbInstance = db
          return db
        })
        .catch((err) => {
          this.dbOpeningPromise = null
          console.error("Failed to open DB:", err)
          throw err
        })
    }

    const db = await this.dbOpeningPromise
    return db
  }

  static async executeSql(query: string, params?: SQLite.SQLiteBindParams) {
    const db = await this.getConnection()

    if (params === undefined) {
      return db.execAsync(query)
    } else {
      return db.runAsync(query, params)
    }
  }

  static async init() {
    try {
      await this.createTables()
      console.log("Database init complete")
    } catch (error) {
      console.error("Database init failed:", error)
      throw error
    }
  }

  static async createTables() {
    const db = await this.getConnection()
    await createTables(db)
  }

  static async seedData() {
    try {
      const db = await this.getConnection()

      const tables = await db.getAllAsync<{ name: string }>(`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name IN ('station', 'tanking', 'fuel_prices');
      `)

      console.log(
        "Available tables:",
        tables.map((t) => t.name),
      )

      await seed(db)
      console.log("Database seeding completed successfully")
    } catch (error) {
      console.error("Failed to seed database:", error)
      throw error
    }
  }

  static async resetDatabase() {
    try {
      const db = await this.getConnection()

      await db.execAsync(`PRAGMA foreign_keys = OFF;`)

      const tables = await db.getAllAsync<{ name: string }>(`
        SELECT name FROM sqlite_master
        WHERE type='table' AND name NOT LIKE 'sqlite_%';
      `)

      for (const { name } of tables) {
        await db.execAsync(`DROP TABLE IF EXISTS "${name}";`)
      }

      await db.execAsync(`PRAGMA foreign_keys = ON;`)
      console.log("Database reset complete")
    } catch (error) {
      console.error("Database reset failed:", error)
      throw error
    }
  }
}
