import { Station, StationModel } from "@/models/Station"
import BaseRepository from "@/database/base-repository"

export default class StationRepository extends BaseRepository<typeof StationModel, Station> {
    constructor() {
        super(StationModel)
    }
}