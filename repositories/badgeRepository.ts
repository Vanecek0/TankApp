import { Badge } from "@/models/Badge"
import BaseRepository from "@/database/base-repository"

class BadgeRepository extends BaseRepository<Badge> {
    protected tableName = "badge"
    protected columns = [
        "id",
        "manufacturer",
        "model",
        "manufacture_year",
        "registration_date",
        "fuel_id",
        "car_nickname",
        "tachometer"
    ];

   
}

export const badgeRepository = new BadgeRepository()
