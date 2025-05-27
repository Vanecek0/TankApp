import { Database } from "@/database/database";
import { Station } from "./Station";



export type Tanking = {
  id?: number;
  tachometer: number;
  fuel_type: string;
  price: number;
  price_per_unit: number;
  amount: number;
  mileage: number;
  created_at: number;
};

export class TankingModel {


  static async create(tanking: Tanking) {
    const result = await Database.executeSql(
      'INSERT INTO tanking (tachometer, fuel_type, price, price_per_unit, amount, mileage, created_at) VALUES (?)',
      [tanking.tachometer, tanking.fuel_type, tanking.price, tanking.price_per_unit, tanking.amount, tanking.mileage, tanking.created_at]
    );
    return result;
  }

  static async all(): Promise<Tanking[]> {
    const db = await Database.getConnection();
    const rows = await db.getAllAsync<Tanking>('SELECT * FROM tanking');
    return rows;
  }

  static async count(): Promise<any> {
    const db = await Database.getConnection();
    const promiseThen = new Promise((resolve, reject) => {
      const count = db.getAllAsync('SELECT COUNT(*) FROM tanking')
      resolve(count);
    });

    return promiseThen
      .then((val: any) => {
        return val[0]["COUNT(*)"];
      })
      .catch((err) => console.log(err));
  }

  static async getNextTankingsWithStation(actualIndex: number, count: number): Promise<(Tanking & { station: Station })[]> {
    const db = await Database.getConnection();

    try {
      const rows = await db.getAllAsync(
        `SELECT 
         t.*,
         s.id AS station_id,
         s.name AS station_name,
         s.address AS station_address,
         s.price_per_unit AS station_price_per_unit,
         s.last_visit AS station_last_visit,
         s.provider AS station_provider
       FROM tanking t
       LEFT JOIN station s ON t.station_id = s.id
       ORDER BY t.created_at DESC LIMIT ? OFFSET ?`,
        [count, actualIndex],
      )

      return rows.map((row: any) => ({
        id: row.id,
        tachometer: row.tachometer,
        fuel_type: row.fuel_type,
        price: row.price,
        price_per_unit: row.price_per_unit,
        amount: row.amount,
        mileage: row.mileage,
        created_at: row.created_at,
        station_id: row.station_id,
        station: {
          id: row.station_id,
          name: row.station_name,
          address: row.station_address,
          price_per_unit: row.station_price_per_unit,
          last_visit: row.station_last_visit,
          provider: row.station_provider,
        },
      }))
    } catch (error) {
      console.error(error)
      throw error
    }

  }

  static async getAllTankingsWithStation(limit?: number): Promise<(Tanking & { station: Station })[]> {
    const db = await Database.getConnection();
    const rows = await db.getAllAsync(
      `SELECT 
         t.*,
         s.id AS station_id,
         s.name AS station_name,
         s.address AS station_address,
         s.price_per_unit AS station_price_per_unit,
         s.last_visit AS station_last_visit,
         s.provider AS station_provider
       FROM tanking t
       LEFT JOIN station s ON t.station_id = s.id
       ORDER BY t.created_at DESC 
    ${limit != null ? 'LIMIT ?' : ''}`,
      [limit!],
    )

    return rows.map((row: any) => ({
      id: row.id,
      tachometer: row.tachometer,
      fuel_type: row.fuel_type,
      price: row.price,
      price_per_unit: row.price_per_unit,
      amount: row.amount,
      mileage: row.mileage,
      created_at: row.created_at,
      station_id: row.station_id,
      station: {
        id: row.station_id,
        name: row.station_name,
        address: row.station_address,
        price_per_unit: row.station_price_per_unit,
        last_visit: row.station_last_visit,
        provider: row.station_provider,
      },
    }))
  }

  static async findById(id: number): Promise<Tanking | null> {
    const db = await Database.getConnection();
    const row = await db.getFirstAsync<Tanking>('SELECT * FROM tanking WHERE id = ?', [id]);
    return row ?? null;
  }

  static async delete(id: number) {
    await Database.executeSql('DELETE FROM tanking WHERE id = ?', [id]);
  }
}