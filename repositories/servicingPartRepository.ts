import DatabaseRepository from "@/database/abstract/databaseRepository";
import { ServicingPart } from "@/models/ServicingPart";

export class ServicingPartRepository extends DatabaseRepository<ServicingPart> {
    protected tableName = ServicingPart.tableName;
    protected columns = ServicingPart.columns;
    protected modelClass = ServicingPart;
}

export const servicingPartRepository = new ServicingPartRepository()