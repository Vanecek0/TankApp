import Database from "@/database/database";

export type BadgeTanking = {
    id?: number;
    id_badge: number;
    id_tanking: number;
};


export class BadgeTankingModel {

    static async create(badge_tanking: BadgeTanking) {
        try {
            const result = await Database.executeSql(
                'INSERT OR REPLACE INTO badge_tanking (id_badge, id_tanking) VALUES (?, ?)',
                [badge_tanking.id_badge, badge_tanking.id_tanking]
            );
            return result;
        }
        catch (error) {
            console.error('Chyba při vkládání badge_tanking:', error);
            throw new Error('Nepodařilo se vytvořit nový záznam.');
        }
    }

    static async all(): Promise<BadgeTanking[]> {
        const db = await Database.getConnection();
        const rows = await db.getAllAsync<BadgeTanking>('SELECT bt.* FROM badge_tanking bt INNER JOIN badge b ON bt.id_badge = b.id INNER JOIN tanking t ON bt.id_tanking = t.id');
        return rows;
    }

    static async count(): Promise<any> {
        const db = await Database.getConnection();
        const promiseThen = new Promise((resolve, reject) => {
            const count = db.getAllAsync('SELECT COUNT(*) FROM badge_tanking')
            resolve(count);
        });

        return promiseThen
            .then((val: any) => {
                return val[0]["COUNT(*)"];
            })
            .catch((err) => console.log(err));
    }

    static async delete(id: number) {
        await Database.executeSql('DELETE FROM badge_tanking WHERE id = ?', [id]);
    }
}