import BaseModel from "@/database/base-model"

export type Badge = {
    id?: number
    name: string
    color: string
}

export const badgeColumns: (keyof Omit<Badge, "id">)[] = [
    "name",
    "color"
]

export class BadgeModel extends BaseModel {
    static async create(badge: Omit<Badge, "id">) {
        return this.execute(
            "INSERT INTO badge (name, color) VALUES (?, ?)",
            [badge.name, badge.color]
        )
    }

    static all(): Promise<Badge[]> {
        return this.query<Badge>("SELECT * FROM badge")
    }

    static findById(id: number): Promise<Badge | null> {
        return this.queryFirst<Badge>("SELECT * FROM badge WHERE id = ?", [id])
    }

    static delete(id: number) {
        return this.execute("DELETE FROM badge WHERE id = ?", [id])
    }

    static count(): Promise<number> {
        return super.count("badge")
    }
}