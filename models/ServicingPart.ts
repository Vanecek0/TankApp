import BaseModel from "@/database/base-model";

export type ServicingPart = {
    id?: number;
    id_part: number;
    id_servicing: number;
};

const servicingPartColumns: (keyof Omit<ServicingPart, "id">)[] = [
    "id_part",
    "id_servicing",
];

export class ServicingPartModel extends BaseModel {

    static async create(servicingPart: Omit<ServicingPart, "id">) {
        const columns = servicingPartColumns.join(", ");
        const placeholders = servicingPartColumns.map(() => "?").join(", ");
        const values = servicingPartColumns.map((key) => servicingPart[key]);

        const sql = `INSERT OR REPLACE INTO servicing_part (${columns}) VALUES (${placeholders})`;
        return this.execute(sql, values);
    }

    static all(): Promise<ServicingPart[]> {
        return this.query<ServicingPart>(
            `SELECT sp.* 
       FROM servicing_part sp
       INNER JOIN servicing s ON sp.id_servicing = s.id
       INNER JOIN part p ON sp.id_part = p.id`
        );
    }

    static count(): Promise<number> {
        return super.count("servicing_part");
    }

    static delete(id: number) {
        return this.execute("DELETE FROM servicing_part WHERE id = ?", [id]);
    }

}