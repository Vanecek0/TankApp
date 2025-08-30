import DatabaseRepository from "@/database/abstract/databaseRepository";
import { BadgeTanking } from "@/models/BadgeTanking";

export class BadgeTankingRepository extends DatabaseRepository<BadgeTanking> {
    protected tableName = BadgeTanking.tableName;
    protected columns = BadgeTanking.columns;
    protected modelClass = BadgeTanking;

    async getAllRelations(): Promise<BadgeTanking[]> {
        const db = await BadgeTankingRepository.getDb();
        const sql = `
      SELECT bt.*
      FROM badge_tanking bt
      INNER JOIN badge b ON bt.id_badge = b.id
      INNER JOIN tanking t ON bt.id_tanking = t.id
    `
        return db.getAllAsync<BadgeTanking>(sql)
    }

    async getById(id: number): Promise<BadgeTanking | null> {
        try {
            const result = await this.select({ id: id });
            if (!result || result.length === 0) {
                return null;
            }
            return result[0];
        } catch (err) {
            console.error(`Error fetching badge_tanking relation with id ${id}:`, err);
            return null;
        }
    }

    async getFirst(): Promise<BadgeTanking | null> {
        try {
            const result = await this.select({}, [], [], 1);
            if (!result || result.length === 0) {
                return null;
            }
            return result[0];
        } catch (err) {
            console.error("Error fetching first badge_tanking relation:", err);
            return null;
        }
    }

    async removeById(id: number): Promise<boolean> {
        try {
            const result = await this.delete({ id });
            if (!result) {
                console.warn(`Badge_tanking relation with id ${id} could not be deleted`);
                return false;
            }
            return true;
        } catch (err) {
            console.error(`Error deleting Badge_tanking relation with id ${id}:`, err);
            return false;
        }
    }

}

export const badgeTankingRepository = new BadgeTankingRepository()