import DatabaseRepository from "@/database/abstract/databaseRepository";
import { Autoservice } from "@/models/Autoservice";

export class AutoserviceRepository extends DatabaseRepository<Autoservice> {
    protected tableName = Autoservice.tableName;
    protected columns = Autoservice.columns;
    protected modelClass = Autoservice;
}

export const autoserviceRepository = new AutoserviceRepository()