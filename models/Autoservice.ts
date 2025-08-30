export interface IAutoservice {
    id?: number
    name: string
    address: string
    created_at: number
    updated_at: number
}

export class Autoservice implements IAutoservice {
    id?: number
    name!: string
    address!: string
    created_at!: number
    updated_at!: number

    static tableName = "autoservice"

    static columns: (keyof Autoservice)[] = [
        "id",
        "name",
        "address",
        "created_at",
        "updated_at"
    ]
}