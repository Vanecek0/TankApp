import Database from "@/database/database";

export type ServicingPart = {
  id?: number;
  id_part: number;
  id_servicing: number;
};

export class ServicingPartModel {

    static async create(servicing_part: ServicingPart) {
        try {
            const result = await Database.executeSql(
                'INSERT OR REPLACE INTO servicing_part (id_part, id_servicing) VALUES (?, ?)',
                [servicing_part.id_part, servicing_part.id_servicing]
            );
            return result;
        }
        catch (error) {
            console.error('Chyba při vkládání servicing_part:', error);
            throw new Error('Nepodařilo se vytvořit nový záznam.');
        }
    }

    static async all(): Promise<ServicingPart[]> {
        const db = await Database.getConnection();
        const rows = await db.getAllAsync<ServicingPart>('SELECT sf.* FROM servicing_part sp INNER JOIN servicing s ON sp.id_servicing = s.id INNER JOIN part p ON sp.id_part = p.id_part');
        return rows;
    }

    static async count(): Promise<any> {
        const db = await Database.getConnection();
        const promiseThen = new Promise((resolve, reject) => {
            const count = db.getAllAsync('SELECT COUNT(*) FROM servicing_part')
            resolve(count);
        });

        return promiseThen
            .then((val: any) => {
                return val[0]["COUNT(*)"];
            })
            .catch((err) => console.log(err));
    }

    static async delete(id: number) {
        await Database.executeSql('DELETE FROM servicing_part WHERE id = ?', [id]);
    }
}