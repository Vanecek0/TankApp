import { Database } from "@/database/database";
import { Station } from "./Station";
import { Fuel } from "./Fuel";
import { StationFuel } from "./StationFuel";
import { Badge, BadgeModel } from "./Badge";

export type Tanking = {
  id?: number;
  car_id: number;
  station_fuel_id: number;
  price_per_unit: number;
  price: number;
  amount: number;
  mileage: number;
  tachometer: number;
  tank_date: number;
  created_at: number;
  updated_at: number;
};

export class TankingModel {

  static async create(tanking: Tanking) {
    try {
      const result = await Database.executeSql(
        'INSERT INTO tanking (car_id, station_fuel_id, price_per_unit, price, amount, mileage, tachometer, tank_date, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [tanking.car_id, tanking.station_fuel_id, tanking.price_per_unit, tanking.price, tanking.amount, tanking.mileage, tanking.tachometer, tanking.tank_date, tanking.created_at, tanking.updated_at]
      );

      return result;
    }
    catch (error) {
      console.error('Chyba při vkládání tanking:', error);
      throw new Error('Nepodařilo se vytvořit nový záznam.');
    }
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

  static async getTotalPriceAndMileage(): Promise<{ total_price: number; total_mileage: number }> {
    const db = await Database.getConnection();

    const query = `
    SELECT 
      SUM(price) AS total_price,
      SUM(mileage) AS total_mileage
    FROM tanking
    WHERE car_id = 1
  `;

    try {
      const result = await db.getFirstAsync<{
        total_price: number;
        total_mileage: number;
      }>(query);

      return {
        total_price: result?.total_price ?? 0,
        total_mileage: result?.total_mileage ?? 0,
      };
    } catch (error) {
      console.error("Failed to get total price and mileage:", error);
      throw error;
    }
  }

  static async getPriceMileageSumByDate(fromDate?: Date, toDate?: Date, limit?: number): Promise<{ month: string; total_price: number; total_mileage: number }[]> {
    const db = await Database.getConnection()

    const from = fromDate?.getTime() ?? 0;
    const to = toDate?.getTime() ?? Date.now();

    try {
      const result = await db.getAllAsync<{
        month: string
        total_price: number
        total_mileage: number
      }>(`
        SELECT 
          strftime('%Y-%m', tank_date / 1000, 'unixepoch') AS month,
          SUM(price) AS total_price,
          SUM(mileage) AS total_mileage
        FROM tanking
        WHERE car_id = 1
        AND tank_date >= ?
        AND tank_date < ?
        GROUP BY month
        ORDER BY month DESC
        ${limit ? `LIMIT ?` : ''}
          `, [from, to, limit!]);

      return result
    } catch (error) {
      console.error("Failed to get monthly price/mileage sums:", error)
      throw error
    }
  }

  static async getGroupedTankingsWithBadgesByMonth(): Promise<{
    month: string,
    tankings: (Tanking & {
      station: Station,
      fuel: Fuel,
      station_fuel: StationFuel,
      badges: Badge[]
    })[]
  }[]> {
    const db = await Database.getConnection();

    const rows = await db.getAllAsync(
      `SELECT 
        t.*,
        strftime('%Y-%m', datetime(t.tank_date / 1000, 'unixepoch')) AS tank_month,
        s.id AS station_id,
        s.name AS station_name,
        s.address AS station_address,
        s.last_visit AS station_last_visit,
        s.provider AS station_provider,
        s.created_at AS station_created_at,
        s.updated_at AS station_updated_at,
        f.id AS fuel_id,
        f.name AS fuel_name,
        f.code AS fuel_code,
        f.trademark AS fuel_trademark,
        f.unit AS fuel_unit,
        sf.id_station,
        sf.id_fuel,
        sf.last_price_per_unit AS last_price_per_unit
      FROM tanking t
      INNER JOIN station_fuel sf ON t.station_fuel_id = sf.id
      INNER JOIN station s ON sf.id_station = s.id
      INNER JOIN fuel f ON sf.id_fuel = f.id
      WHERE t.car_id = 1
      ORDER BY t.tank_date DESC
      `
    );
    const tankingIds = rows.map((row: any) => row.id);

    let badgesData: { [key: number]: Badge[] } = {};
    if (tankingIds.length > 0) {
      badgesData = await BadgeModel.getBadgesByTanking(tankingIds);
    }

    const grouped = new Map<string, any[]>();

    rows.map((row: any) => {
      const month = row.tank_month;
      if (!grouped.has(month)) {
        grouped.set(month, []);
      }

      grouped.get(month)!.push({
        id: row.id,
        car_id: row.car_id,
        station_fuel_id: row.station_fuel_id,
        price_per_unit: row.price_per_unit,
        price: row.price,
        amount: row.amount,
        mileage: row.mileage,
        tachometer: row.tachometer,
        tank_date: row.tank_date,
        created_at: row.created_at,
        updated_at: row.updated_at,
        station: {
          id: row.station_id,
          name: row.station_name,
          address: row.station_address,
          last_visit: row.station_last_visit,
          provider: row.station_provider,
          created_at: row.station_created_at,
          updated_at: row.station_updated_at
        },
        fuel: {
          id: row.fuel_id,
          name: row.fuel_name,
          code: row.fuel_code,
          trademark: row.fuel_trademark,
          unit: row.fuel_unit
        },
        station_fuel: {
          id: row.station_fuel_id,
          id_station: row.id_station,
          id_fuel: row.id_fuel,
          last_price_per_unit: row.last_price_per_unit
        },
        badges: badgesData[row.id] || []
      });
    })

    return Array.from(grouped.entries()).map(([month, tankings]) => ({
      month,
      tankings
    }));
  }

  static async getGroupedTankingsByMonth(order?: string): Promise<{
    month: string,
    tankings: (Tanking & { station: Station, fuel: Fuel, station_fuel: StationFuel })[]
  }[]> {
    const db = await Database.getConnection();
    const rows = await db.getAllAsync(
      `SELECT 
        t.*,
        strftime('%Y-%m', datetime(t.tank_date / 1000, 'unixepoch')) AS tank_month,
        s.id AS station_id,
        s.name AS station_name,
        s.address AS station_address,
        s.last_visit AS station_last_visit,
        s.provider AS station_provider,
        s.created_at AS station_created_at,
        s.updated_at AS station_updated_at,
        f.id AS fuel_id,
        f.name AS fuel_name,
        f.code AS fuel_code,
        f.trademark AS fuel_trademark,
        f.unit AS fuel_unit,
        sf.id_station,
        sf.id_fuel,
        sf.last_price_per_unit AS last_price_per_unit
      FROM tanking t
      LEFT JOIN station_fuel sf ON t.station_fuel_id = sf.id
      LEFT JOIN station s ON sf.id_station = s.id
      LEFT JOIN fuel f ON sf.id_fuel = f.id
      WHERE t.car_id = 1
      ORDER BY t.tank_date 
      ${order != null ? order : ''}`,
      [order!],
    );

    const grouped = new Map<string, any[]>();

    rows.map((row: any) => {
      const month = row.tank_month;
      if (!grouped.has(month)) {
        grouped.set(month, []);
      }

      grouped.get(month)!.push({
        id: row.id,
        car_id: row.car_id,
        station_fuel_id: row.station_fuel_id,
        price_per_unit: row.price_per_unit,
        price: row.price,
        amount: row.amount,
        mileage: row.mileage,
        tachometer: row.tachometer,
        tank_date: row.tank_date,
        created_at: row.created_at,
        updated_at: row.updated_at,
        station: row.station_id != null ? {
          id: row.station_id,
          name: row.station_name,
          address: row.station_address,
          last_visit: row.station_last_visit,
          provider: row.station_provider,
          created_at: row.station_created_at,
          updated_at: row.station_updated_at
        } : null,

        fuel: row.fuel_id != null ? {
          id: row.fuel_id,
          name: row.fuel_name,
          code: row.fuel_code,
          trademark: row.fuel_trademark,
          unit: row.fuel_unit
        } : null,

        station_fuel: row.station_fuel_id != null ? {
          id: row.station_fuel_id,
          id_station: row.id_station,
          id_fuel: row.id_fuel,
          last_price_per_unit: row.last_price_per_unit
        } : null
      });
    })

    return Array.from(grouped.entries()).map(([month, tankings]) => ({
      month,
      tankings
    }));
  }

  static async getAllTankingsWithStationFuel(limit?: number): Promise<(Tanking & { station: Station, fuel: Fuel, station_fuel: StationFuel })[]> {
    const db = await Database.getConnection();
    const rows = await db.getAllAsync(
      `SELECT
    t.*,
      s.id AS station_id,
        s.name AS station_name,
          s.address AS station_address,
          s.phone AS station_phone.
          s.opening_hrs as station_opening_hrs,
          s.closing_hrs as station_closing_hrs,
            s.last_visit AS station_last_visit,
              s.provider AS station_provider,
              s.note AS station_note,
                s.created_at AS station_created_at,
                  s.updated_at AS station_updated_at,
                    f.id AS fuel_id,
                      f.name AS fuel_name,
                        f.code AS fuel_code,
                          f.trademark AS fuel_trademark,
                            f.unit AS fuel_unit,
                              sf.last_price_per_unit AS last_price_per_unit
    FROM tanking t
    INNER JOIN station_fuel sf ON t.station_fuel_id = sf.id
    INNER JOIN station s ON sf.id_station = s.id
    INNER JOIN fuel f ON sf.id_fuel = f.id
    WHERE car_id = 1
    ORDER BY t.tank_date DESC
    ${limit != null ? 'LIMIT ?' : ''} `,
      [limit!],
    )

    return rows.map((row: any) => ({
      id: row.id,
      car_id: row.car_id,
      station_fuel_id: row.station_fuel_id,
      price_per_unit: row.price_per_unit,
      price: row.price,
      amount: row.amount,
      mileage: row.mileage,
      tachometer: row.tachometer,
      tank_date: row.tank_date,
      created_at: row.created_at,
      updated_at: row.updated_at,
      station: {
        id: row.station_id,
        name: row.station_name,
        address: row.station_address,
        phone: row.station_phone,
        opening_hrs: row.opening_hrs,
        closing_hrs: row.closing_hrs,
        last_visit: row.station_last_visit,
        provider: row.station_provider,
        note: row.station_note,
        created_at: row.station_created_at,
        updated_at: row.station_updated_at
      },
      fuel: {
        id: row.fuel_id,
        name: row.fuel_name,
        code: row.fuel_code,
        trademark: row.fuel_trademark,
        unit: row.fuel_unit
      },
      station_fuel: {
        id: row.station_fuel_id,
        id_station: row.id_station,
        id_fuel: row.id_fuel,
        last_price_per_unit: row.last_price_per_unit
      }
    }));
  }

  static async getAllTankingsWithStation(limit?: number): Promise<(Tanking & { station: Station })[]> {
    const db = await Database.getConnection();
    const rows = await db.getAllAsync(
      `SELECT
    t.*,
      s.id AS station_id,
        s.name AS station_name,
          s.address AS station_address,
          s.phone AS station_phone.
          s.opening_hrs as station_opening_hrs,
          s.closing_hrs as station_closing_hrs,
            s.last_visit AS station_last_visit,
              s.provider AS station_provider,
              s.note AS station_note,
                s.created_at AS station_created_at,
                  s.updated_at AS station_updated_at
       FROM tanking t
       INNER JOIN station s ON t.station_id = s.id
       ORDER BY t.tank_date DESC 
    ${limit != null ? 'LIMIT ?' : ''} `,
      [limit!],
    )

    return rows.map((row: any) => ({
      id: row.id,
      car_id: row.car_id,
      station_fuel_id: row.station_fuel_id,
      price_per_unit: row.price_per_unit,
      price: row.price,
      amount: row.amount,
      mileage: row.mileage,
      tachometer: row.tachometer,
      tank_date: row.tank_date,
      created_at: row.created_at,
      updated_at: row.updated_at,
      station: {
        id: row.station_id,
        name: row.station_name,
        address: row.station_address,
        phone: row.station_phone,
        opening_hrs: row.opening_hrs,
        closing_hrs: row.closing_hrs,
        fuel_id: row.station_fuel_id,
        price_per_unit: row.station_price_per_unit,
        last_visit: row.station_last_visit,
        provider: row.station_provider,
        note: row.station_note,
        created_at: row.station_created_at,
        updated_at: row.station_updated_at
      },
    }))
  }

  static async findById(id: number): Promise<Tanking | null> {
    const db = await Database.getConnection();
    const row = await db.getFirstAsync<Tanking>('SELECT * FROM tanking WHERE id = ?', [id]);
    return row;
  }

  static async delete(id: number) {
    await Database.executeSql('DELETE FROM tanking WHERE id = ?', [id]);
  }
}