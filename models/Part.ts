export interface IPart {
    id?: number;
    name: string;
    manufacturer: string;
    oem_code: string;
    description: string;
    price: number;
    count: number;
    unit: string;
    created_at: number;
    updated_at: number;
}

export class Part implements IPart {
    id?: number;
    name!: string;
    manufacturer!: string;
    oem_code!: string;
    description!: string;
    price!: number;
    count!: number;
    unit!: string;
    created_at!: number;
    updated_at!: number;

    static tableName = "part";

    static columns: (keyof Part)[] = [
        "id",
        "name",
        "manufacturer",
        "oem_code",
        "description",
        "price",
        "count",
        "unit",
        "created_at",
        "updated_at"
    ];
}