export interface IStationFuel {
    id?: number;
    id_station: number;
    id_fuel: number;
    last_price_per_unit: number;
}

export class StationFuel implements IStationFuel {
    id?: number;
    id_station!: number;
    id_fuel!: number;
    last_price_per_unit!: number;

    static tableName = "station_fuel";

    static columns: (keyof StationFuel)[] = [
        "id",
        "id_station",
        "id_fuel",
        "last_price_per_unit"
    ];
}