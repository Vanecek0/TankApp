import { Station } from "@/models/Station";

export function createStationSeed(overrides: Partial<Station> = {}): Station {
    return {
        name: 'Tank ONO',
        address: 'Hlavní 123, Praha',
        last_visit: Date.now(),
        provider: 'ONO',
        created_at: Date.now(),
        updated_at: Date.now(),
        ...overrides,
    };
}

export async function getStationSeeds() {
    return [
        createStationSeed({
            name: 'Tank ONO',
            address: 'Domažlická 674/160, 318 00 Plzeň 3',
            last_visit: Date.now() - 1000 * 60 * 60 * 24 * 20,
            provider: 'ONO',
            created_at: Date.now(),
            updated_at: Date.now(),
        }),
        createStationSeed({
            name: 'Shell',
            address: 'Koterovská 156, 326 00 Plzeň 2-Slovany',
            last_visit: Date.now(),
            provider: 'Shell',
            created_at: Date.now() - 1000 * 60 * 60 * 24 * 20,
            updated_at: Date.now() - 1000 * 60 * 60 * 24 * 20,
        })
    ];
}