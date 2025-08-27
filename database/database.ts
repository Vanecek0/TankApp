import Config from "react-native-config"
import * as SQLite from "expo-sqlite"

const DB_NAME = Config.DB_NAME ?? "database.db"

export default abstract class Database {
  private static dbInstance: SQLite.SQLiteDatabase | null = null
  private static dbOpeningPromise: Promise<SQLite.SQLiteDatabase> | null = null

  static async getConnection(): Promise<SQLite.SQLiteDatabase> {
    if (this.dbInstance) {
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

    return await this.dbOpeningPromise
  }

  static async executeSql(sql: string, params: any[] = []): Promise<SQLite.SQLiteRunResult> {
    const db = await this.getConnection();

    try {
      return await db.runAsync(sql, params);
    } catch (error) {
      console.error("Execute failed:", error);
      throw error;
    }
  }

  static async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    if (!this.dbInstance) throw new Error("Database not initialized")
    return this.dbInstance.getAllAsync<T>(sql, params)
  }

  static async queryFirst<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    if (!this.dbInstance) throw new Error("Database not initialized")
    const result = await this.dbInstance.getFirstAsync<T>(sql, params)
    return result ?? null
  }

  static async count(tableName: string): Promise<number> {
    const row = await this.queryFirst<{ count: number }>(`SELECT COUNT(*) as count FROM ${tableName}`)
    return row?.count ?? 0
  }

}