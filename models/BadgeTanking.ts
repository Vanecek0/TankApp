export interface IBadgeTanking {
    id?: number
    id_badge: number
    id_tanking: number
}

export class BadgeTanking implements IBadgeTanking {
    id?: number
    id_badge!: number
    id_tanking!: number

    static tableName = "badge_tanking"

    static columns: (keyof BadgeTanking)[] = [
        "id",
        "id_badge",
        "id_tanking"
    ]
}