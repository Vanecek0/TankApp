import { StationFuel } from "@/models/StationFuel";

export function createStationFuelSeed(overrides: Partial<StationFuel> = {}) {
    return {
      id_station: 1,
      id_fuel: 1,
      price_per_unit: 35.50,
      ...overrides,
    };
  }
  
  export async function getStationFuelSeeds() {
    return [
      createStationFuelSeed({ id_station: 1, id_fuel: 1, price_per_unit: 35.50 }),
      createStationFuelSeed({ id_station: 1, id_fuel: 3, price_per_unit: 36.00 }), 
      createStationFuelSeed({ id_station: 1, id_fuel: 7, price_per_unit: 32.00 }), 
      createStationFuelSeed({ id_station: 2, id_fuel: 3, price_per_unit: 37.00 }), 
      createStationFuelSeed({ id_station: 2, id_fuel: 7, price_per_unit: 33.50 }), 
      createStationFuelSeed({ id_station: 2, id_fuel: 8, price_per_unit: 34.00 }),
    ];
  }