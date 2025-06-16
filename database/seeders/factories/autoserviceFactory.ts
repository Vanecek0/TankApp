import { Autoservice } from "@/models/Autoservice";

export function createAutoserviceSeed(overrides: Partial<Autoservice> = {}): Autoservice {
    return {
        name: 'Autoservis Novák',
        address: 'Ledce 58, 330 14 Ledce',
        created_at: Date.now(),
        updated_at: Date.now(),
        ...overrides,
    };
}

export async function getAutoserviceSeeds() {
    return [
        createAutoserviceSeed({
            name: 'Autoservis Novák',
            address: 'Ledce 58, 330 14 Ledce',
            created_at: Date.now(),
            updated_at: Date.now(),
        }),
        createAutoserviceSeed({
            name: 'Autoservis Čížek',
            address: 'U Studentky 555, 338 08 Zbiroh',
            created_at: Date.now(),
            updated_at: Date.now(),
        })

    ];
}