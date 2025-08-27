import BaseModel from "./base-model"
import dbInstance from "./database"

export type DatabaseListResult<T> = {
    success: boolean
    data?: T[]
    count?: number
    error?: string
}

export type DatabaseResult<T> = {
    success: boolean
    data?: T
    error?: string
}

export default abstract class BaseRepository<M extends typeof BaseModel, T> {
    protected model: M;

    constructor(model: M) {
        this.model = model;
    }

  
/*
    async findAll(
        options: {
            where?: Record<string, any>
            orderBy?: string
            limit?: number
            offset?: number
        } = {}
    ): Promise<DatabaseListResult<T>> {
        try {
            const { clause: whereClause, params } = this.buildWhereClause(options.where)
            const orderClause = this.buildOrderClause(options.orderBy)
            const limitClause = this.buildLimitClause(options.limit, options.offset)

            const sql = `
        SELECT ${this.model.columns.join(", ")} 
        FROM ${this.model.tableName} 
        ${whereClause} 
        ${orderClause} 
        ${limitClause}
      `.trim()

            const data = await this.model.query<T>(sql, params)
            let count: number | undefined
            if (options.limit) {
                const countSql = `SELECT COUNT(*) as count FROM ${this.model.tableName} ${whereClause}`
                const countResult = await this.model.queryFirst<{ count: number }>(countSql, params)
                count = countResult?.count || 0
            }

            return { success: true, data, count }
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
        }
    }

    async findById(id: number): Promise<DatabaseResult<T>> {
        try {
            const sql = `SELECT ${this.model.columns.join(", ")} FROM ${this.model.tableName} WHERE id = ?`
            const data = await this.model.queryFirst<T>(sql, [id])
            return { success: true, data: data || undefined }
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
        }
    }

    async findFirst(filters?: Partial<Record<keyof T, any>>): Promise<DatabaseResult<T>> {
        try {
            let whereClause = ""
            let values: any[] = []

            if (filters && Object.keys(filters).length > 0) {
                const keys = Object.keys(filters)
                whereClause = "WHERE " + keys.map((key) => `${key} = ?`).join(" AND ")
                values = keys.map((key) => filters[key as keyof T])
            }

            const sql = `SELECT ${this.model.columns.join(", ")} FROM ${this.model.tableName} ${whereClause} LIMIT 1`
            const row = await this.model.queryFirst<T>(sql, values)

            return { success: true, data: row ?? undefined }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error"
            }
        }
    }

    async findBy(where: Partial<Record<string, any>>): Promise<DatabaseListResult<T>> {
        const keys = Object.keys(where)
        if (keys.length === 0) {
            return { success: false, error: "Empty where clause" }
        }

        const conditions = keys.map((k) => `${k} = ?`).join(" AND ")
        const values = keys.map((k) => where[k])
        const sql = `SELECT * FROM ${this.model.tableName} WHERE ${conditions}`

        try {
            const data = await this.model.query<T>(sql, values)
            return { success: true, data }
        } catch (e: any) {
            return { success: false, error: e.message }
        }
    }

    async findByColumn(id: number): Promise<DatabaseResult<T>> {
        try {
            const sql = `SELECT ${this.model.columns.join(", ")} FROM ${this.model.tableName} WHERE id = ?`
            const data = await this.model.queryFirst<T>(sql, [id])
            return { success: true, data: data || undefined }
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
        }
    }

    async create(data: Omit<T, "id" | "created_at" | "updated_at">): Promise<DatabaseResult<T>> {
        try {
            const columns = Object.keys(data)
            const placeholders = columns.map(() => "?").join(", ")
            const values = Object.values(data)

            const sql = `
        INSERT INTO ${this.model.tableName} (${columns.join(", ")}, created_at, updated_at) 
        VALUES (${placeholders}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `

            const result = await dbInstance.executeSql(sql, values)

            if (result.lastInsertRowId) {
                const created = await this.findById(result.lastInsertRowId)
                return created
            }

            return { success: false, error: "Failed to create record" }
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
        }
    }

    async update(id: number, data: Partial<Omit<T, "id" | "created_at" | "updated_at">>): Promise<DatabaseResult<T>> {
        try {
            const columns = Object.keys(data)
            const setClause = columns.map((col) => `${col} = ?`).join(", ")
            const values = [...Object.values(data), id]

            const sql = `
        UPDATE ${this.model.tableName} 
        SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `

            await dbInstance.executeSql(sql, values)
            const updated = await this.findById(id)
            return updated
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
        }
    }

    async delete(id: number): Promise<DatabaseResult<boolean>> {
        try {
            const sql = `DELETE FROM ${this.model.tableName} WHERE id = ?`
            const result = await dbInstance.executeSql(sql, [id])
            return { success: true, data: result.changes > 0 }
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
        }
    }*/
}