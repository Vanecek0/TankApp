import dbInstance from "./database"

export interface DatabaseModel {
    id?: number
    created_at?: number
    updated_at?: number
}

export interface QueryOptions {
    where?: Record<string, any>
    orderBy?: string
    limit?: number
    offset?: number
}

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

export default abstract class BaseRepository<T extends DatabaseModel> {
    protected abstract tableName: string
    protected abstract columns: string[]

    protected buildWhereClause(where?: Record<string, any>): { clause: string; params: any[] } {
        if (!where || Object.keys(where).length === 0) {
            return { clause: "", params: [] }
        }

        const conditions: string[] = []
        const params: any[] = []

        Object.entries(where).forEach(([key, value]) => {
            if (value === null) {
                conditions.push(`${key} IS NULL`)
            } else if (Array.isArray(value)) {
                conditions.push(`${key} IN (${value.map(() => "?").join(", ")})`)
                params.push(...value)
            } else {
                conditions.push(`${key} = ?`)
                params.push(value)
            }
        })

        return {
            clause: `WHERE ${conditions.join(" AND ")}`,
            params,
        }
    }

    protected buildOrderClause(orderBy?: string): string {
        return orderBy ? `ORDER BY ${orderBy}` : ""
    }

    protected buildLimitClause(limit?: number, offset?: number): string {
        let clause = ""
        if (limit) {
            clause += `LIMIT ${limit}`
            if (offset) {
                clause += ` OFFSET ${offset}`
            }
        }
        return clause
    }

    async findAll(options: QueryOptions = {}): Promise<DatabaseListResult<T>> {
        try {
            const { clause: whereClause, params } = this.buildWhereClause(options.where)
            const orderClause = this.buildOrderClause(options.orderBy)
            const limitClause = this.buildLimitClause(options.limit, options.offset)

            const sql = `
        SELECT ${this.columns.join(", ")} 
        FROM ${this.tableName} 
        ${whereClause} 
        ${orderClause} 
        ${limitClause}
      `.trim()

            const data = await dbInstance.query<T>(sql, params)
            let count: number | undefined
            if (options.limit) {
                const countSql = `SELECT COUNT(*) as count FROM ${this.tableName} ${whereClause}`
                const countResult = await dbInstance.queryFirst<{ count: number }>(countSql, params)
                count = countResult?.count || 0
            }

            return { success: true, data, count }
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
        }
    }

    async findById(id: number): Promise<DatabaseResult<T>> {
        try {
            const sql = `SELECT ${this.columns.join(", ")} FROM ${this.tableName} WHERE id = ?`
            const data = await dbInstance.queryFirst<T>(sql, [id])
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

            const sql = `SELECT ${this.columns.join(", ")} FROM ${this.tableName} ${whereClause} LIMIT 1`
            const row = await dbInstance.queryFirst<T>(sql, values)

            return { success: true, data: row ?? undefined }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error"
            }
        }
    }

    async findBy(filters: Partial<Record<keyof T, any>>): Promise<DatabaseResult<T[]>> {
        try {
            const keys = Object.keys(filters)
            if (keys.length === 0) {
                throw new Error("No filter conditions provided")
            }

            const whereClause = keys.map((key) => `${key} = ?`).join(" AND ")
            const values = keys.map((key) => filters[key as keyof T])

            const sql = `SELECT ${this.columns.join(", ")} FROM ${this.tableName} WHERE ${whereClause}`
            const rows = await dbInstance.query<T>(sql, values)

            return { success: true, data: rows }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error"
            }
        }
    }

    async findByColumn(id: number): Promise<DatabaseResult<T>> {
        try {
            const sql = `SELECT ${this.columns.join(", ")} FROM ${this.tableName} WHERE id = ?`
            const data = await dbInstance.queryFirst<T>(sql, [id])
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
        INSERT INTO ${this.tableName} (${columns.join(", ")}, created_at, updated_at) 
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
        UPDATE ${this.tableName} 
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
            const sql = `DELETE FROM ${this.tableName} WHERE id = ?`
            const result = await dbInstance.executeSql(sql, [id])
            return { success: true, data: result.changes > 0 }
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
        }
    }
}