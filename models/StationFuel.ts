import BaseModel from "@/database/base-model"

export type StationFuel = {
    id?: number
    id_station: number
    id_fuel: number
    last_price_per_unit: number
}

export const stationFuelColumns: (keyof Omit<StationFuel, "id">)[] = [
    "id_station",
    "id_fuel",
    "last_price_per_unit",
]

export class StationFuelModel extends BaseModel {
        static tableName = "station_fuel"
        static columns = stationFuelColumns

    static async create(stationFuel: Omit<StationFuel, "id">) {
        const columns = stationFuelColumns.join(", ")
        const placeholders = stationFuelColumns.map(() => "?").join(", ")
        const values = stationFuelColumns.map((key) => stationFuel[key])

        const sql = `INSERT OR REPLACE INTO station_fuel (${columns}) VALUES (${placeholders})`
        return this.execute(sql, values)
    }

    static async exists(id_station: number, id_fuel: number): Promise<boolean> {
        const row = await this.queryFirst<{ exists: number }>(
            "SELECT 1 as exists FROM station_fuel WHERE id_station = ? AND id_fuel = ? LIMIT 1",
            [id_station, id_fuel]
        )
        return !!row
    }

    static all(): Promise<StationFuel[]> {
        return this.query<StationFuel>("SELECT * FROM station_fuel")
    }

    static findById(id: number): Promise<StationFuel | null> {
        return this.queryFirst<StationFuel>("SELECT * FROM station_fuel WHERE id = ?", [id])
    }

    static async update(id: number, stationFuel: Partial<Omit<StationFuel, "id">>) {
        const fields = Object.keys(stationFuel)
        const values = Object.values(stationFuel)
        if (fields.length === 0) return Promise.resolve()

        const setClause = fields.map((field) => `${field} = ?`).join(", ")
        const sql = `UPDATE station_fuel SET ${setClause} WHERE id = ?`
        return this.execute(sql, [...values, id])
    }

    static delete(id: number) {
        return this.execute("DELETE FROM station_fuel WHERE id = ?", [id])
    }

    static count(): Promise<number> {
        return super.count("station_fuel")
    }
}