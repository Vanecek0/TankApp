export class Tanking {
  id?: number;
  car_id!: number;
  station_fuel_id!: number;
  price_per_unit?: number;
  price?: number;
  amount?: number;
  mileage?: number;
  tachometer?: number;
  tank_date: number = Date.now();
  full_tank: boolean = false;
  note!: string;
  created_at: number = Date.now();
  updated_at: number = Date.now();

  static tableName = "tanking";

  static columns = Object.keys(new Tanking());
}