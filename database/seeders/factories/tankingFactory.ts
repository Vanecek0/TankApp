type TankingSeed = {
    tachometer: number;
    station_id: number;
    fuel_type: string;
    price: number;
    price_per_unit: number;
    amount: number;
    mileage: number;
    created_at: number;
};

export function createTankingSeed(overrides: Partial<TankingSeed> = {}): TankingSeed {
    return {
        tachometer: 0,
        station_id: 1,
        fuel_type: 'Natural 95',
        price: 0,
        price_per_unit: 0,
        amount: 0,
        mileage: 0,
        created_at: Date.now(),
        ...overrides,
    };
}

export async function getTankingSeeds() {
    return [
        createTankingSeed({ tachometer: 12000, station_id: 1, price: 1200, price_per_unit: 40, amount: 31.28, mileage: 300 }),
        createTankingSeed({ tachometer: 12350, station_id: 2, price: 1350, price_per_unit: 38.6, amount: 32.5, mileage: 320 }),
        createTankingSeed({ tachometer: 12700, station_id: 1, price: 1320, price_per_unit: 39.1, amount: 33.76, mileage: 310, created_at: Date.now() - 1000 * 60 * 60 * 24 * 30 }),
        createTankingSeed({ tachometer: 13050, station_id: 2, price: 1400, price_per_unit: 40.2, amount: 34.83, mileage: 330, created_at: Date.now() - 1000 * 60 * 60 * 24 * 20 }),
        createTankingSeed({ tachometer: 13420, station_id: 1, price: 1450, price_per_unit: 41.0, amount: 35.37, mileage: 310, created_at: Date.now() - 1000 * 60 * 60 * 24 * 10 }),
        createTankingSeed({ tachometer: 13780, station_id: 2, price: 1380, price_per_unit: 39.8, amount: 34.67, mileage: 320, created_at: Date.now() - 1000 * 60 * 60 * 24 * 5 }),
    ];
}