import BaseModel from "@/database/base-model";

export type Fuel = {
    id?: number;
    name: string;
    code: string;
    trademark: string;
    unit: string;
};

const fuelColumns: (keyof Omit<Fuel, "id">)[] = [
    "name",
    "code",
    "trademark",
    "unit",
]

export class FuelModel extends BaseModel {

    static async create(fuel: Omit<Fuel, "id">) {
        const columns = fuelColumns.join(", ")
        const placeholders = fuelColumns.map(() => "?").join(", ")
        const values = fuelColumns.map((key) => fuel[key])

        const sql = `INSERT INTO fuel (${columns}) VALUES (${placeholders})`
        return this.execute(sql, values)
    }

    static all(): Promise<Fuel[]> {
        return this.query<Fuel>("SELECT * FROM fuel")
    }

    static update(id: number, fuel: Partial<Omit<Fuel, "id">>) {
        const fields = Object.keys(fuel)
        const values = Object.values(fuel)
        const setClause = fields.map((field) => `${field} = ?`).join(", ")
        return this.execute(`UPDATE fuel SET ${setClause} WHERE id = ?`, [...values, id])
    }

    static count(): Promise<number> {
        return super.count("fuel")
    }

    static delete(id: number) {
        return this.execute("DELETE FROM fuel WHERE id = ?", [id])
    }

    static findById(id: number): Promise<Fuel | null> {
        return this.queryFirst<Fuel>("SELECT * FROM fuel WHERE id = ?", [id])
    }

}