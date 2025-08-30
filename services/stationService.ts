import { stationFuelRepository, StationFuelRepository } from "@/repositories/stationFuelRepository";

export class StationService {
    constructor(
        private stationFuelRepository: StationFuelRepository
    ) { }
}

export const stationService = new StationService(stationFuelRepository)