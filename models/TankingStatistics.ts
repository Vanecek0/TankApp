import Database from "@/database/database";

export type TankingStatistics = {
    period: string;
    total_amount: number;
    total_mileage: number;
    total_price: number;
    last_tachometer: number;
    avg_price_per_unit: number;
};

export class TankingStatisticsModel {

    static async all(fromDate?: Date, toDate?: Date): Promise<TankingStatistics[]> {
        const db = await Database.getConnection();
        const rows = await db.getAllAsync<TankingStatistics>(
            'SELECT * FROM monthly_tanking_stats ORDER BY period DESC'
        );

        if (!fromDate && !toDate) {
            return rows;
        }

        const fromPeriod = fromDate ? fromDate.toISOString().slice(0, 7) : null;
        const toPeriod = toDate ? toDate.toISOString().slice(0, 7) : null;

        const filtered = rows.filter(row => {
            if (fromPeriod && row.period < fromPeriod) return false;
            if (toPeriod && row.period > toPeriod) return false;
            return true;
        });
        return filtered;
    }

    static async getSumOfMonthlyTankingStatsByDate(
        fromDate?: Date,
        toDate?: Date
    ): Promise<Omit<TankingStatistics, 'period'>> {
        const db = await Database.getConnection();

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

    static async count(): Promise<any> {
        const db = await Database.getConnection();
        const promiseThen = new Promise((resolve, reject) => {
            const count = db.getAllAsync('SELECT COUNT(*) FROM monthly_tanking_stats')
            resolve(count);
        });

        return promiseThen
            .then((val: any) => {
                return val[0]["COUNT(*)"];
            })
            .catch((err) => console.log(err));
    }
}