import DatabaseRepository from "@/database/abstract/databaseRepository";
import { Station } from "@/models/Station";

export class StationRepository extends DatabaseRepository<Station> {
    protected tableName = Station.tableName;
    protected columns = Station.columns;
    protected modelClass = Station;


    async removeById(id: number): Promise<boolean> {
        try {
            const result = await this.delete({ id });
            if (!result) {
                console.warn(`Station with id ${id} could not be deleted`);
                return false;
            }
            return true;
        } catch (err) {
            console.error(`Error deleting station with id ${id}:`, err);
            return false;
        }
    }
}

export const stationRepository = new StationRepository()