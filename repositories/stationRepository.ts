import { Station, StationModel } from "@/models/Station"
import { SQLiteRunResult } from "expo-sqlite";

class StationRepository {
    protected model = StationModel;

    async removeRecord(id: number): Promise<SQLiteRunResult> {
        const result = await this.model.remove(id)
        if (!result) {
            throw new Error("Nepodařilo se odstranit záznam stanice")
        }
        return result
    }
}

export const stationRepository = new StationRepository()