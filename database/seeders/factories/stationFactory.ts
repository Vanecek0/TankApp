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