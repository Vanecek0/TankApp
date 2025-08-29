import { Repository } from "@/interfaces/IRepository";
import { Car, CarModel } from "@/models/Car"
import { SQLiteRunResult } from "expo-sqlite";

export interface ICarRepository extends Repository<CarModel> {
  getAllCars(): Promise<CarModel[]>;
}

class CarRepository implements Repository<CarRepository> {
  protected model = CarModel;

  async create(car: CarModel): Promise<CarModel> {
    return this.model.create(car)
  }

  async exists(car: Car): Promise<boolean> {
    const result = this.model.findBy({id: car.id})
    return !!result === true;
  }

  async findAll(): Promise<Car[]> {
    const result = await this.model.all()
    if (!result) {
      throw new Error("Nepodařilo se načíst auta")
    }
    return result as Car[]
  }

  async getById(id: number): Promise<CarModel> {
    const result = await this.model.findBy({ id: id });
    if (!result) {
      throw new Error("Auto s daným ID nebylo nalezeno");
    }
    return result[0];
  }

  async findFirst(): Promise<Car> {
    const result = await this.model.first();
    if (!result) {
      throw new Error("Auto nebylo nalezeno");
    }
    return result as Car
  }

  async findByFuelId(fuelId: number): Promise<Car[]> {
    const result = await this.model.findBy({ fuel_id: fuelId })
    if (!result) {
      throw new Error("Nepodařilo se načíst auta podle fuel_id")
    }
    return result as Car[]
  }

  async findByManufacturer(manufacturer: string): Promise<Car[]> {
    const result = await this.model.findBy({ manufacturer: manufacturer })
    if (!result) {
      throw new Error("Nepodařilo se načíst auta podle manufacturer")
    }
    return result as Car[]
  }

  async remove(id: number): Promise<SQLiteRunResult> {
    const result = await this.model.remove(id)
    if (!result) {
      throw new Error("Nepodařilo se odstranit záznam auta")
    }
    return result
  }
}

export const carRepository = new CarRepository()