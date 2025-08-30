import DatabaseRepository from "@/database/abstract/databaseRepository";
import { Badge } from "@/models/Badge";

export class BadgeRepository extends DatabaseRepository<Badge> {
    protected tableName = Badge.tableName;
    protected columns = Badge.columns;
    protected modelClass = Badge;
}

export const badgeRepository = new BadgeRepository()