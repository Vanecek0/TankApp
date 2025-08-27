import { Car, CarModel } from "@/models/Car"
import BaseRepository from "@/database/base-repository"

class CarRepository extends BaseRepository<typeof CarModel, Car> {
  constructor() {
    super(CarModel)
  }

  async findAll(): Promise<Car[]> {
    const result = await this.model.select()
    if (!result) {
      throw new Error("Nepodařilo se načíst auta")
    }
    return result as Car[]
  }

  async findById(id: number): Promise<Car> {
    const result = await this.model.findById( id );
    if (!result) {
      throw new Error("Auto s daným ID nebylo nalezeno");
    }
    return result as Car;
  }

  async findFirst(): Promise<Car | null> {
    const results = await this.model.select();
    if (results.length === 0) {
      return null;
    }
    return results[0] as Car;
  }

  async findByFuelId(fuelId: number): Promise<Car[]> {
    const result = await this.findBy({ fuel_id: fuelId })
    if (!result.success || result.error) {
      throw new Error(result.error || "Nepodařilo se načíst auta podle fuel_id")
    }
    return result.data ?? []
  }

  async findByManufacturer(manufacturer: string): Promise<Car[]> {
    const result = await this.findBy({ manufacturer })
    if (!result.success || result.error) {
      throw new Error(result.error || "Nepodařilo se načíst auta podle manufacturer")
    }
    return result.data ?? []
  }
}

export const carRepository = new CarRepository()