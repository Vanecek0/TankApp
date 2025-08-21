import Database from "./database"
import type { SQLiteDatabase } from "expo-sqlite"

export default abstract class BaseModel {
  protected static async getDb(): Promise<SQLiteDatabase> {
    return Database.getConnection()
  }

  protected static async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    const db = await this.getDb()
    return db.getAllAsync<T>(sql, params)
  }

  protected static async queryFirst<T>(sql: string, params: any[] = []): Promise<T | null> {
    const db = await this.getDb()
    const result = await db.getFirstAsync<T>(sql, params)
    return result ?? null
  }

  protected static async execute(sql: string, params: any[] = []) {
    const db = await this.getDb()
    return db.runAsync(sql, params)
  }

  protected static async count(tableName: string, where?: string, params: any[] = []): Promise<number> {
    const whereClause = where ? `WHERE ${where}` : ""
    const sql = `SELECT COUNT(*) AS count FROM ${tableName} ${whereClause}`
    const result = await this.queryFirst<{ count: number }>(sql, params)
    return result?.count ?? 0
  }
}