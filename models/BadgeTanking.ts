import BaseModel from "@/database/base-model"

export type BadgeTanking = {
    id?: number
    id_badge: number
    id_tanking: number
}

export const badgeTankingColumns: (keyof Omit<BadgeTanking, "id">)[] = [
    "id_badge",
    "id_tanking"
]

export class BadgeTankingModel extends BaseModel {
    static tableName = "badge_tanking"
    static columns = badgeTankingColumns

    static async create(badgeTanking: Omit<BadgeTanking, "id">) {
        const columns = badgeTankingColumns.join(", ")
        const placeholders = badgeTankingColumns.map(() => "?").join(", ")
        const values = badgeTankingColumns.map((key) => badgeTanking[key])

        const sql = `INSERT OR REPLACE INTO badge_tanking (${columns}) VALUES (${placeholders})`
        return this.execute(sql, values)
    }

    static all(): Promise<BadgeTanking[]> {
        const sql = `
      SELECT bt.*
      FROM badge_tanking bt
      INNER JOIN badge b ON bt.id_badge = b.id
      INNER JOIN tanking t ON bt.id_tanking = t.id
    `
        return this.query<BadgeTanking>(sql)
    }

    static findById(id: number): Promise<BadgeTanking | null> {
        return this.queryFirst<BadgeTanking>("SELECT * FROM badge_tanking WHERE id = ?", [id])
    }

    static delete(id: number) {
        return this.execute("DELETE FROM badge_tanking WHERE id = ?", [id])
    }

    static count(): Promise<number> {
        return super.count("badge_tanking")
    }
}