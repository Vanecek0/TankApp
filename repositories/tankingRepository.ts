import BaseRepository from "@/database/abstract/baseRepository";
import { Tanking } from "@/models/Tanking";

export class TankingRepository extends BaseRepository<Tanking> {
    protected tableName = Tanking.tableName;
    protected columns = Tanking.columns;
    protected modelClass = Tanking;

    async getAll(): Promise<Tanking[]> {
        try {
            const result = await this.select();
            return result || [];
        } catch (err) {
            console.error("Error loading tankings:", err);
            return [];
        }
    }

    async getById(id: number): Promise<Tanking | null> {
        try {
            const result = await this.select({ id: id });
            if (!result || result.length === 0) {
                return null;
            }
            return result[0];
        } catch (err) {
            console.error(`Error fetching tanking with id ${id}:`, err);
            return null;
        }
    }

    async getFirst(): Promise<Tanking | null> {
        try {
            const result = await this.select({}, [], [], 1);
            if (!result || result.length === 0) {
                return null;
            }
            return result[0];
        } catch (err) {
            console.error("Error fetching first tanking:", err);
            return null;
        }
    }

    async removeById(id: number): Promise<boolean> {
        try {
            const result = await this.delete({ id });
            if (!result) {
                console.warn(`Tanking with id ${id} could not be deleted`);
                return false;
            }
            return true;
        } catch (err) {
            console.error(`Error deleting tanking with id ${id}:`, err);
            return false;
        }
    }

    static async getTotalPriceAndMileage(): Promise<{ total_price: number; total_mileage: number }> {
        const db = await this.getDb();
        const result = await db.getFirstAsync<{ total_price: number; total_mileage: number }>(
            `SELECT 
            SUM(price) AS total_price, 
            SUM(mileage) AS total_mileage 
            FROM tanking WHERE car_id = 1`
        );
        return {
            total_price: result?.total_price ?? 0,
            total_mileage: result?.total_mileage ?? 0,
        };
    }

    static async getPriceMileageSumByDate(
        carId: number,
        fromDate?: Date,
        toDate?: Date,
        limit?: number
    ): Promise<{ month: string; total_price: number; total_mileage: number }[]> {
        const from = fromDate?.getTime() ?? 0;
        const to = toDate?.getTime() ?? Date.now();
        const db = await this.getDb();

        const rows = await db.getAllAsync<{ tank_date: number; snapshot: string }>(
            `SELECT 
            tank_date, 
            snapshot 
            FROM tanking 
            WHERE car_id = ? AND tank_date BETWEEN ? AND ? ORDER BY tank_date DESC`,
            [carId, from, to]
        );

        const monthly = new Map<string, { total_price: number; total_mileage: number }>();

        for (const { tank_date, snapshot } of rows) {
            let snap: { price?: number; mileage?: number };

            try {
                snap = JSON.parse(snapshot);
            } catch {
                console.warn('Invalid snapshot JSON:', snapshot);
                continue;
            }

            const month = new Date(tank_date).toISOString().slice(0, 7);
            const data = monthly.get(month) ?? { total_price: 0, total_mileage: 0 };

            data.total_price += snap.price ?? 0;
            data.total_mileage += snap.mileage ?? 0;

            monthly.set(month, data);
        }

        return Array.from(monthly.entries())
            .sort(([a], [b]) => b.localeCompare(a))
            .slice(0, limit)
            .map(([month, data]) => ({ month, ...data }));
    }

}

export const tankingRepository = new TankingRepository()