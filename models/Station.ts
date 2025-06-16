import { Database } from "@/database/database";

export type Station = {
  id?: number;
  name: string;
  address: string;
  last_visit: number;
  provider: string;
  created_at: number;
  updated_at: number;
};

export class StationModel {

    static async create(station: Station) {
        try {
            const result = await Database.executeSql(
                'INSERT INTO station (name, address, last_visit, provider, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
                [station.name, station.address, station.last_visit, station.provider, station.created_at, station.updated_at]
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