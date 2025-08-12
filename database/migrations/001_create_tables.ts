import type * as SQLite from "expo-sqlite"

export async function createTables(db: SQLite.SQLiteDatabase) {
  try {

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "station" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "name"	TEXT,
        "address"	TEXT,
        "phone" TEXT,
        "opening_hrs" NUMERIC,
        "closing_hrs" NUMERIC,
        "last_visit"	NUMERIC,
        "provider"	TEXT,
        "note" TEXT,
        "created_at"	NUMERIC,
        "updated_at"	NUMERIC
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "fuel" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "name"	TEXT,
        "code"	TEXT,
        "trademark"	TEXT,
        "unit"	TEXT
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "station_fuel" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "id_station"	INTEGER NOT NULL,
        "id_fuel"	INTEGER NOT NULL,
        "last_price_per_unit" NUMERIC,
        FOREIGN KEY("id_fuel") REFERENCES "fuel"("id") ON DELETE SET NULL,
        FOREIGN KEY("id_station") REFERENCES "station"("id") ON DELETE CASCADE
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "autoservice" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "name"	TEXT,
        "address"	TEXT,
        "created_at"	NUMERIC,
        "updated_at"	NUMERIC
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "car" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "manufacturer"	TEXT,
        "model"	TEXT,
        "manufacture_year"	NUMERIC,
        "registration_date"	NUMERIC,
        "license_plate" TEXT,
        "vin" TEXT,
        "fuel_id"	INTEGER,
        "car_nickname"	TEXT,
        "odometer" INTEGER,
        "tank_capacity" NUMERIC,
        "created_at" NUMERIC,
        "updated_at" NUMERIC,
        FOREIGN KEY("fuel_id") REFERENCES "fuel"("id")
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "part" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "name"	TEXT,
        "manufacturer"	TEXT,
        "oem_code"	TEXT,
        "description"	TEXT,
        "price"	INTEGER,
        "count"	NUMERIC,
        "unit"	TEXT,
        "created_at"	NUMERIC,
        "updated_at"	NUMERIC
      );
  `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "tanking" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "car_id"	INTEGER,
        "station_fuel_id" INTEGER,
        "price_per_unit" NUMERIC,
        "price"	NUMERIC,
        "amount"	NUMERIC,
        "mileage"	NUMERIC,
        "tachometer" NUMERIC,
        "tank_date" NUMERIC,
        "snapshot" TEXT,
        "created_at"	NUMERIC,
        "updated_at"	NUMERIC,
        FOREIGN KEY("car_id") REFERENCES "car"("id") ON DELETE SET NULL,
        FOREIGN KEY("station_fuel_id") REFERENCES "station_fuel"("id") ON DELETE SET NULL
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "badge" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "name"	TEXT,
        "color"	TEXT
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "badge_tanking" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "id_badge"	INTEGER NOT NULL,
        "id_tanking"	INTEGER NOT NULL,
        FOREIGN KEY("id_badge") REFERENCES "badge"("id") ON DELETE CASCADE,
        FOREIGN KEY("id_tanking") REFERENCES "tanking"("id") ON DELETE SET NULL
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "servicing" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "car_id"	INTEGER,
        "name"	TEXT,
        "description"	TEXT,
        "autoservice_id"	INTEGER,
        "service_date"	NUMERIC,
        "created_at"	NUMERIC,
        "updated_at"	NUMERIC,
        FOREIGN KEY("autoservice_id") REFERENCES "autoservice"("id") ON DELETE CASCADE,
	      FOREIGN KEY("car_id") REFERENCES "car"("id") ON DELETE CASCADE
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "servicing_part" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "id_part" INTEGER,
        "id_servicing" INTEGER,
        FOREIGN KEY("id_part") REFERENCES "part"("id"),
	      FOREIGN KEY("id_servicing") REFERENCES "servicing"("id") ON DELETE CASCADE
      );
    `)

    await db.execAsync(`
      CREATE VIEW IF NOT EXISTS "monthly_tanking_stats" AS
      SELECT 
        strftime('%Y-%m', datetime(tank_date / 1000, 'unixepoch')) AS period,
        SUM(amount) AS total_amount,
        SUM(mileage) AS total_mileage,
        SUM(price) AS total_price,
        MAX(tachometer) AS last_tachometer,
        AVG(price_per_unit) AS avg_price_per_unit
      FROM tanking
      GROUP BY period;
    `);

  } catch (error) {
    console.error("Error creating tables:", error)
    throw error
  }
}