import Database from "@/database/database";

export type Autoservice = {
  id?: number;
  name: string;
  address: string;
  created_at: number;
  updated_at: number;
};

export class AutoserviceModel {

    static async create(autoservice: Autoservice) {
        try {
            const result = await Database.executeSql(
                'INSERT INTO autoservice (name, address, created_at, updated_at) VALUES (?, ?, ?, ?)',
                [autoservice.name, autoservice.address, autoservice.created_at, autoservice.updated_at]
            );

            return result;
        }
        catch (error) {
            console.error('Chyba při vkládání autoservice:', error);
            throw new Error('Nepodařilo se vytvořit nový záznam.');
        }
    }

    static async all(): Promise<Autoservice[]> {
        const db = await Database.getConnection();
        const rows = await db.getAllAsync<Autoservice>('SELECT * FROM autoservice');
        return rows;
    }

    static async count(): Promise<any> {
        const db = await Database.getConnection();
        const promiseThen = new Promise((resolve, reject) => {
            const count = db.getAllAsync('SELECT COUNT(*) FROM autoservice')
            resolve(count);
        });

        return promiseThen
            .then((val: any) => {
                return val[0]["COUNT(*)"];
            })
            .catch((err) => console.log(err));
    }

    static async findById(id: number): Promise<Autoservice | null> {
        const db = await Database.getConnection();
        const row = await db.getFirstAsync<Autoservice>('SELECT * FROM autoservice WHERE id = ?', [id]);
        return row;
    }

    static async delete(id: number) {
        await Database.executeSql('DELETE FROM autoservice WHERE id = ?', [id]);
    }

}