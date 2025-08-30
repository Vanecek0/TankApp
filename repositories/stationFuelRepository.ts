import { StationFuel } from "@/models/StationFuel";
import BaseRepository from "@/database/abstract/baseRepository";


export class StationFuelRepository extends BaseRepository<StationFuel> {
    protected tableName = StationFuel.tableName;
    protected columns = StationFuel.columns;
    protected modelClass = StationFuel;

    static async createFromIds(id_station: number, id_fuel: number, last_price_per_unit: number = 0) {
        return await StationFuel.create({
            id_station,
            id_fuel,
            last_price_per_unit,
        });
    }

    async getAllStationsWithFuels(): Promise<(Station & { fuels: (Fuel & { last_price_per_unit: number | null })[] })[]> {
        const db = await Database.getConnection()
        const rows = await db.getAllAsync(`
      SELECT
          s.id AS station_id,
          s.name AS station_name,
          s.address AS station_address,
          s.phone AS station_phone,
          s.opening_hrs AS station_opening_hrs,
          s.closing_hrs AS station_closing_hrs,
          s.last_visit AS station_last_visit,
          s.provider AS station_provider,
          s.note AS station_note,
          s.created_at AS station_created_at,
          s.updated_at AS station_updated_at,
          f.id AS fuel_id,
          f.name AS fuel_name,
          f.code AS fuel_code,
          f.trademark AS fuel_trademark,
          f.unit AS fuel_unit,
          sf.last_price_per_unit AS last_price_per_unit
      FROM station s
      LEFT JOIN station_fuel sf ON s.id = sf.id_station
      LEFT JOIN fuel f ON sf.id_fuel = f.id
    `)

        const stationsMap = new Map<number, Station & { fuels: (Fuel & { last_price_per_unit: number | null })[] }>()

        rows.forEach((row: any) => {
            const stationId = row.station_id
            if (!stationsMap.has(stationId)) {
                stationsMap.set(stationId, {
                    id: row.station_id,
                    name: row.station_name,
                    address: row.station_address,
                    phone: row.station_phone,
                    opening_hrs: row.station_opening_hrs,
                    closing_hrs: row.station_closing_hrs,
                    last_visit: row.station_last_visit,
                    provider: row.station_provider,
                    note: row.station_note,
                    created_at: row.station_created_at,
                    updated_at: row.station_updated_at,
                    fuels: [],
                })
            }
            if (row.fuel_id !== null) {
                stationsMap.get(stationId)!.fuels.push({
                    id: row.fuel_id,
                    name: row.fuel_name,
                    code: row.fuel_code,
                    trademark: row.fuel_trademark,
                    unit: row.fuel_unit,
                    last_price_per_unit: row.last_price_per_unit
                })
            }
        })

        return Array.from(stationsMap.values())
    }

    async updateStationWithFuels(
        stationId: number,
        stationData: Partial<Station>,
        fuels: { id: number; last_price_per_unit?: number | null }[]
    ): Promise<void> {
        const db = await Database.getConnection()

        const fields: string[] = []
        const values: any[] = []
        for (const key in stationData) {
            if (stationData[key as keyof Station] !== undefined) {
                fields.push(`${key} = ?`)
                values.push(stationData[key as keyof Station])
            }
        }

        if (fields.length > 0) {
            const updateSql = `
        UPDATE station
        SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `
            values.push(stationId)
            await db.runAsync(updateSql, values)
        }

        await db.runAsync("DELETE FROM station_fuel WHERE id_station = ?", [stationId])

        for (const fuel of fuels) {
            await db.runAsync(
                `INSERT INTO station_fuel (id_station, id_fuel, last_price_per_unit) VALUES (?, ?, ?)`,
                [stationId, fuel.id, fuel.last_price_per_unit ?? null]
            )
        }
    }

    async getStationWithFuelsById(stationFuelId: number) {
        const db = await Database.getConnection();

        const stationFuel = await db.getFirstAsync<StationFuel>(
            `SELECT * FROM station_fuel WHERE id = ?`,
            [stationFuelId]
        );

        if (!stationFuel) {
            throw new Error(`Záznam station_fuel s ID ${stationFuelId} nebyl nalezen.`);
        }

        const station = await db.getFirstAsync<Station>(
            `SELECT * FROM station WHERE id = ?`,
            [stationFuel.id_station]
        );

        if (!station) {
            throw new Error(`Stanice s ID ${stationFuel.id_station} nebyla nalezena.`);
        }

        const fuels = await db.getAllAsync<Fuel>(
            `SELECT fuel.* FROM fuel
         INNER JOIN station_fuel ON fuel.id = station_fuel.id_fuel
         WHERE station_fuel.id_station = ?`,
            [stationFuel.id_station]
        );

        return {
            station,
            fuels
        };
    }

    async getFuelsByStationId(stationId: number): Promise<Fuel[]> {
        const db = await Database.getConnection();

        const fuels = await db.getAllAsync<Fuel>(
            `SELECT fuel.*
             FROM fuel
             INNER JOIN station_fuel ON fuel.id = station_fuel.id_fuel
             WHERE station_fuel.id_station = ?`,
            [stationId]
        );

        return fuels;
    }

    async deleteByFuel(id_fuel: number) {
        await Database.executeSql('DELETE FROM station_fuel WHERE id_fuel = ?', [id_fuel]);
    }

    async deleteByStation(id_station: number) {
        await Database.executeSql('DELETE FROM station_fuel WHERE id_station = ?', [id_station]);
    }

    async deleteByFuelAndStation(id_station: number, id_fuel: number) {
        await Database.executeSql('DELETE FROM station_fuel WHERE id_station = ? AND id_fuel = ?', [id_station, id_fuel]);
    }

    async deleteByStationAndFuel(id_station: number, id_fuel: number) {
        await Database.executeSql(
            'DELETE FROM station_fuel WHERE id_station = ? AND id_fuel = ?',
            [id_station, id_fuel]
        );
    }
}

export const stationFuelRepository = new StationFuelRepository()