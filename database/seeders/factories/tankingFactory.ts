import { Tanking } from "@/models/Tanking";

export function createTankingSeed(overrides: Partial<Tanking> = {}): Tanking {
    return {
        profile_id: 1,
        station_fuel_id: 1,
        price_per_unit: 20,
        price: 0,
        amount: 0,
        mileage: 0,
        tachometer: 0,
        created_at: Date.now(),
        updated_at: Date.now(),
        ...overrides,
    };
}

export async function getTankingSeeds() {
    return [
        createTankingSeed({ profile_id: 1, station_fuel_id: 2, price_per_unit: 38, price: 1368.31, amount: 35.67, mileage: 326, tachometer: 50000, created_at: 1704067200000, updated_at: 1704067200000 }),
        createTankingSeed({ profile_id: 1, station_fuel_id: 1, price_per_unit: 38.2, price: 1250.00, amount: 30.00, mileage: 150, tachometer: 45000, created_at: 1703980800000, updated_at: 1703980800000 }),
        createTankingSeed({ profile_id: 2, station_fuel_id: 2, price_per_unit: 38.3, price: 1402.75, amount: 36.50, mileage: 420, tachometer: 35000, created_at: 1704153600000, updated_at: 1704153600000 }),
        createTankingSeed({ profile_id: 2, station_fuel_id: 1, price_per_unit: 37.1, price: 1320.90, amount: 33.00, mileage: 285, tachometer: 46000, created_at: 1704240000000, updated_at: 1704240000000 }),
        createTankingSeed({ profile_id: 2, station_fuel_id: 2, price_per_unit: 33.2, price: 1299.99, amount: 32.10, mileage: 510, tachometer: 47000, created_at: 1704326400000, updated_at: 1704326400000 }),
        createTankingSeed({ profile_id: 2, station_fuel_id: 1, price_per_unit: 31.1, price: 1375.50, amount: 34.25, mileage: 190, tachometer: 48000, created_at: 1704412800000, updated_at: 1704412800000 }),
        createTankingSeed({ profile_id: 2, station_fuel_id: 2, price_per_unit: 39.4, price: 1345.80, amount: 35.00, mileage: 610, tachometer: 45000, created_at: 1704499200000, updated_at: 1704499200000 })
    ];
}