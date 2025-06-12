import type * as SQLite from "expo-sqlite"

export async function createTables(db: SQLite.SQLiteDatabase) {
  try {
    console.log("Creating tables...")

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "station" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "name"	TEXT,
        "address"	TEXT,
        "price_per_unit"	NUMERIC,
        "last_visit"	NUMERIC,
        "provider"	TEXT,
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
        "price_per_unit" NUMERIC,
        FOREIGN KEY("id_fuel") REFERENCES "fuel"("id") ON DELETE CASCADE,
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
        "profile_id"	INTEGER,
        "fuel_id"	INTEGER,
        "car_nickname"	TEXT,
        "tachometer" INTEGER,
        "created_at" NUMERIC,
        "updated_at" NUMERIC,
        FOREIGN KEY("profile_id") REFERENCES "profile"("id"),
        FOREIGN KEY("fuel_id") REFERENCES "fuel"("id")
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "profile" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "name"	TEXT,
        "avatar_url"	TEXT,
        "created_at"	NUMERIC,
        "updated_at"	NUMERIC
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
        "station_fuel_id" INTEGER,
        "price"	NUMERIC,
        "amount"	NUMERIC,
        "mileage"	NUMERIC,
        "tachometer" NUMERIC,
        "created_at"	NUMERIC,
        "updated_at"	NUMERIC,
        FOREIGN KEY("station_fuel_id") REFERENCES "station_fuel"("id")
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "servicing" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "profile_id"	INTEGER,
        "name"	TEXT,
        "description"	TEXT,
        "autoservice_id"	INTEGER,
        "service_date"	NUMERIC,
        "created_at"	NUMERIC,
        "updated_at"	NUMERIC,
        FOREIGN KEY("autoservice_id") REFERENCES "autoservice"("id"),
	      FOREIGN KEY("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE
      );
    `)

    console.log("Tables created successfully")
  } catch (error) {
    console.error("Error creating tables:", error)
    throw error
  }
}