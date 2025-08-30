import BaseRepository from "@/database/abstract/baseRepository";
import { TankingStatistics } from "@/models/TankingStatistics";

export class TankingStatisticsRepository extends BaseRepository<TankingStatistics> {
    protected tableName = TankingStatistics.tableName;
    protected columns = TankingStatistics.columns;
    protected modelClass = TankingStatistics;
}

export const tankingStatisticsRepository = new TankingStatisticsRepository()