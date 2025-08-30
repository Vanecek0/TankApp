import BaseRepository from "@/database/abstract/baseRepository";
import { ServicingPart } from "@/models/ServicingPart";

export class ServicingPartRepository extends BaseRepository<ServicingPart> {
    protected tableName = ServicingPart.tableName;
    protected columns = ServicingPart.columns;
    protected modelClass = ServicingPart;
}

export const servicingPartRepository = new ServicingPartRepository()