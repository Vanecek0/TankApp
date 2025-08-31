import DatabaseRepository from "@/database/abstract/databaseRepository";
import { Fuel } from "@/models/Fuel";

export class FuelRepository extends DatabaseRepository<Fuel> {
    protected tableName = Fuel.tableName;
    protected columns = Fuel.columns;
    protected modelClass = Fuel;

    async getAll(): Promise<Fuel[]> {
        try {
            const result = await this.select();
            return result || [];
        } catch (err) {
            console.error("Error loading fuels:", err);
            return [];
        }
    }
}

export const fuelRepository = new FuelRepository()