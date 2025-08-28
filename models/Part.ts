import BaseModel from "@/database/abstract/baseModel";

export type Part = {
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
};

const partColumns: (keyof Omit<Part, "id">)[] = [
    "name",
    "manufacturer",
    "oem_code",
    "description",
    "price",
    "count",
    "unit",
    "created_at",
    "updated_at",
];

export class PartModel extends BaseModel {
    static tableName = "part"
    static columns = partColumns

    static async create(part: Omit<Part, "id">) {
        const columns = partColumns.join(", ");
        const placeholders = partColumns.map(() => "?").join(", ");
        const values = partColumns.map((key) => part[key]);

        const sql = `INSERT INTO part (${columns}) VALUES (${placeholders})`;
        return this.execute(sql, values);
    }

    static all(): Promise<Part[]> {
        return this.query<Part>("SELECT * FROM part");
    }

    static count(): Promise<number> {
        return super.count("part");
    }

    static findById(id: number): Promise<Part | null> {
        return this.queryFirst<Part>("SELECT * FROM part WHERE id = ?", [id]);
    }

    static update(id: number, part: Partial<Omit<Part, "id">>) {
        const fields = Object.keys(part);
        const values = Object.values(part);
        const setClause = fields.map((field) => `${field} = ?`).join(", ");
        return this.execute(`UPDATE part SET ${setClause} WHERE id = ?`, [...values, id]);
    }

    static delete(id: number) {
        return this.execute("DELETE FROM part WHERE id = ?", [id]);
    }

}
