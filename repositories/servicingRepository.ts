import BaseRepository from "@/database/abstract/baseRepository";
import { Servicing } from "@/models/Servicing";

export class ServicingRepository extends BaseRepository<Servicing> {
    protected tableName = Servicing.tableName;
    protected columns = Servicing.columns;
    protected modelClass = Servicing;
}

export const servicingRepository = new ServicingRepository()