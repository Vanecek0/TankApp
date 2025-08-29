import { StationFuel } from "@/models/StationFuel";

export async function getStationFuelSeeds(): Promise<StationFuel[]> {
  return [
    { id_station: 1, id_fuel: 1, last_price_per_unit: 35.50 },
    { id_station: 1, id_fuel: 3, last_price_per_unit: 36.00 },
    { id_station: 1, id_fuel: 7, last_price_per_unit: 32.00 },
    { id_station: 2, id_fuel: 3, last_price_per_unit: 37.00 },
    { id_station: 2, id_fuel: 7, last_price_per_unit: 33.50 },
    { id_station: 2, id_fuel: 8, last_price_per_unit: 34.00 },
  ];
}