import DatabaseRepository from "@/database/abstract/databaseRepository";
import { TankingStatistics } from "@/models/TankingStatistics";

export class TankingStatisticsRepository extends DatabaseRepository<TankingStatistics> {
    protected tableName = TankingStatistics.tableName;
    protected columns = TankingStatistics.columns;
    protected modelClass = TankingStatistics;

    async getAll(): Promise<TankingStatistics[]> {
        try {
            const result = await this.select();
            return result || [];
        } catch (err) {
            console.error("Error loading tanking statistics:", err);
            return [];
        }
    }

}

export const tankingStatisticsRepository = new TankingStatisticsRepository()