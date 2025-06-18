import { Database } from "@/database/database";

export type TankingStatistics = {
    period: string;
    total_amount: number;
    total_price: number;
    last_tachometer: number;
    avg_price_per_unit: number;
};

export class TankingStatisticsModel {

    static async all(): Promise<TankingStatistics[]> {
        const db = await Database.getConnection();
        const rows = await db.getAllAsync<TankingStatistics>('SELECT * FROM monthly_tanking_stats ORDER BY period DESC');
        return rows;
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