import BaseRepository from "@/database/abstract/baseRepository";
import { Autoservice } from "@/models/Autoservice";

export class AutoserviceRepository extends BaseRepository<Autoservice> {
    protected tableName = Autoservice.tableName;
    protected columns = Autoservice.columns;
    protected modelClass = Autoservice;
}

export const autoserviceRepository = new AutoserviceRepository()