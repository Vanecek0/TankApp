import { Database } from "@/database/database";

export type Part = {
  id?: number;
  name: string;
  manufacturer: string;
  oem_code: string;
  description: string;
  price: number;
  count: number;
  unit: string;
  created_at: number;
  updated_at: number;
};

export class PartModel {

    static async create(part: Part) {
        try {
            const result = await Database.executeSql(
                'INSERT INTO part (name, manufacturer, oem_code, description, price, count, unit, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [part.name, part.manufacturer, part.oem_code, part.description, part.price, part.count, part.unit, part.created_at, part.updated_at]
            );

            return result;
        }
        catch (error) {
            console.error('Chyba při vkládání part:', error);
            throw new Error('Nepodařilo se vytvořit nový záznam.');
        }
    }

    static async all(): Promise<Part[]> {
        const db = await Database.getConnection();
        const rows = await db.getAllAsync<Part>('SELECT * FROM part');
        return rows;
    }

    static async count(): Promise<any> {
        const db = await Database.getConnection();
        const promiseThen = new Promise((resolve, reject) => {
            const count = db.getAllAsync('SELECT COUNT(*) FROM part')
            resolve(count);
        });

        return promiseThen
            .then((val: any) => {
                return val[0]["COUNT(*)"];
            })
            .catch((err) => console.log(err));
    }

    static async findById(id: number): Promise<Part | null> {
        const db = await Database.getConnection();
        const row = await db.getFirstAsync<Part>('SELECT * FROM part WHERE id = ?', [id]);
        return row;
    }

    static async delete(id: number) {
        await Database.executeSql('DELETE FROM part WHERE id = ?', [id]);
    }

}