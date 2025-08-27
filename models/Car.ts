import BaseModel from "@/database/base-model"

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
    const carInsertColumns = carColumns.filter(col => col !== "id")
    const columns = carInsertColumns.join(", ")
    const placeholders = carInsertColumns.map(() => "?").join(", ")
    const values = carInsertColumns.map((key) => car[key])

    const sql = `INSERT INTO car (${columns}) VALUES (${placeholders})`
    return this.execute(sql, values)
  }

  static all(): Promise<CarModel[]> {
    return this.select();
  }

  static update(id: number, car: Partial<Omit<Car, "id">>) {
    const fields = Object.keys(car)
    const values = Object.values(car)
    const setClause = fields.map((field) => `${field} = ?`).join(", ")
    return this.execute(`UPDATE car SET ${setClause} WHERE id = ?`, [...values, id])
  }

  static count(): Promise<number> {
    return super.count("car")
  }

  static delete(id: number) {
    return this.execute("DELETE FROM car WHERE id = ?", [id])
  }

  static findById(id: number): Promise<CarModel | null> {
    return this.select({ id })
  }
}