import DatabaseRepository from "@/database/abstract/databaseRepository";
import { Car } from "@/models/Car";

export class CarRepository extends DatabaseRepository<Car> {
  protected tableName = Car.tableName;
  protected columns = Car.columns;
  protected modelClass = Car;

  async getAll(): Promise<Car[]> {
    try {
      const result = await this.select();
      return result || [];
    } catch (err) {
      console.error("Error loading cars:", err);
      return [];
    }
  }

  async getById(id: number): Promise<Car | null> {
    try {
      const result = await this.select({ id: id });
      if (!result || result.length === 0) {
        return null;
      }
      return result[0];
    } catch (err) {
      console.error(`Error fetching car with id ${id}:`, err);
      return null;
    }
  }

  async getFirst(): Promise<Car | null> {
    try {
      const result = await this.select({}, [], [], 1);
      if (!result || result.length === 0) {
        return null;
      }
      return result[0];
    } catch (err) {
      console.error("Error fetching first car:", err);
      return null;
    }
  }

  async getByFuelId(fuelId: number): Promise<Car[]> {
    try {
      const result = await this.select({ fuel_id: fuelId });
      if (!result || result.length === 0) {
        return [];
      }
      return result;
    } catch (err) {
      console.error(`Error fetching cars with fuel_id ${fuelId}:`, err);
      return [];
    }
  }

  async getByManufacturer(manufacturer: string): Promise<Car[]> {
    try {
      const result = await this.select({ manufacturer });
      if (!result || result.length === 0) {
        return [];
      }
      return result;
    } catch (err) {
      console.error(`Error fetching cars by manufacturer "${manufacturer}":`, err);
      return [];
    }
  }

  async removeById(id: number): Promise<boolean> {
    try {
      const result = await this.delete({ id });
      if (!result) {
        console.warn(`Car with id ${id} could not be deleted`);
        return false;
      }
      return true;
    } catch (err) {
      console.error(`Error deleting car with id ${id}:`, err);
      return false;
    }
  }
}

export const carRepository = new CarRepository()