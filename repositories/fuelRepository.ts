import BaseRepository from "@/database/abstract/baseRepository";
import { Fuel } from "@/models/Fuel";

export class FuelRepository extends BaseRepository<Fuel> {
    protected tableName = Fuel.tableName;
    protected columns = Fuel.columns;
    protected modelClass = Fuel;
}

export const fuelRepository = new FuelRepository()