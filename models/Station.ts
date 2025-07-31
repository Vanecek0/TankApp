import BaseModel from "@/database/base-model";

export type Station = {
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
};

export const stationColumns: (keyof Omit<Station, "id">)[] = [
    "name",
    "address",
    "phone",
    "opening_hrs",
    "closing_hrs",
    "last_visit",
    "provider",
    "note",
    "created_at",
    "updated_at",
];

export class StationModel extends BaseModel {

    static async create(station: Omit<Station, "id">) {
        const columns = stationColumns.join(", ");
        const placeholders = stationColumns.map(() => "?").join(", ");
        const values = stationColumns.map((key) => station[key]);

        const sql = `INSERT INTO station (${columns}) VALUES (${placeholders})`;
        return this.execute(sql, values);
    }

    static all(): Promise<Station[]> {
        return this.query<Station>("SELECT * FROM station");
    }

    static findById(id: number): Promise<Station | null> {
        return this.queryFirst<Station>("SELECT * FROM station WHERE id = ?", [id]);
    }

    static update(id: number, station: Partial<Omit<Station, "id">>) {
        const fields = Object.keys(station);
        const values = Object.values(station);
        if (fields.length === 0) return Promise.resolve();

        const setClause = fields.map((field) => `${field} = ?`).join(", ");
        const sql = `UPDATE station SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
        return this.execute(sql, [...values, id]);
    }

    static delete(id: number) {
        return this.execute("DELETE FROM station WHERE id = ?", [id]);
    }

    static count(): Promise<number> {
        return super.count("station");
    }

}