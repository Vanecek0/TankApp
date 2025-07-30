import type { SQLiteDatabase } from 'expo-sqlite';
import { Station } from "./Station";
import { Fuel } from "./Fuel";
import { StationFuel, StationFuelModel } from "./StationFuel";
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
  snapshot?: string;
  created_at: number;
  updated_at: number;
};

export class TankingModel {

  static async create(db: SQLiteDatabase, tanking: Tanking) {
    try {
      const result = await db.getAllAsync(
        'INSERT INTO tanking (car_id, station_fuel_id, price_per_unit, price, amount, mileage, tachometer, tank_date, snapshot, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [tanking.car_id, tanking.station_fuel_id, tanking.price_per_unit, tanking.price, tanking.amount, tanking.mileage, tanking.tachometer, tanking.tank_date, tanking.snapshot!, tanking.created_at, tanking.updated_at]
      );

      return result;
    }
    catch (error) {
      console.error('Chyba při vkládání tanking:', error);
      throw new Error('Nepodařilo se vytvořit nový záznam.');
    }
  }

  static async all(db: SQLiteDatabase): Promise<Tanking[]> {
    const rows = await db.getAllAsync<Tanking>('SELECT * FROM tanking');
    return rows;
  }

  static async allFromSnapshot(db: SQLiteDatabase): Promise<Tanking[]> {
    const rows = await db.getAllAsync<{ snapshot: string }>('SELECT snapshot FROM tanking WHERE snapshot IS NOT NULL');

    return rows
      .map(row => {
        try {
          return JSON.parse(row.snapshot) as Tanking;
        } catch (e) {
          console.warn('Chyba při parsování snapshotu:', e);
          return null;
        }
      })
      .filter((item): item is Tanking => item !== null);
  }

