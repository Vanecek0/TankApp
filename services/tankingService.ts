import Database from "@/database/database";
import { Badge } from "@/models/Badge";
import { Station } from "@/models/Station";
import { Tanking } from "@/models/Tanking";
import { BadgeTankingRepository, badgeTankingRepository } from "@/repositories/badgeTankingRepository";

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

    async getGroupedTankingsByMonth(
        order: "DESC" | "ASC" = "DESC",
        carId: number,
        limit?: number
    ) {
        const db = await Database.getConnection();

        const rows = await db.getAllAsync<any>(
            `
        SELECT 
            t.*, 
            s.id AS station_id,
            s.name AS station_name,
            s.address AS station_address,
            s.phone AS station_phone,
            s.opening_hrs AS station_opening_hrs,
            s.closing_hrs AS station_closing_hrs,
            s.last_visit AS station_last_visit,
            s.provider AS station_provider,
            s.note AS station_note,
            s.created_at AS station_created_at,
            s.updated_at AS station_updated_at
        FROM tanking t
        LEFT JOIN station_fuel sf ON sf.id = t.station_fuel_id
        LEFT JOIN station s ON s.id = sf.id_station
        WHERE t.car_id = ?
        ORDER BY t.tank_date ${order}
        LIMIT ?
        `,
            [carId, limit ?? -1]
        );

        const badgesMap = await this.getBadgesByTanking(rows.map(r => r.id!));

        const grouped = new Map<string, (Tanking & { station?: Station; badges: Badge[] })[]>();

        for (const row of rows) {
            const month = new Date(row.tank_date).toISOString().slice(0, 7);
            const monthTankings = grouped.get(month) || [];

            const station = row.station_id
                ? Object.assign(
                    new Station(),
                    {
                        id: row.station_id,
                        name: row.station_name,
                        address: row.station_address,
                        phone: row.station_phone,
                        opening_hrs: row.station_opening_hrs,
                        closing_hrs: row.station_closing_hrs,
                        last_visit: row.station_last_visit,
                        provider: row.station_provider,
                        note: row.station_note,
                        created_at: row.station_created_at,
                        updated_at: row.station_updated_at,
                    }
                )
                : undefined;

            const { station_id, station_name, station_address, station_phone,
                station_opening_hrs, station_closing_hrs, station_last_visit,
                station_provider, station_note, station_created_at, station_updated_at,
                ...tankingData } = row;

            monthTankings.push({
                ...tankingData,
                station,
                badges: badgesMap[row.id!] || [],
            });

            grouped.set(month, monthTankings);
        }

        return Array.from(grouped, ([month, tankings]) => ({
            month,
            tankings,
        }));
    }

}

export const tankingService = new TankingService(badgeTankingRepository)