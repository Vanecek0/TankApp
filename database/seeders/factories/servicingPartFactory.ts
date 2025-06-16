import { ServicingPart } from "@/models/ServicingPart";

export function createServicingPartSeed(overrides: Partial<ServicingPart> = {}) {
    return {
        id_part: 1,
        id_servicing: 1,
        ...overrides,
    };
}

export async function getServicingPartSeeds() {
    return [
        createServicingPartSeed({ id_part: 1, id_servicing: 1}),
        createServicingPartSeed({ id_part: 2, id_servicing: 2}),
        createServicingPartSeed({ id_part: 4, id_servicing: 2}),
        createServicingPartSeed({ id_part: 3, id_servicing: 1})
    ];
}