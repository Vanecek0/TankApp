type StationSeed = {
    name: string;
    address: string;
    price_per_unit: number;
    last_visit: number;
    provider: string;
};

export function createStationSeed(overrides: Partial<StationSeed> = {}): StationSeed {
    return {
        name: 'Tank ONO',
        address: 'Hlavní 123, Praha',
        price_per_unit: 35.5,
        last_visit: Date.now(),
        provider: 'ONO',
        ...overrides,
    };
}

export async function getStationSeeds() {
    return [
        createStationSeed({
            name: 'Tank ONO',
            address: 'Domažlická 674/160, 318 00 Plzeň 3',
            price_per_unit: 38.5,
            last_visit: Date.now() - 1000 * 60 * 60 * 24 * 20,
            provider: 'ONO',
        }),
        createStationSeed({
            name: 'Shell',
            address: 'Koterovská 156, 326 00 Plzeň 2-Slovany',
            price_per_unit: 42.9,
            last_visit: Date.now() - 1000 * 60 * 60 * 24 * 30,
            provider: 'Shell',
        }),
    ];
}