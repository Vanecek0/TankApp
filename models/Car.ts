import BaseModel from "@/database/abstract/baseModel"

export type Car = {
  id?: number
  manufacturer: string
  model: string
  manufacture_year: number
  registration_date: number
  license_plate: string
  vin: string
  fuel_id: number
  car_nickname: string
  tank_capacity: number
  odometer: number
}

export const carColumns: (keyof Car)[] = [
  "id",
  "manufacturer",
  "model",
  "manufacture_year",
  "registration_date",
  "license_plate",
  "vin",
  "fuel_id",
  "car_nickname",
  "tank_capacity",
  "odometer"
]

export class CarModel extends BaseModel {
  static tableName = "car"
  static columns = carColumns

  static async create(car: Omit<Car, "id">) {
    return this.insert(car)
  }

  static modify(id: number, car: Partial<Omit<Car, "id">>) {
    return this.update(car, { id: id })
  }

  static all(): Promise<CarModel[]> {
    return this.select();
  }

  static first(): Promise<CarModel> {
    return this.select([], 1);
  }

  static count(): Promise<number> {
    return super.count()
  }

  static remove(id: number) {
    return this.delete({ id: id });
  }

  static findBy(where: Partial<Record<string, any>>) {
    return this.select(where);
  }
}