import Database from "../database"
import type { SQLiteBindValue, SQLiteDatabase, SQLiteRunResult } from "expo-sqlite"

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

  protected static async select<T extends object>(
    this: { new(): T; tableName: string; columns: string[] },
    where: Record<string, any> = {}, limit?: number
  ): Promise<T[]> {
    const db = await BaseModel.getDb()

    const columnsClause = this.columns.length > 0 ? this.columns.join(", ") : "*"

    let sql = `SELECT ${columnsClause} FROM ${this.tableName}`

    const values: any[] = []
    if (Object.keys(where).length > 0) {
      const conditions = Object.keys(where).map(key => `${key} = ?`)
      sql += " WHERE " + conditions.join(" AND ")
      values.push(...Object.values(where))
    }

    if (limit) {
      sql += " LIMIT " + limit
    }

    const rows = await db.getAllAsync<any>(sql, values)
    return rows.map(row => Object.assign(new this(), row))
  }

  protected static async insert<T extends object>(
    this: { new(): T; tableName: string },
    row: Partial<Omit<T, "id">>
  ): Promise<SQLiteRunResult> {
    const db = await BaseModel.getDb()

    const keys = Object.keys(row)
    if (keys.length === 0) {
      throw new Error("insert requires at least one column")
    }

    const columnsClause = keys.join(", ")
    const placeholders = keys.map(() => "?").join(", ")
    const values = Object.values(row) as SQLiteBindValue[]

    const sql = `INSERT INTO ${this.tableName} (${columnsClause}) VALUES (${placeholders})`
    return await db.runAsync(sql, values)
  }

  protected static async update<T extends object>(
    this: { new(): T; tableName: string; columns: string[] },
    row: Partial<Omit<T, "id">>,
    where: Record<string, any> = {}
  ): Promise<SQLiteRunResult> {
    const db = await BaseModel.getDb()

    const keys = Object.keys(row)
    if (keys.length === 0) {
      throw new Error("update requires at least one column")
    }

    const setClause = keys.map(k => `${k} = ?`).join(", ")
    const values = Object.values(row) as SQLiteBindValue[]

    let whereClause = ""
    if (Object.keys(where).length > 0) {
      const whereKeys = Object.keys(where)
      whereClause = " WHERE " + whereKeys.map(k => `${k} = ?`).join(" AND ")
      values.push(...Object.values(where))
    }

    const sql = `UPDATE ${this.tableName} SET ${setClause} ${whereClause}`
    return await db.runAsync(sql, values)
  }

  protected static async delete<T extends object>(
    this: { new(): T; tableName: string; columns: string[] },
    where: Record<string, any> = {}
  ): Promise<SQLiteRunResult> {
    const db = await BaseModel.getDb()

    let sql = `DELETE FROM ${this.tableName}`

    const values: any[] = []
    if (Object.keys(where).length > 0) {
      const conditions = Object.keys(where).map(key => `${key} = ?`)
      sql += " WHERE " + conditions.join(" AND ")
      values.push(...Object.values(where))
    }

    return await db.runAsync(sql, values)
  }

  protected static async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    const db = await this.getDb()
    return db.getAllAsync<T>(sql, params)
  }

  protected static async queryFirst<T>(sql: string, params: any[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params)
    return rows.length > 0 ? rows[0] : null
  }

  protected static async execute(sql: string, params: any[] = []): Promise<any> {
    const db = await this.getDb()
    return db.runAsync(sql, params)
  }

  protected static async count<T extends object>(
    this: { new(): T; tableName: string; columns: string[] },
  ): Promise<number> {
    const sql = `SELECT COUNT(*) as count FROM ${this.tableName}`
    const result = await BaseModel.query<{ count: number }>(sql)
    return result[0].count
  }
}