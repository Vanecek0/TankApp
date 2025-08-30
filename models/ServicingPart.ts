export interface IServicingPart {
    id?: number;
    id_part: number;
    id_servicing: number;
}

export class ServicingPart implements IServicingPart {
    id?: number;
    id_part!: number;
    id_servicing!: number;

    static tableName = "servicing_part";

    static columns: (keyof ServicingPart)[] = [
        "id",
        "id_part",
        "id_servicing"
    ];
}