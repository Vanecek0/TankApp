import type { SQLiteDatabase } from 'expo-sqlite';

export type Badge = {
    id?: number;
    name: string;
    color: string;
};

export class BadgeModel {
    static async create(db: SQLiteDatabase, badge: Badge) {
        return db.runAsync('INSERT INTO badge (name, color) VALUES (?, ?)', [badge.name, badge.color]);
    }

    static async all(db: SQLiteDatabase): Promise<Badge[]> {
        return db.getAllAsync<Badge>('SELECT * FROM badge');
    }

    static async findById(db: SQLiteDatabase, id: number): Promise<Badge | null> {
        return db.getFirstAsync<Badge>('SELECT * FROM badge WHERE id = ?', [id]);
    }

    static async delete(db: SQLiteDatabase, id: number) {
        return db.runAsync('DELETE FROM badge WHERE id = ?', [id]);
    }

    static async count(db: SQLiteDatabase): Promise<number> {
        const row = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) AS count FROM badge');
        return row?.count ?? 0;
    }

    static async getBadgesByTanking(db: SQLiteDatabase, tankingIds: number[]): Promise<{ [key: number]: Badge[] }> {
        if (tankingIds.length === 0) return {};
        const placeholders = tankingIds.map(() => '?').join(',');

        const rows = await db.getAllAsync<(Badge & { id_tanking: number })>(
            `SELECT b.*, bt.id_tanking
       FROM badge b
       JOIN badge_tanking bt ON b.id = bt.id_badge
       WHERE bt.id_tanking IN (${placeholders})
       ORDER BY bt.id_tanking, b.id DESC`,
            tankingIds
        );

        return rows.reduce((acc, row) => {
            acc[row.id_tanking] ||= [];
            acc[row.id_tanking].push({ id: row.id, name: row.name, color: row.color });
            return acc;
        }, {} as { [key: number]: Badge[] });
    }

    static async getBadgeByTanking(db: SQLiteDatabase, tankingId: number): Promise<Badge[]> {
        return (await this.getBadgesByTanking(db, [tankingId]))[tankingId] || [];
    }
}