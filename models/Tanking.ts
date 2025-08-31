export interface ITanking {
  id?: number;
  car_id: number;
  station_fuel_id: number;
  price_per_unit: number;
  price: number;
  amount: number;
  mileage: number;
  tachometer: number;
  tank_date: number;
  snapshot?: string;
  created_at: number;
  updated_at: number;
}

export class Tanking implements ITanking {
  id?: number;
  car_id!: number;
  station_fuel_id!: number;
  price_per_unit!: number;
  price!: number;
  amount!: number;
  mileage!: number;
  tachometer!: number;
  tank_date!: number;
  snapshot?: string;
  created_at!: number;
  updated_at!: number;

  static tableName = "tanking"
  
  static columns: (keyof Tanking)[] = [
    "id",
    "car_id",
    "station_fuel_id",
    "price_per_unit",
    "price",
    "amount",
    "mileage",
    "tachometer",
    "tank_date",
    "snapshot",
    "created_at",
    "updated_at"
  ]
}