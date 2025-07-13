import { Database } from "@/database/database";

export type Servicing = {
  id?: number;
  car_id: number;
  name: string;
  description: string;
  autoservice_id: number;
  service_date: number;
  created_at: number;
  updated_at: number;
};

export class ServicingModel {

    static async create(servicing: Servicing) {
        try {
            const result = await Database.executeSql(
                'INSERT INTO servicing (car_id, name, description, autoservice_id, service_date, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [servicing.car_id, servicing.name, servicing.description, servicing.autoservice_id, servicing.service_date, servicing.created_at, servicing.updated_at]
            );
            return result;
        }
        catch (error) {
            console.error('Chyba při vkládání servicing:', error);
            throw new Error('Nepodařilo se vytvořit nový záznam.');
        }
    }

    static async all(): Promise<Servicing[]> {
        const db = await Database.getConnection();
        const rows = await db.getAllAsync<Servicing>('SELECT * FROM servicing');
        return rows;
    }

    static async count(): Promise<any> {
        const db = await Database.getConnection();
        const promiseThen = new Promise((resolve, reject) => {
            const count = db.getAllAsync('SELECT COUNT(*) FROM servicing')
            resolve(count);
        });

        return promiseThen
            .then((val: any) => {
                return val[0]["COUNT(*)"];
            })
            .catch((err) => console.log(err));
    }

    static async findById(id: number): Promise<Servicing | null> {
        const db = await Database.getConnection();
        const row = await db.getFirstAsync<Servicing>('SELECT * FROM servicing WHERE id = ?', [id]);
        return row;
    }

    static async delete(id: number) {
        await Database.executeSql('DELETE FROM servicing WHERE id = ?', [id]);
    }
}