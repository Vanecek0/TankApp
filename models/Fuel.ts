export interface IFuel {
    id?: number;
    name: string;
    code: string;
    trademark: string;
    unit: string;
}

export class Fuel implements IFuel {
    id?: number;
    name!: string;
    code!: string;
    trademark!: string;
    unit!: string;

    static tableName = "fuel";

    static columns: (keyof Fuel)[] = [
        "id",
        "name",
        "code",
        "trademark",
        "unit"
    ];
}