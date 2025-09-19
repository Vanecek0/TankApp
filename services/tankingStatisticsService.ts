import { TankingStatistics } from "@/models/TankingStatistics";
import { tankingRepository, TankingRepository } from "@/repositories/tankingRepository";

export class TankingStatisticsService {

    async getYearTankingStats(
        carId: number,
        fuelId?: number
    ): Promise<Omit<TankingStatistics, 'period'>> {
        const db = await TankingRepository.getDb();

        const from = (() => {
            const now = new Date();
            return `${now.getFullYear() - 1}-${String(new Date(now.getFullYear(), now.getMonth() + 1).getMonth()).padStart(2, '0')}`;
        })();

        const to = (() => {
            const date = new Date();
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        })();

        console.log(from)

        try {
            const rows = await db.getAllAsync<{
                total_amount: number;
                total_mileage: number;
                total_price: number;
                avg_price_per_unit: number;
                avg_consumption: number;
                min_tanking: number;
                max_tanking: number;
                min_price: number;
                max_price: number;
                last_tachometer: number;
            }>(`
            SELECT * 
            FROM monthly_tanking_stats
            WHERE car_id = ? AND period BETWEEN ? AND ?;
          `, [carId, from, to]);

            return rows[0];
        } catch (error) {
            console.error("Failed to get sum of tanking stats:", error);
            throw error;
        }
    }

    async getLastMonthTankingStats(
        carId: number,
        fuelId?: number
    ): Promise<Omit<TankingStatistics, 'period'>> {
        const db = await TankingRepository.getDb();
        

        const from = (() => {
            const now = new Date();
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
            return `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
        })();

        const to = (() => {
            const now = new Date();
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
            return `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
        })();

        try {
            const rows = await db.getAllAsync<{
                total_amount: number;
                total_mileage: number;
                total_price: number;
                avg_price_per_unit: number;
                avg_consumption: number,
                min_tanking: number;
                max_tanking: number;
                min_price: number;
                max_price: number;
                last_tachometer: number;
            }>(`
            SELECT * 
            FROM monthly_tanking_stats
            WHERE car_id = ? AND period BETWEEN ? AND ?
        `, [carId, from, to]);

            return rows[0];
        } catch (error) {
            console.error("Failed to get sum of tanking stats:", error);
            throw error;
        }
    }

    async getThisMonthTankingStats(
        carId: number,
        fuelId?: number
    ): Promise<Omit<TankingStatistics, 'period'>> {
        const db = await TankingRepository.getDb();

        const from = (() => {
            const now = new Date();
            const lastMonth = new Date(now.getFullYear(), now.getMonth());
            return `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
        })();

        const to = (() => {
            const now = new Date();
            const lastMonth = new Date(now.getFullYear(), now.getMonth());
            return `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
        })();

        try {
            const rows = await db.getAllAsync<{
                total_amount: number;
                total_mileage: number;
                total_price: number;
                avg_price_per_unit: number;
                avg_consumption: number,
                min_tanking: number;
                max_tanking: number;
                min_price: number;
                max_price: number;
                last_tachometer: number;
            }>(`
            SELECT * 
            FROM monthly_tanking_stats
            WHERE car_id = ? AND period BETWEEN ? AND ?
        `, [carId, from, to]);

            return rows[0];
        } catch (error) {
            console.error("Failed to get sum of tanking stats:", error);
            throw error;
        }
    }

}

export const tankingStatisticService = new TankingStatisticsService()