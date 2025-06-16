import { Database } from "@/database/database";

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
        const rows = await db.getAllAsync<StationFuel>('SELECT sf.* FROM station_fuel sf INNER JOIN station s ON sf.station_id = s.id INNER JOIN fuel f ON sf.fuel_id = f.id');
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

    static async delete(id: number) {
        await Database.executeSql('DELETE FROM station_fuel WHERE id = ?', [id]);
    }
}