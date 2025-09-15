import Database from "@/database/database";
import { Badge } from "@/models/Badge";
import { Fuel } from "@/models/Fuel";
import { Station } from "@/models/Station";
import { Tanking } from "@/models/Tanking";
import { BadgeTankingRepository, badgeTankingRepository } from "@/repositories/badgeTankingRepository";
import { tankingRepository } from "@/repositories/tankingRepository";

export class TankingService {
    constructor(
        private badgeTankingRepository: BadgeTankingRepository
    ) { }

    async assignBadgeToTanking(tankingId: number, badgeId: number) {
        return this.badgeTankingRepository.create({ tanking_id: tankingId, badge_id: badgeId });
    }

    async getBadgesByTanking(tankingIds: number[]): Promise<Record<number, Badge[]>> {
        if (tankingIds.length === 0) return {};

        const db = await Database.getConnection();
        const placeholders = tankingIds.map(() => "?").join(",");

        const rows = await db.getAllAsync<(Badge & { id_tanking: number })>(
            `
            SELECT b.id, b.name, b.color, bt.id_tanking
            FROM badge b
            JOIN badge_tanking bt ON b.id = bt.id_badge
            WHERE bt.id_tanking IN (${placeholders})
            ORDER BY bt.id_tanking, b.id DESC
            `,
            tankingIds
        );

        return rows.reduce<Record<number, Badge[]>>((acc, { id, name, color, id_tanking }) => {
            (acc[id_tanking] ??= []).push({ id, name, color });
            return acc;
        }, {});
    }

    async getGroupedTankingsByMonth(order: "DESC" | "ASC" = "DESC", carId: number, limit?: number) {
        const rows = await tankingRepository.select(
            { car_id: carId },
            ["id", "snapshot", "tank_date"],
            { column: "tank_date", direction: order },
            limit
        );

        const badgesMap = await this.getBadgesByTanking(rows.map(r => r.id!));
        const grouped = new Map<string, (Tanking & {station?: Station; fuels?: Fuel[]; badges: Badge[] })[]>();

        const safeParse = (json?: string) => {
            try {
                return json ? JSON.parse(json) : {};
            } catch {
                console.warn("Invalid snapshot JSON:", json);
                return {};
            }
        };

        for (const row of rows) {
            const snap = safeParse(row.snapshot);
            const month = new Date(row.tank_date).toISOString().slice(0, 7);

            const monthTankings = grouped.get(month) || [];
            monthTankings.push({
                ...snap,
                badges: badgesMap[row.id!] || []
            });

            grouped.set(month, monthTankings);
        }

        return Array.from(grouped, ([month, tankings]) => ({ month, tankings }));
    }

}

export const tankingService = new TankingService(badgeTankingRepository)