import { Database } from "@/database/database";

export type Badge = {
    id?: number;
    name: string;
    color: string;
};

export class BadgeModel {

    static async create(badge: Badge) {
        try {
            const result = await Database.executeSql(
                'INSERT INTO badge (name, color) VALUES (?, ?)',
                [badge.name, badge.color]
            );

            return result;
        }
        catch (error) {
            console.error('Chyba při vkládání badge:', error);
            throw new Error('Nepodařilo se vytvořit nový záznam.');
        }
    }

    static async all(): Promise<Badge[]> {
        const db = await Database.getConnection();
        const rows = await db.getAllAsync<Badge>('SELECT * FROM badge');
        return rows;
    }

    static async getBadgesByTanking(tanking_id: number): Promise<(Badge)[]> {
        const db = await Database.getConnection();
        const rows = await db.getAllAsync(
            `SELECT b.* FROM badge b
            INNER JOIN badge_tanking bt ON b.id = bt.id_badge
           WHERE bt.id_tanking = ?
           ORDER BY b.id DESC`,
            [tanking_id],
        )

        return rows.map((row: any) => ({
            id: row.id,
            name: row.name,
            color: row.color,
        }))
    }

    static async count(): Promise<any> {
        const db = await Database.getConnection();
        const promiseThen = new Promise((resolve, reject) => {
            const count = db.getAllAsync('SELECT COUNT(*) FROM badge')
            resolve(count);
        });

        return promiseThen
            .then((val: any) => {
                return val[0]["COUNT(*)"];
            })
            .catch((err) => console.log(err));
    }

    static async findById(id: number): Promise<Badge | null> {
        const db = await Database.getConnection();
        const row = await db.getFirstAsync<Badge>('SELECT * FROM badge WHERE id = ?', [id]);
        return row;
    }

    static async delete(id: number) {
        await Database.executeSql('DELETE FROM badge WHERE id = ?', [id]);
    }

}