import { Fuel } from "@/models/Fuel";
import { stationFuelRepository, StationFuelRepository } from "@/repositories/stationFuelRepository";

export class FuelService {
    constructor(
        private stationFuelRepository: StationFuelRepository
    ) { }

    async getRelevantFuelsByStationId(stationId: number, carFuelCategory: number): Promise<Fuel[]> {
        const db = await StationFuelRepository.getDb();

        const fuels = await db.getAllAsync<Fuel>(
            `SELECT fuel.*
                 FROM fuel
                 INNER JOIN station_fuel ON fuel.id = station_fuel.id_fuel
                 WHERE station_fuel.id_station = ? AND fuel.category = ?`,
            [stationId, carFuelCategory]
        );

        return fuels;
    }
}

export const fuelService = new FuelService(stationFuelRepository)