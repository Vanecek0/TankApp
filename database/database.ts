import Config from "react-native-config"
import * as SQLite from "expo-sqlite"

const DB_NAME = Config.DB_NAME ?? "db.db"

export default abstract class Database {
  private static dbInstance: SQLite.SQLiteDatabase | null = null
  private static dbOpeningPromise: Promise<SQLite.SQLiteDatabase> | null = null

  static async getConnection(): Promise<SQLite.SQLiteDatabase> {
    if (this.dbInstance) {
      return this.dbInstance
    }

    if (!this.dbOpeningPromise) {
      console.log("Opened new DB connection")
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

}