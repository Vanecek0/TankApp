import Config from "react-native-config"
import * as SQLite from "expo-sqlite"
import { createTables } from "./migrations/001_create_tables"
import { seed } from "./seeders/seed"

const DB_NAME = Config.DB_NAME ?? "database.db"

export class Database {
  static dbInstance: SQLite.SQLiteDatabase | null = null
  static dbOpeningPromise: Promise<SQLite.SQLiteDatabase> | null = null

  static async getConnection(): Promise<SQLite.SQLiteDatabase> {

    if (this.dbInstance && typeof this.dbInstance.execAsync === "function") {
      console.log("Returning existing DB instance");
      return this.dbInstance;
    }

    if (!this.dbOpeningPromise) {
      console.log("Opening new DB connection...");
      this.dbOpeningPromise = SQLite.openDatabaseAsync(DB_NAME)
        .then((db) => {
          if (typeof db.execAsync !== "function") {
            throw new Error("Invalid DB object returned from openDatabaseAsync");
          }
          this.dbInstance = db;
          return db;
        })
        .catch((err) => {
          this.dbOpeningPromise = null;
          console.error("Failed to open DB:", err);
          throw err;
        });
    }

    const db = await this.dbOpeningPromise;

    if (!db || typeof db.execAsync !== "function") {
      throw new Error("DB instance is invalid.");
    }

    return db;
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
    const db = await this.getConnection();

    try {
      console.log("Initializing database...");

      await db.execAsync(`PRAGMA foreign_keys = ON;`);
      await db.execAsync(`BEGIN TRANSACTION;`);
      await db.execAsync(`COMMIT;`);

      console.log("Database init complete");
    } catch (error) {
      await db.execAsync(`ROLLBACK;`);
      console.error("Database init failed:", error);
      throw error;
    }
  }

  static async createTables() {
    const db = await this.getConnection()
    await createTables(db)
  }

  static async seedData() {
    try {
      const db = await this.getConnection()
      await db.runAsync('PRAGMA foreign_keys = ON;')

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
      const db = await this.getConnection();

      await db.execAsync(`PRAGMA foreign_keys = OFF;`);
      await db.execAsync(`BEGIN IMMEDIATE TRANSACTION;`);

      const views = await db.getAllAsync<{ name: string }>(`
        SELECT name FROM sqlite_master
        WHERE type = 'view' AND name NOT LIKE 'sqlite_%';
      `);
      for (const { name } of views) {
        console.log(`Dropping view: ${name}`);
        await db.execAsync(`DROP VIEW IF EXISTS "${name}";`);
      }

      const tables = await db.getAllAsync<{ name: string }>(`
        SELECT name FROM sqlite_master
        WHERE type = 'table' AND name NOT LIKE 'sqlite_%';
      `);
      for (const { name } of tables) {
        console.log(`Dropping table: ${name}`);
        await db.execAsync(`DROP TABLE IF EXISTS "${name}";`);
      }

      await db.execAsync(`COMMIT;`);
      await db.execAsync(`PRAGMA foreign_keys = ON;`);

      console.log("Database reset complete");
    } catch (error) {
      console.error("Database reset failed, rolling back:", error);
      try {
        const db = await this.getConnection();
        await db.execAsync("ROLLBACK;");
      } catch (rollbackError) {
        console.error("Rollback failed:", rollbackError);
      }
      throw error;
    }
  }
}
