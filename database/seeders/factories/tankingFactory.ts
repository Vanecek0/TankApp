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
        createTankingSeed({ created_at: 1704067200000, tachometer: 14326, station_id: 2, price: 1368.31, price_per_unit: 38.36, amount: 35.67, mileage: 326 }),
        createTankingSeed({ created_at: 1704326400000, tachometer: 14645, station_id: 1, price: 1457.67, price_per_unit: 41.1, amount: 35.47, mileage: 319 }),
        createTankingSeed({ created_at: 1704844800000, tachometer: 14976, station_id: 2, price: 1245.7, price_per_unit: 40.18, amount: 31.00, mileage: 331 }),
        createTankingSeed({ created_at: 1705104000000, tachometer: 15287, station_id: 2, price: 1281.27, price_per_unit: 39.96, amount: 32.06, mileage: 311 }),
        createTankingSeed({ created_at: 1705449600000, tachometer: 15588, station_id: 2, price: 1364.41, price_per_unit: 38.8, amount: 35.17, mileage: 301 }),
        createTankingSeed({ created_at: 1705622400000, tachometer: 15920, station_id: 1, price: 1285.3, price_per_unit: 41.5, amount: 30.97, mileage: 332 }),
        createTankingSeed({ created_at: 1706054400000, tachometer: 16241, station_id: 2, price: 1282.25, price_per_unit: 39.32, amount: 32.61, mileage: 321 }),
        createTankingSeed({ created_at: 1706832000000, tachometer: 16576, station_id: 2, price: 1194.05, price_per_unit: 38.81, amount: 30.76, mileage: 335 }),
    ];
}