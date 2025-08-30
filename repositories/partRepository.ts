import BaseRepository from "@/database/abstract/baseRepository";
import { Part } from "@/models/Part";

export class PartRepository extends BaseRepository<Part> {
    protected tableName = Part.tableName;
    protected columns = Part.columns;
    protected modelClass = Part;
}

export const partRepository = new PartRepository()