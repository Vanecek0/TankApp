import { BadgeModel } from "@/models/Badge";

class BadgeRepository {
    protected model = BadgeModel;
}

export const badgeRepository = new BadgeRepository()
