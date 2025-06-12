import { Database } from "@/database/database";

export type Fuel = {
  id?: number;
  name: string;
  code: string;
  trademark: string;
  unit: string;
};

export class FuelModel {

    static async create(fuel: Fuel) {
        try {
            const result = await Database.executeSql(
                'INSERT INTO fuel (name, code, trademark, unit) VALUES (?, ?, ?, ?)',
                [fuel.name, fuel.code, fuel.trademark, fuel.unit]
            );

            return result;
        }
        catch (error) {
            console.error('Chyba při vkládání:', error);
            throw new Error('Nepodařilo se vytvořit nový záznam.');
        }
    }

    static async all(): Promise<Fuel[]> {
        const db = await Database.getConnection();
        const rows = await db.getAllAsync<Fuel>('SELECT * FROM fuel');
        return rows;
    }

    static async count(): Promise<any> {
        const db = await Database.getConnection();
        const promiseThen = new Promise((resolve, reject) => {
            const count = db.getAllAsync('SELECT COUNT(*) FROM fuel')
            resolve(count);
        });

        return promiseThen
            .then((val: any) => {
                return val[0]["COUNT(*)"];
            })
            .catch((err) => console.log(err));
    }

    static async findById(id: number): Promise<Fuel | null> {
        const db = await Database.getConnection();
        const row = await db.getFirstAsync<Fuel>('SELECT * FROM fuel WHERE id = ?', [id]);
        return row;
    }

    static async delete(id: number) {
        await Database.executeSql('DELETE FROM fuel WHERE id = ?', [id]);
    }

}