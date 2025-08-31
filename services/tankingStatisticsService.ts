import { TankingStatistics } from "@/models/TankingStatistics";
import { tankingRepository, TankingRepository } from "@/repositories/tankingRepository";

export class TankingStatisticsService {
    constructor(
        private tankingRepository: TankingRepository
    ) { }

    async getSumOfMonthlyTankingStatsByDate(
        fromDate?: Date,
        toDate?: Date
    ): Promise<Omit<TankingStatistics, 'period'>> {
        const db = await TankingRepository.getDb();

        const from = fromDate?.getTime() ?? 0;
        const to = toDate?.getTime() ?? Date.now();

        try {
            const rows = await db.getAllAsync<{
                total_amount: number;
                total_mileage: number;
                total_price: number;
                last_tachometer: number;
                avg_price_per_unit: number;
            }>(`
            SELECT 
              SUM(amount) AS total_amount,
              SUM(mileage) AS total_mileage,
              SUM(price) AS total_price,
              MAX(tachometer) AS last_tachometer,
              AVG(price_per_unit) AS avg_price_per_unit
            FROM tanking
            WHERE 
            car_id = 1
            AND tank_date >= ?
              AND tank_date < ?
          `, [from, to]);

            return rows[0] ?? {
                total_amount: 0,
                total_mileage: 0,
                total_price: 0,
                last_tachometer: 0,
                avg_price_per_unit: 0
            };
        } catch (error) {
            console.error("Failed to get sum of tanking stats:", error);
            throw error;
        }
    }

}

export const tankingStatisticService = new TankingStatisticsService(tankingRepository)