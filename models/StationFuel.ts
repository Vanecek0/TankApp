import { Database } from "@/database/database";
import { Station } from "./Station";
import { Fuel } from "./Fuel";

export type StationFuel = {
    id?: number;
    id_station: number;
    id_fuel: number;
    last_price_per_unit: number;
};


export class StationFuelModel {

    static async create(station_fuel: StationFuel) {
        try {
            const result = await Database.executeSql(
                'INSERT OR REPLACE INTO station_fuel (id_station, id_fuel, last_price_per_unit) VALUES (?, ?, ?)',
                [station_fuel.id_station, station_fuel.id_fuel, station_fuel.last_price_per_unit]
            );
            return result;
        }
        catch (error) {
            console.error('Chyba při vkládání station_fuel:', error);
            throw new Error('Nepodařilo se vytvořit nový záznam.');
        }
    }

    static async all(): Promise<StationFuel[]> {
        const db = await Database.getConnection();
        const rows = await db.getAllAsync<StationFuel>(
            'SELECT sf.* FROM station_fuel sf INNER JOIN station s ON sf.id_station = s.id INNER JOIN fuel f ON sf.id_fuel = f.id'
        );
        return rows;
    }

    static async count(): Promise<any> {
        const db = await Database.getConnection();
        const promiseThen = new Promise((resolve, reject) => {
            const count = db.getAllAsync('SELECT COUNT(*) FROM station_fuel')
            resolve(count);
        });

        return promiseThen
            .then((val: any) => {
                return val[0]["COUNT(*)"];
            })
            .catch((err) => console.log(err));
    }

    static async exists(id_station: number, id_fuel: number): Promise<boolean> {
        const db = await Database.getConnection();
        const rows = await db.getAllAsync(
            'SELECT 1 FROM station_fuel WHERE id_station = ? AND id_fuel = ? LIMIT 1',
            [id_station, id_fuel]
        );
        return rows.length > 0;
    }

    static async getStationWithFuelsById(stationFuelId: number) {
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

    static async delete(id: number) {
        await Database.executeSql('DELETE FROM station_fuel WHERE id = ?', [id]);
    }

    static async deleteByFuel(id_fuel: number) {
        await Database.executeSql('DELETE FROM station_fuel WHERE id_fuel = ?', [id_fuel]);
    }

    static async deleteByStation(id_station: number) {
        await Database.executeSql('DELETE FROM station_fuel WHERE id_station = ?', [id_station]);
    }

    static async deleteByFuelAndStation(id_station: number, id_fuel: number) {
        await Database.executeSql('DELETE FROM station_fuel WHERE id_station = ? AND id_fuel = ?', [id_station, id_fuel]);
    }

    static async deleteByStationAndFuel(id_station: number, id_fuel: number) {
        await Database.executeSql(
            'DELETE FROM station_fuel WHERE id_station = ? AND id_fuel = ?',
            [id_station, id_fuel]
        );
    }
}