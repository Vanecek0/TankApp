import DatabaseRepository from "@/database/abstract/databaseRepository";
import { Servicing } from "@/models/Servicing";

export class ServicingRepository extends DatabaseRepository<Servicing> {
    protected tableName = Servicing.tableName;
    protected columns = Servicing.columns;
    protected modelClass = Servicing;
}

export const servicingRepository = new ServicingRepository()