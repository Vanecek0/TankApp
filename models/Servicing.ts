export interface IServicing {
    id?: number;
    car_id: number;
    name: string;
    description: string;
    autoservice_id: number;
    service_date: number;
    created_at: number;
    updated_at: number;
}

export class Servicing implements IServicing {
    id?: number;
    car_id!: number;
    name!: string;
    description!: string;
    autoservice_id!: number;
    service_date!: number;
    created_at!: number;
    updated_at!: number;

    static tableName = "servicing";

    static columns: (keyof Servicing)[] = [
        "id",
        "car_id",
        "name",
        "description",
        "autoservice_id",
        "service_date",
        "created_at",
        "updated_at"
    ];
}