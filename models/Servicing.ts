import BaseModel from "@/database/base-model";

export type Servicing = {
    id?: number;
    car_id: number;
    name: string;
    description: string;
    autoservice_id: number;
    service_date: number;
    created_at: number;
    updated_at: number;
};

const servicingColumns: (keyof Omit<Servicing, "id">)[] = [
    "car_id",
    "name",
    "description",
    "autoservice_id",
    "service_date",
    "created_at",
    "updated_at",
];

export class ServicingModel extends BaseModel {
    static tableName = "servicing"
    static columns = servicingColumns

    static async create(servicing: Omit<Servicing, "id">) {
        const columns = servicingColumns.join(", ");
        const placeholders = servicingColumns.map(() => "?").join(", ");
        const values = servicingColumns.map((key) => servicing[key]);

        const sql = `INSERT INTO servicing (${columns}) VALUES (${placeholders})`;
        return this.execute(sql, values);
    }

    static all(): Promise<Servicing[]> {
        return this.query<Servicing>("SELECT * FROM servicing");
    }

    static count(): Promise<number> {
        return super.count("servicing");
    }

    static findById(id: number): Promise<Servicing | null> {
        return this.queryFirst<Servicing>("SELECT * FROM servicing WHERE id = ?", [id]);
    }

    static update(id: number, servicing: Partial<Omit<Servicing, "id">>) {
        const fields = Object.keys(servicing);
        const values = Object.values(servicing);
        const setClause = fields.map((field) => `${field} = ?`).join(", ");
        return this.execute(`UPDATE servicing SET ${setClause} WHERE id = ?`, [...values, id]);
    }

    static delete(id: number) {
        return this.execute("DELETE FROM servicing WHERE id = ?", [id]);
    }

}