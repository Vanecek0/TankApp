import BaseModel from "@/database/base-model"

export type Car = {
  id?: number
  manufacturer: string
  model: string
  manufacture_year: number
  registration_date: number
  fuel_id: number
  car_nickname: string
  tachometer: number
}

const carColumns: (keyof Omit<Car, "id">)[] = [
  "manufacturer",
  "model",
  "manufacture_year",
  "registration_date",
  "fuel_id",
  "car_nickname",
  "tachometer"
]

export class CarModel extends BaseModel {
  static async create(car: Omit<Car, "id">) {
    const columns = carColumns.join(", ")
    const placeholders = carColumns.map(() => "?").join(", ")
    const values = carColumns.map((key) => car[key])

    const sql = `INSERT INTO car (${columns}) VALUES (${placeholders})`
    return this.execute(sql, values)
  }

  static all(): Promise<Car[]> {
    return this.query<Car>("SELECT * FROM car")
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

  static findById(id: number): Promise<Car | null> {
    return this.queryFirst<Car>("SELECT * FROM car WHERE id = ?", [id])
  }
}