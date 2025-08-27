import BaseModel from "@/database/base-model"

export type Autoservice = {
    id?: number
    name: string
    address: string
    created_at: number
    updated_at: number
}

export const autoserviceColumns: (keyof Omit<Autoservice, "id">)[] = [
    "name",
    "address",
    "created_at",
    "updated_at"
]

export class AutoserviceModel extends BaseModel {
    static tableName = "autoservice"
    static columns = autoserviceColumns

    static async create(autoservice: Omit<Autoservice, "id">) {
        const columns = autoserviceColumns.join(", ")
        const placeholders = autoserviceColumns.map(() => "?").join(", ")
        const values = autoserviceColumns.map((key) => autoservice[key])

        const sql = `INSERT INTO autoservice (${columns}) VALUES (${placeholders})`
        return this.execute(sql, values)
    }

    static all(): Promise<Autoservice[]> {
        return this.query<Autoservice>("SELECT * FROM autoservice")
    }

    static findById(id: number): Promise<Autoservice | null> {
        return this.queryFirst<Autoservice>("SELECT * FROM autoservice WHERE id = ?", [id])
    }

    static async update(id: number, autoservice: Partial<Omit<Autoservice, "id">>) {
        const fields = Object.keys(autoservice)
        const values = Object.values(autoservice)
        if (fields.length === 0) return Promise.resolve()

        const setClause = fields.map((field) => `${field} = ?`).join(", ")
        const sql = `UPDATE autoservice SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        return this.execute(sql, [...values, id])
    }

    static delete(id: number) {
        return this.execute("DELETE FROM autoservice WHERE id = ?", [id])
    }

    static count(): Promise<number> {
        return super.count("autoservice")
    }
}