import BaseModel from "@/database/abstract/baseModel";
import { SQLiteRunResult } from "expo-sqlite";

export type Station = {
    id?: number;
    name: string;
    address: string;
    phone: string;
    opening_hrs: number;
    closing_hrs: number;
    last_visit: number;
    provider: string;
    note: string;
    created_at: number;
    updated_at: number;
};

export const stationColumns: (keyof Omit<Station, "id">)[] = [
    "name",
    "address",
    "phone",
    "opening_hrs",
    "closing_hrs",
    "last_visit",
    "provider",
    "note",
    "created_at",
    "updated_at",
];

export class StationModel extends BaseModel {
    static tableName = "station"
    static columns = stationColumns

    static async create(station: Omit<Station, "id">) {
        return this.insert(station)
    }

    static modify(id: number, station: Partial<Omit<Station, "id">>) {
        return this.update({ ...station, updated_at: "CURRENT_TIMESTAMP" }, { id: id })
    }

    static all(): Promise<StationModel[]> {
        return this.select();
    }

    static findBy(where: Partial<Record<string, any>>) {
        return this.select(where);
    }

    static findById(id: number): Promise<StationModel | null> {
        return this.select({ id: id });
    }

    static remove(id: number): Promise<SQLiteRunResult> {
        return this.delete({ id: id });
    }

    static count(): Promise<number> {
        return this.count();
    }
}