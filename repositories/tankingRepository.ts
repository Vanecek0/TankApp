import { Snapshot, Tanking, TankingModel } from "@/models/Tanking";
import { SQLiteRunResult } from "expo-sqlite";
import { stationFuelRepository } from "./stationFuelRepository";

class TankingRepository {
    protected model = TankingModel;

    async removeRecord(id: number): Promise<SQLiteRunResult> {
        const result = await this.model.remove(id)
        if (!result) {
            throw new Error("Nepodařilo se odstranit záznam stanice")
        }
        return result
    }

    async updateSnapshot(tankingId: number) {
        const tanking = await this.model.findById(tankingId) as Tanking;
        if (!tanking) throw new Error(`Tanking ${tankingId} not found`);

        const stationFuel = await stationFuelRepository.getStationWithFuelsById(tanking.station_fuel_id);
        if (!stationFuel) throw new Error(`StationFuel ${tanking.station_fuel_id} not found`);

        const snapshotJson = JSON.stringify({
            ...tanking,
            station: stationFuel.station,
            fuels: stationFuel.fuels,
        });

        await this.model.modify(tankingId, { snapshot: snapshotJson })
    }
}

export const tankingRepository = new TankingRepository()