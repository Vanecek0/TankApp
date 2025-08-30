export interface ITankingStatistics {
    id?: number;
    period: string;
    total_amount: number;
    total_mileage: number;
    total_price: number;
    last_tachometer: number;
    avg_price_per_unit: number;
}

export class TankingStatistics implements ITankingStatistics {
    id?: number;
    period!: string;
    total_amount!: number;
    total_mileage!: number;
    total_price!: number;
    last_tachometer!: number;
    avg_price_per_unit!: number;

    static tableName = "monthly_tanking_stats";

    static columns: (keyof TankingStatistics)[] = [
        "id",
        "period",
        "total_amount",
        "total_mileage",
        "total_price",
        "last_tachometer",
        "avg_price_per_unit"
    ];
}