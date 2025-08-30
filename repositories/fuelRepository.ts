import DatabaseRepository from "@/database/abstract/databaseRepository";
import { Fuel } from "@/models/Fuel";

export class FuelRepository extends DatabaseRepository<Fuel> {
    protected tableName = Fuel.tableName;
    protected columns = Fuel.columns;
    protected modelClass = Fuel;
}

export const fuelRepository = new FuelRepository()