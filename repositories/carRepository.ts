import { Car } from "@/models/Car"
import BaseRepository from "@/database/base-repository"

class CarRepository extends BaseRepository<Car> {
    protected tableName = "car"
    protected columns = [
        "id",
        "manufacturer",
        "model",
        "manufacture_year",
        "registration_date",
        "fuel_id",
        "car_nickname",
        "tachometer"
    ];

    async findByFuelId(fuelId: number): Promise<Car[]> {
        const result = await this.findBy({ fuel_id: fuelId })
        if (!result.success || !result.data) {
            throw new Error(result.error || "Nepodařilo se načíst auta podle fuel_id")
        }
        return result.data
    }
}

export const carRepository = new CarRepository()
