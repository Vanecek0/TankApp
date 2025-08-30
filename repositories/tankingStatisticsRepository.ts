import DatabaseRepository from "@/database/abstract/databaseRepository";
import { TankingStatistics } from "@/models/TankingStatistics";

export class TankingStatisticsRepository extends DatabaseRepository<TankingStatistics> {
    protected tableName = TankingStatistics.tableName;
    protected columns = TankingStatistics.columns;
    protected modelClass = TankingStatistics;
}

export const tankingStatisticsRepository = new TankingStatisticsRepository()