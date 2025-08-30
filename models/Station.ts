export interface IStation {
    id?: number;
    name: string;
    address: string;
    phone: string;
    opening_hrs: number;
    closing_hrs: number;
    last_visit: number;
    provider: string;
    note: string;
    created_at: number;
    updated_at: number;
}

export class Station implements IStation {
    id?: number;
    name!: string;
    address!: string;
    phone!: string;
    opening_hrs!: number;
    closing_hrs!: number;
    last_visit!: number;
    provider!: string;
    note!: string;
    created_at!: number;
    updated_at!: number;

    static tableName = "station";

    static columns: (keyof Station)[] = [
        "id",
        "name",
        "address",
        "phone",
        "opening_hrs",
        "closing_hrs",
        "last_visit",
        "provider",
        "note",
        "created_at",
        "updated_at"
    ];
}