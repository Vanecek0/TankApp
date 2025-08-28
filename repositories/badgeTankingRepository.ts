import Database from "@/database/database"
import { Badge } from "@/models/Badge";
import { BadgeTankingModel } from "@/models/BadgeTanking";

class BadgeTankingRepository {
protected model = BadgeTankingModel;

    async getBadgesByTanking(tankingIds: number[]): Promise<{ [key: number]: Badge[] }> {
        const db = await Database.getConnection();
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

    async getBadgeByTanking(tankingId: number): Promise<Badge[]> {
        return (await this.getBadgesByTanking([tankingId]))[tankingId] || [];
    }
}

export const badgeTankingRepository = new BadgeTankingRepository()