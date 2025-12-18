import Database from "../database"
import { SQLiteBindValue, SQLiteDatabase, SQLiteRunResult } from "expo-sqlite";

export interface IDatabaseRepository {
    create(t: object): Promise<boolean>;
    update(row: Partial<object>, where: Record<string, any>): Promise<boolean>;
    delete(where: Record<string, any>): Promise<boolean>;
}

type WhereConditionValue =
    | [operator: "AND" | "OR", value: any]
    | [operator: string, value: any]
    | string
    | any;

type Where<T> = {
    [K in keyof T]?: WhereConditionValue
};

type OrderDirection = "ASC" | "DESC";
type OrderBy<T extends object> =
    | { column: keyof T & string; direction?: OrderDirection }
    | Array<{ column: keyof T & string; direction?: OrderDirection }>;


export default abstract class DatabaseRepository<T extends object> implements IDatabaseRepository {
    protected abstract tableName: string;
    protected abstract columns: string[];
    protected abstract modelClass: new () => T;

    private static dbInstance: SQLiteDatabase | null = null

    public static async getDb(): Promise<SQLiteDatabase> {
        if (!this.dbInstance) {
            this.dbInstance = await Database.getConnection()
        }
        return this.dbInstance
    }

    async select(
        where: Where<T> = {},
        columns?: string[],
        orderBy?: OrderBy<T>,
        limit?: number
    ): Promise<T[]> {
        const db = await DatabaseRepository.getDb();

        const cols =
            columns?.length
                ? columns.join(", ")
                : this.columns.length
                    ? this.columns.join(", ")
                    : "*";

        const validCols = new Set(this.columns as string[]);

        let sql = `SELECT ${cols} FROM ${this.tableName}`;
        const values: any[] = [];
        const conditions: string[] = [];

        for (const [key, val] of Object.entries(where)) {
            if (Array.isArray(val)) {
                const [operator, v] = val;
                conditions.push(`${key} ${operator} ?`);
                values.push(v);
            } else if (typeof val === "string" && val.toUpperCase().includes("NULL")) {
                conditions.push(`${key} ${val}`);
            } else {
                conditions.push(`${key} = ?`);
                values.push(val);
            }
        }

        if (conditions.length > 0) {
            sql += " WHERE " + conditions.join(" AND ");
        }

        if (orderBy) {
            const orders = Array.isArray(orderBy) ? orderBy : [orderBy];

            const orderFragments = orders.map(({ column, direction }) => {
                if (!validCols.has(column)) {
                    throw new Error(`Invalid ORDER BY column: ${column}`);
                }
                const dir = (direction ?? "ASC").toUpperCase();
                return `${column} ${dir === "DESC" ? "DESC" : "ASC"}`;
            });

            if (orderFragments.length) {
                sql += " ORDER BY " + orderFragments.join(", ");
            }
        }

        if (typeof limit === "number") {
            sql += " LIMIT " + limit;
        }

        const rows = await db.getAllAsync<any>(sql, values);
        return rows.map(row => Object.assign(new this.modelClass(), row));
    }

    async insert<T extends object>(
        row: Partial<Omit<T, "id">>
    ): Promise<SQLiteRunResult> {
        const db = await DatabaseRepository.getDb()

        const keys = Object.keys(row)
        if (keys.length === 0) {
            throw new Error("insert requires at least one column")
        }

        const columnsClause = keys.join(", ")
        const placeholders = keys.map(() => "?").join(", ")
        const values = Object.values(row) as SQLiteBindValue[]

        const sql = `INSERT INTO ${this.tableName} (${columnsClause}) VALUES (${placeholders})`
        const inserting = await db.runAsync(sql, values)
        console.log(sql);
        return inserting;
    }

    async create(t: object): Promise<boolean> {
        return (await this.insert(t)).changes > 0
    }

    async update(
        row: Partial<object>,
        where: Record<string, any> = {}
    ): Promise<boolean> {
        const db = await DatabaseRepository.getDb()

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
        return (await db.runAsync(sql, values)).changes > 0
    }

    async delete(
        where: Record<string, any> = {}
    ): Promise<boolean> {
        const db = await DatabaseRepository.getDb()

        let sql = `DELETE FROM ${this.tableName}`

        const values: any[] = []
        if (Object.keys(where).length > 0) {
            const conditions = Object.keys(where).map(key => `${key} = ?`)
            sql += " WHERE " + conditions.join(" AND ")
            values.push(...Object.values(where))
        }

        return (await db.runAsync(sql, values)).changes > 0
    }

    async count(
    ): Promise<number> {
        const sql = `SELECT COUNT(*) as count FROM ${this.tableName}`
        const result = await (await DatabaseRepository.getDb()).getAllAsync<{ count: number }>(sql)
        return result[0].count
    }

}