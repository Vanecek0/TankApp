import { ServicingPart } from "@/models/ServicingPart";

export async function getServicingPartSeeds(): Promise<ServicingPart[]> {
    return [
        { id_part: 1, id_servicing: 1 },
        { id_part: 2, id_servicing: 2 },
        { id_part: 4, id_servicing: 2 },
        { id_part: 3, id_servicing: 1 },
    ];
}