import type { SQLiteDatabase } from 'expo-sqlite';

export type Badge = {
    id?: number;
    name: string;
    color: string;
};

export class BadgeModel {
    static async create(db: SQLiteDatabase, badge: Badge) {
        try {
            return await db.runAsync(
                'INSERT INTO badge (name, color) VALUES (?, ?)',
                [badge.name, badge.color]
            );
        } catch (error) {
            console.error('Chyba při vkládání badge:', error);
            throw new Error('Nepodařilo se vytvořit nový záznam.');
        }
    }

    static async all(db: SQLiteDatabase): Promise<Badge[]> {
        return await db.getAllAsync<Badge>('SELECT * FROM badge');
    }

    static async findById(db: SQLiteDatabase, id: number): Promise<Badge | null> {
        return await db.getFirstAsync<Badge>('SELECT * FROM badge WHERE id = ?', [id]);
    }

    static async delete(db: SQLiteDatabase, id: number) {
        await db.runAsync('DELETE FROM badge WHERE id = ?', [id]);
    }

    static async count(db: SQLiteDatabase): Promise<number> {
        const rows = await db.getAllAsync<{ count: number }>('SELECT COUNT(*) AS count FROM badge');
        return rows[0]?.count ?? 0;
    }

    static async getBadgeByTanking(db: SQLiteDatabase, tanking_id: number): Promise<Badge[]> {
        const rows = await db.getAllAsync<Badge>(
            `SELECT b.* FROM badge b
       INNER JOIN badge_tanking bt ON b.id = bt.id_badge
       WHERE bt.id_tanking = ?
       ORDER BY b.id DESC`,
            [tanking_id]
        );

        return rows.map(row => ({
            id: row.id,
            name: row.name,
            color: row.color,
        }));
    }

    static async getBadgesByTanking(
        db: SQLiteDatabase,
        tanking_ids: number[]
    ): Promise<{ [key: number]: Badge[] }> {
        if (tanking_ids.length === 0) return {};

        const placeholders = tanking_ids.map(() => '?').join(',');
        const rows = await db.getAllAsync<Badge & {id_tanking: number}>(
            `SELECT b.*, bt.id_tanking
       FROM badge b
       INNER JOIN badge_tanking bt ON b.id = bt.id_badge
       WHERE bt.id_tanking IN (${placeholders})
       ORDER BY bt.id_tanking, b.id DESC`,
            tanking_ids
        );

        const result: { [key: number]: Badge[] } = {};
        rows.forEach(row => {
            const tankingId = row.id_tanking;
            if (!result[tankingId]) {
                result[tankingId] = [];
            }
            result[tankingId].push({
                id: row.id,
                name: row.name,
                color: row.color,
            });
        });

        return result;
    }
}