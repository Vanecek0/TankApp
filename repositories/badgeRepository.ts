import { Badge, BadgeModel } from "@/models/Badge"
import BaseRepository from "@/database/base-repository"

class BadgeRepository extends BaseRepository<typeof BadgeModel, Badge> {
    constructor() {
        super(BadgeModel)
    }

}

export const badgeRepository = new BadgeRepository()
