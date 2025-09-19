export interface ITankingStatistics {
    period: string;
    total_amount: number;
    total_mileage: number;
    total_price: number;
    last_tachometer: number;
    avg_price_per_unit: number;
    avg_consumption: number;
}

export class TankingStatistics implements ITankingStatistics {
    period!: string;
    total_amount!: number;
    total_mileage!: number;
    total_price!: number;
    last_tachometer!: number;
    avg_price_per_unit!: number;
    avg_consumption!: number;

    static tableName = "monthly_tanking_stats";

    static columns: (keyof TankingStatistics)[] = [
        "period",
        "total_amount",
        "total_mileage",
        "total_price",
        "last_tachometer",
        "avg_price_per_unit",
        "avg_consumption"
    ];
}