  static async count(db: SQLiteDatabase): Promise<any> {
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

  static async getTotalPriceAndMileage(db: SQLiteDatabase): Promise<{ total_price: number; total_mileage: number }> {

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

  static async getPriceMileageSumByDate(db: SQLiteDatabase, fromDate?: Date, toDate?: Date, limit?: number): Promise<{ month: string; total_price: number; total_mileage: number }[]> {

    const from = fromDate?.getTime() ?? 0;
    const to = toDate?.getTime() ?? Date.now();

    try {
      const rows = await db.getAllAsync<{
        tank_date: number;
        snapshot: string;
      }>(`
      SELECT tank_date, snapshot
      FROM tanking
      WHERE car_id = 1
      AND tank_date >= ?
      AND tank_date < ?
      ORDER BY tank_date DESC
    `, [from, to]);

      const monthlyMap = new Map<string, { total_price: number; total_mileage: number }>();

      for (const row of rows) {
        if (!row.snapshot) continue;

        let snapshot: any;
        try {
          snapshot = JSON.parse(row.snapshot);
        } catch (e) {
          console.warn('Invalid snapshot JSON:', row.snapshot);
          continue;
        }

        const month = new Date(row.tank_date).toISOString().slice(0, 7); // 'YYYY-MM'

        if (!monthlyMap.has(month)) {
          monthlyMap.set(month, { total_price: 0, total_mileage: 0 });
        }

        const monthData = monthlyMap.get(month)!;
        monthData.total_price += snapshot.price ?? 0;
        monthData.total_mileage += snapshot.mileage ?? 0;
      }


      const result = Array.from(monthlyMap.entries())
        .sort((a, b) => b[0].localeCompare(a[0])) // Descending by month
        .slice(0, limit)
        .map(([month, data]) => ({
          month,
          total_price: data.total_price,
          total_mileage: data.total_mileage
        }));

      return result;
    } catch (error) {
      console.error("Failed to get snapshot-based price/mileage sums:", error);
      throw error;
    }
  }

  static async getGroupedTankingsByMonth(db: SQLiteDatabase, order: string = 'DESC'): Promise<{
    month: string,
    tankings: (Tanking & {
      station?: Station,
      fuel?: Fuel,
      station_fuel?: StationFuel,
      badges?: Badge[]
    })[]
  }[]> {

    console.log(db);
    const rows = await db.getAllAsync<{
      id: number;
      snapshot: string;
      tank_date: number;
      tank_month: string;
    }>(`
    SELECT 
      id, snapshot, tank_date,
      strftime('%Y-%m', datetime(tank_date / 1000, 'unixepoch')) AS tank_month
    FROM tanking
    WHERE car_id = 1
    ORDER BY tank_date ${order}
  `);

    const tankingIds = rows.map(r => r.id);
    let badgesData: { [key: number]: Badge[] } = {};
    if (tankingIds.length > 0) {
      badgesData = await BadgeModel.getBadgesByTanking(db, tankingIds);
    }

    const grouped = new Map<string, (Tanking & {
      station: Station,
      fuel: Fuel,
      station_fuel: StationFuel,
      badges: Badge[]
    })[]>();

    for (const row of rows) {
      if (!row.snapshot) continue;

      let parsed: any;
      try {
        parsed = JSON.parse(row.snapshot);
      } catch {
        continue;
      }

      if (!parsed.station || !parsed.fuels || !Array.isArray(parsed.fuels)) continue;

      const selectedFuel = parsed.fuels.find((f: Fuel) => f.id === parsed.station_fuel_id);

      const tanking: Tanking & {
        station: Station;
        fuel: Fuel;
        station_fuel: StationFuel;
        badges: Badge[];
      } = {
        id: parsed.id,
        car_id: parsed.car_id,
        station_fuel_id: parsed.station_fuel_id,
        price_per_unit: parsed.price_per_unit,
        price: parsed.price,
        amount: parsed.amount,
        mileage: parsed.mileage,
        tachometer: parsed.tachometer,
        tank_date: parsed.tank_date,
        created_at: parsed.created_at,
        updated_at: parsed.updated_at,
        snapshot: row.snapshot,
        station: parsed.station,
        fuel: selectedFuel,
        station_fuel: {
          id: parsed.station_fuel_id,
          id_station: parsed.station?.id,
          id_fuel: selectedFuel?.id,
          last_price_per_unit: parsed.price_per_unit,
        },
        badges: badgesData[row.id] || []
      };

      const month = row.tank_month;
      if (!grouped.has(month)) grouped.set(month, []);
      grouped.get(month)!.push(tanking);
    }

    return Array.from(grouped.entries()).map(([month, tankings]) => ({
      month,
      tankings
    }));
  }

  static async getAllTankingsWithStationFuel(db: SQLiteDatabase, limit?: number): Promise<(Tanking & { station: Station, fuel: Fuel, station_fuel: StationFuel })[]> {
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
      snapshot: row.snapshot,
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

  static async getAllTankingsWithStation(db: SQLiteDatabase, limit?: number): Promise<(Tanking & { station: Station })[]> {
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
      snapshot: row.snapshot,
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


  static async updateSnapshot(db: SQLiteDatabase, id: number) {
    const tanking = await this.findById(db, id);
    if (!tanking) {
      throw new Error(`Tanking záznam s ID ${id} nebyl nalezen.`);
    }

    const stationFuel = await StationFuelModel.getStationWithFuelsById(tanking.station_fuel_id);

    if (!stationFuel) {
      throw new Error(`StationFuel s ID ${tanking.station_fuel_id} nebyl nalezen.`);
    }

    const { snapshot, ...tankingWithoutSnapshot } = tanking;

    const snapshotObject = {
      ...tankingWithoutSnapshot,
      station: stationFuel.station,
      fuels: stationFuel.fuels
    };

    const snapshotJson = JSON.stringify(snapshotObject);

    await db.runAsync('UPDATE tanking SET snapshot = ? WHERE id = ?', [snapshotJson, id]);
  }


  static async findById(db: SQLiteDatabase, id: number): Promise<Tanking | null> {
    const row = await db.getFirstAsync<Tanking>('SELECT * FROM tanking WHERE id = ?', [id]);
    return row;
  }

  static async delete(db: SQLiteDatabase, id: number) {
    await db.runAsync('DELETE FROM tanking WHERE id = ?', [id]);
  }
}