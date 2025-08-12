import { Car, carColumns, CarModel } from "@/models/Car"
import BaseRepository from "@/database/base-repository"

class CarRepository extends BaseRepository<Car> {
    protected tableName = "car"
    protected columns = carColumns

    async findByFuelId(fuelId: number): Promise<Car[]> {
        const result = await this.findBy({ fuel_id: fuelId })
        if (!result.success || !result.data) {
            throw new Error(result.error || "Nepodařilo se načíst auta podle fuel_id")
        }
        return result.data
    }

    async findByManufacturer(manufacturer: string): Promise<Car[]> {
        const result = await this.findBy({ manufacturer })
        if (!result.success || !result.data) {
            throw new Error(result.error || "Nepodařilo se načíst auta podle manufacturer")
        }
        return result.data
    }
}

export const carRepository = new CarRepository()
