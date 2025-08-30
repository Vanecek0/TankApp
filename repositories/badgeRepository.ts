import BaseRepository from "@/database/abstract/baseRepository";
import { Badge } from "@/models/Badge";

export class BadgeRepository extends BaseRepository<Badge> {
    protected tableName = Badge.tableName;
    protected columns = Badge.columns;
    protected modelClass = Badge;
}

export const badgeRepository = new BadgeRepository()