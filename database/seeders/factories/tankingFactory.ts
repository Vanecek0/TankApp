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