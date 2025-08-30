export interface ICar {
  id?: number
  manufacturer: string
  model: string
  manufacture_year: number
  registration_date: number
  license_plate: string
  vin: string
  fuel_id: number
  car_nickname: string
  tank_capacity: number
  odometer: number
}

export class Car implements ICar {
  id?: number
  manufacturer!: string
  model!: string
  manufacture_year!: number
  registration_date!: number
  license_plate!: string
  vin!: string
  fuel_id!: number
  car_nickname!: string
  tank_capacity!: number
  odometer!: number

  static tableName = "car"
  
  static columns: (keyof Car)[] = [
    "id",
    "manufacturer",
    "model",
    "manufacture_year",
    "registration_date",
    "license_plate",
    "vin",
    "fuel_id",
    "car_nickname",
    "tank_capacity",
    "odometer"
  ]
}