export interface IFuel {
    id?: number;
    name: string;
    code: string;
    trademark: string;
    unit: string;
    category: number;
}

export class Fuel implements IFuel {
    id?: number;
    name!: string;
    code!: string;
    trademark!: string;
    unit!: string;
    category!: number;

    static tableName = "fuel";

    static columns: (keyof Fuel)[] = [
        "id",
        "name",
        "code",
        "trademark",
        "unit",
        "category"
    ];
}