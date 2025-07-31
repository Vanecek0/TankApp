import BaseModel from "@/database/base-model"

export type Test = {
  id?: number
  manufacturer: string
  model: string
  manufacture_year: number
  registration_date: number
  fuel_id: number
  car_nickname: string
  tachometer: number
}

export class TestModel extends BaseModel {
  static async create(car: Omit<Test, "id">): Promise<any> {
    try {
      const result = await this.execute(
        `INSERT INTO car (manufacturer, model, manufacture_year, registration_date, fuel_id, car_nickname, tachometer)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          car.manufacturer,
          car.model,
          car.manufacture_year,
          car.registration_date,
          car.fuel_id,
          car.car_nickname,
          car.tachometer,
        ],
      )
      return result
    } catch (error) {
      console.error("Chyba při vkládání car:", error)
      throw new Error("Nepodařilo se vytvořit nový záznam.")
    }
  }

  static async first(): Promise<Test | null> {
    return this.queryFirst<Test>("SELECT * FROM car ORDER BY id ASC LIMIT 1")
  }

  static async all(): Promise<Test[]> {
    return this.query<Test>("SELECT * FROM car")
  }

  static async count(): Promise<number> {
    return super.count("car")
  }

  static async findById(id: number): Promise<Test | null> {
    return this.queryFirst<Test>("SELECT * FROM car WHERE id = ?", [id])
  }

  static async update(id: number, car: Partial<Omit<Test, "id">>): Promise<void> {
    const fields = Object.keys(car)
    const values = Object.values(car)
    const setClause = fields.map((field) => `${field} = ?`).join(", ")

    await this.execute(`UPDATE car SET ${setClause} WHERE id = ?`, [...values, id])
  }

  static async delete(id: number): Promise<void> {
    await this.execute("DELETE FROM car WHERE id = ?", [id])
  }

  static async findByManufacturer(manufacturer: string): Promise<Test[]> {
    return this.query<Test>("SELECT * FROM car WHERE manufacturer = ?", [manufacturer])
  }

  static async findByFuelId(fuelId: number): Promise<Test[]> {
    return this.query<Test>("SELECT * FROM car WHERE fuel_id = ?", [fuelId])
  }

  static async search(searchTerm: string): Promise<Test[]> {
    return this.query<Test>(
      `SELECT * FROM car 
       WHERE manufacturer LIKE ? 
       OR model LIKE ? 
       OR car_nickname LIKE ?`,
      [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`],
    )
  }
}