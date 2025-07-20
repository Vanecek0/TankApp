import { Database } from "@/database/database";
import { Fuel } from "./Fuel";
import { StationFuel, StationFuelModel } from "./StationFuel";

export type Station = {
    id?: number;
    name: string;
    address: string;
    phone: string;
    opening_hrs: number;
    closing_hrs: number;
    last_visit: number;
    provider: string;
    note: string;
    created_at: number;
    updated_at: number;
};

export class StationModel {

    static async create(station: Station) {
        try {
            const result = await Database.executeSql(
                'INSERT INTO station (name, address, phone, opening_hrs, closing_hrs, last_visit, provider, note, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [station.name, station.address, station.phone, station.opening_hrs, station.closing_hrs, station.last_visit, station.provider, station.note, station.created_at, station.updated_at]
            );

            return result;
        }
        catch (error) {
            console.error('Chyba při vkládání station:', error);
            throw new Error('Nepodařilo se vytvořit nový záznam.');
        }
    }

    static async all(): Promise<Station[]> {
        const db = await Database.getConnection();
        const rows = await db.getAllAsync<Station>('SELECT * FROM station');
        return rows;
    }

    static async updateStation(id: number, stationData: Partial<Station>): Promise<void> {
        const db = await Database.getConnection();
        const fields: string[] = [];
        const values: any[] = [];

        for (const key in stationData) {
            if (stationData[key as keyof Station] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(stationData[key as keyof Station]);
            }
        }

        if (fields.length === 0) {
            return;
        }

        const updateQuery = `
        UPDATE station
        SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
        values.push(id);

        await db.runAsync(updateQuery, values);
    }

    static async getAllStationsWithFuels(): Promise<(Station & { fuels: (Fuel & { last_price_per_unit: number | null })[] })[]> {
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
          sf.last_price_per_unit AS last_price_per_unit -- Přímé mapování názvu sloupce
      FROM station s
      LEFT JOIN station_fuel sf ON s.id = sf.id_station
      LEFT JOIN fuel f ON sf.id_fuel = f.id;
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
                const station = stationsMap.get(stationId)!
                station.fuels.push({
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

    static async updateStationWithFuels(
        id: number,
        stationData: Partial<Station>,
        fuels: { id: number; last_price_per_unit?: number | null }[]
    ): Promise<void> {
        const db = await Database.getConnection();
        const fields: string[] = [];
        const values: any[] = [];

        for (const key in stationData) {
            if (stationData[key as keyof Station] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(stationData[key as keyof Station]);
            }
        }

        if (fields.length > 0) {
            const updateQuery = `
      UPDATE station
      SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
            values.push(id);
            await db.runAsync(updateQuery, values);
        }

        await StationFuelModel.delete(id);

        for (const fuel of fuels) {
            const stationFuel: StationFuel = {
                id_station: id,
                id_fuel: fuel.id,
                last_price_per_unit: fuel.last_price_per_unit!,
            };
            await StationFuelModel.create(stationFuel)
        }
    }

    static async count(): Promise<any> {
        const db = await Database.getConnection();
        const promiseThen = new Promise((resolve, reject) => {
            const count = db.getAllAsync('SELECT COUNT(*) FROM station')
            resolve(count);
        });

        return promiseThen
            .then((val: any) => {
                return val[0]["COUNT(*)"];
            })
            .catch((err) => console.log(err));
    }

    static async findById(id: number): Promise<Station | null> {
        const db = await Database.getConnection();
        const row = await db.getFirstAsync<Station>('SELECT * FROM station WHERE id = ?', [id]);
        return row;
    }

    static async delete(id: number) {
        await Database.executeSql('DELETE FROM station WHERE id = ?', [id]);
    }

}