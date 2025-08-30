import DatabaseRepository from "@/database/abstract/databaseRepository";
import { Part } from "@/models/Part";

export class PartRepository extends DatabaseRepository<Part> {
    protected tableName = Part.tableName;
    protected columns = Part.columns;
    protected modelClass = Part;
}

export const partRepository = new PartRepository()