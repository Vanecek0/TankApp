import { Station, stationColumns } from "@/models/Station"
import BaseRepository from "@/database/base-repository"

class StationRepository extends BaseRepository<Station> {
    protected tableName = "station"
    protected columns = stationColumns;

}

export const stationRepository = new StationRepository()