import { Tanking } from "@/models/Tanking";

export function createTankingSeed(overrides: Partial<Tanking> = {}): Tanking {
    return {
        car_id: 1,
        station_fuel_id: 1,
        price_per_unit: 20,
        price: 0,
        amount: 0,
        mileage: 0,
        tachometer: 0,
        tank_date: Date.now(),
        snapshot: undefined,
        created_at: Date.now(),
        updated_at: Date.now(),
        ...overrides,
    };
}

export async function getTankingSeeds() {
    return [

        // Historická data tankování pro roky 2021-2023

        // ========== ROK 2021 ==========
        // Leden 2021
        createTankingSeed({
            car_id: 1,
            station_fuel_id: 1,
            price_per_unit: 30.6,
            price: 1071,
            amount: 35,
            mileage: 315,
            tachometer: 35316,
            tank_date: 1609545600000,
            snapshot: undefined,
            created_at: 1609545600000,
            updated_at: 1609545600000,
        }),

        createTankingSeed({
            car_id: 1,
            station_fuel_id: 2,
            price_per_unit: 31.2,
            price: 1092,
            amount: 35,
            mileage: 333,
            tachometer: 38309,
            tank_date: 1609804800000,
            snapshot: undefined,
            created_at: 1609804800000,
            updated_at: 1609804800000,
        })
    ];
}