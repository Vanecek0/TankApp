import Database from "./database"
import type { SQLiteDatabase } from "expo-sqlite"

export default abstract class BaseModel {
  static tableName: string;
  static columns: string[];

  private static dbInstance: SQLiteDatabase | null = null

  protected static async getDb(): Promise<SQLiteDatabase> {
    if (!this.dbInstance) {
      this.dbInstance = await Database.getConnection()
    }
    return this.dbInstance
  }

  public static async select<T extends object>(
    this: { new(): T; tableName: string; columns: string[] },
    where: Record<string, any> = {}
  ): Promise<T[]> {
    const db = await Database.getConnection()

    const tableName = this.tableName
    const columnsClause = this.columns.length > 0 ? this.columns.join(", ") : "*"

    let sql = `SELECT ${columnsClause} FROM ${tableName}`

    const values: any[] = []
    if (Object.keys(where).length > 0) {
      const conditions = Object.keys(where).map(key => `${key} = ?`)
      sql += " WHERE " + conditions.join(" AND ")
      values.push(...Object.values(where))
    }

    const rows = await db.getAllAsync<any>(sql, values)

    return rows.map(row => Object.assign(new this(), row))
  }

  public static async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    const db = await this.getDb()
    return db.getAllAsync<T>(sql, params)
  }

  public static async queryFirst<T>(sql: string, params: any[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params)
    return rows.length > 0 ? rows[0] : null
  }

  public static async execute(sql: string, params: any[] = []): Promise<any> {
    const db = await this.getDb()
    return db.runAsync(sql, params)
  }

  public static async count(tableName?: string): Promise<number> {
    const sql = `SELECT COUNT(*) as count FROM ${tableName || this.tableName}`
    const result = await this.query<{ count: number }>(sql)
    return result[0].count
  }
}