import type { SQLiteDatabase } from 'expo-sqlite';
import { Badge, BadgeModel } from './Badge';
import { StationFuelModel } from './StationFuel';
import { Station } from './Station';
import { Fuel } from './Fuel';
import { badgeTankingRepository } from '@/repositories/badgeTankingRepository';
import { stationFuelRepository } from '@/repositories/stationFuelRepository';
import BaseModel from '@/database/base-model';

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

export const tankingColumns: (keyof Tanking)[] = [
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
  "updated_at",
]

type Snapshot = Tanking & {
  station?: Station;
  fuels?: Fuel[];
};

export class TankingModel extends BaseModel {
  static tableName = "tanking"
  static columns = tankingColumns

  static async create(db: SQLiteDatabase, t: Tanking) {
    return db.runAsync(
      `INSERT INTO tanking (car_id, station_fuel_id, price_per_unit, price, amount, mileage, tachometer, tank_date, snapshot, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [t.car_id, t.station_fuel_id, t.price_per_unit, t.price, t.amount, t.mileage, t.tachometer, t.tank_date, t.snapshot ?? '', t.created_at, t.updated_at]
    );
  }

  static async all(): Promise<Tanking[]> {
    return this.query<Tanking>('SELECT * FROM tanking');
  }

  static async allFromSnapshot(db: SQLiteDatabase): Promise<Tanking[]> {
    const rows = await db.getAllAsync<{ snapshot: string }>('SELECT snapshot FROM tanking WHERE snapshot IS NOT NULL');
    return rows.map(r => {
      try {
        return JSON.parse(r.snapshot) as Tanking;
      } catch {
        return null;
      }
    }).filter((x): x is Tanking => !!x);
  }


  static async getTotalPriceAndMileage(db: SQLiteDatabase): Promise<{ total_price: number; total_mileage: number }> {
    const result = await db.getFirstAsync<{ total_price: number; total_mileage: number }>(
      `SELECT SUM(price) AS total_price, SUM(mileage) AS total_mileage FROM tanking WHERE car_id = 1`
    );
    return {
      total_price: result?.total_price ?? 0,
      total_mileage: result?.total_mileage ?? 0,
    };
  }

  static async getPriceMileageSumByDate(
    db: SQLiteDatabase,
    fromDate?: Date,
    toDate?: Date,
    limit?: number
  ): Promise<{ month: string; total_price: number; total_mileage: number }[]> {
    const from = fromDate?.getTime() ?? 0;
    const to = toDate?.getTime() ?? Date.now();

    const rows = await db.getAllAsync<{ tank_date: number; snapshot: string }>(
      `SELECT tank_date, snapshot FROM tanking WHERE car_id = 1 AND tank_date BETWEEN ? AND ? ORDER BY tank_date DESC`,
      [from, to]
    );

    const monthly = new Map<string, { total_price: number; total_mileage: number }>();

    for (const { tank_date, snapshot } of rows) {
      if (!snapshot) continue;

      const snap = safeParseSnapshot(snapshot);
      if (!snap) continue;

      const month = new Date(tank_date).toISOString().slice(0, 7);
      if (!monthly.has(month)) monthly.set(month, { total_price: 0, total_mileage: 0 });

      const data = monthly.get(month)!;
      data.total_price += snap.price ?? 0;
      data.total_mileage += snap.mileage ?? 0;
    }

    return Array.from(monthly.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .slice(0, limit)
      .map(([month, data]) => ({ month, ...data }));
  }

  static async getGroupedTankingsByMonth(order: string = 'DESC', carId: number) {
    const db = await this.getDb();
    const rows = await db.getAllAsync<{ id: number; snapshot: string; tank_date: number }>(
      `SELECT id, snapshot, tank_date FROM tanking WHERE car_id = ${carId} ORDER BY tank_date ${order}`
    );

    const badgesMap = await badgeTankingRepository.getBadgesByTanking(rows.map(r => r.id));
    const grouped = new Map<string, (Snapshot & { badges: Badge[] })[]>();

    for (const row of rows) {
      const snap = safeParseSnapshot(row.snapshot);
      if (!snap) continue;

      const month = new Date(row.tank_date).toISOString().slice(0, 7);
      grouped.set(month, [...(grouped.get(month) || []), { ...snap, badges: badgesMap[row.id] || [] }]);
    }

    return Array.from(grouped.entries()).map(([month, tankings]) => ({ month, tankings }));
  }

  static async updateSnapshot(db: SQLiteDatabase, id: number) {
    const tanking = await this.findById(db, id);
    if (!tanking) throw new Error(`Tanking ${id} not found`);

    const stationFuel = await stationFuelRepository.getStationWithFuelsById(tanking.station_fuel_id);
    if (!stationFuel) throw new Error(`StationFuel ${tanking.station_fuel_id} not found`);

    const snapshotJson = JSON.stringify({
      ...tanking,
      station: stationFuel.station,
      fuels: stationFuel.fuels,
    });

    await db.runAsync('UPDATE tanking SET snapshot = ? WHERE id = ?', [snapshotJson, id]);
  }

  static async findById(db: SQLiteDatabase, id: number): Promise<Tanking | null> {
    return db.getFirstAsync<Tanking>('SELECT * FROM tanking WHERE id = ?', [id]);
  }

  static async delete(db: SQLiteDatabase, id: number) {
    return db.runAsync('DELETE FROM tanking WHERE id = ?', [id]);
  }
}

function safeParseSnapshot(snapshot: string): Snapshot | null {
  try {
    return JSON.parse(snapshot);
  } catch {
    console.warn('Invalid snapshot JSON:', snapshot);
    return null;
  }
}