import BaseModel from "@/database/abstract/baseModel";

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
        return this.insert(servicing)
    }

    static modify(id: number, servicing: Partial<Omit<Servicing, "id">>) {
        return this.update(servicing, { id: id })
    }

    static all(): Promise<ServicingModel[]> {
        return this.select();
    }


    static count(): Promise<number> {
        return super.count();
    }

    static findById(id: number): Promise<Servicing | null> {
        return this.queryFirst<Servicing>("SELECT * FROM servicing WHERE id = ?", [id]);
    }

    static remove(id: number) {
        return this.execute("DELETE FROM servicing WHERE id = ?", [id]);
    }

}