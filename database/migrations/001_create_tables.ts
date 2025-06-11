import type * as SQLite from "expo-sqlite"

export async function createTables(db: SQLite.SQLiteDatabase) {
  try {
    console.log("Creating tables...")

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "station" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "name"	TEXT,
        "address"	TEXT,
        "fuel_id"	INTEGER,
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
        "unit"	TEXT,
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "service" (
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
        "fuel_id"	INTEGER,
        FOREIGN KEY("fuel_id") REFERENCES "fuel"("id")
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "profile" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "car_id"	INTEGER,
        "car_nickname"	TEXT,
        "tachometer" INTEGER
        FOREIGN KEY("car_id") REFERENCES "car"("id")
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "part" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "profile_id"	INTEGER,
        "name"	TEXT,
        "manufacturer"	TEXT,
        "oem_code"	TEXT,
        "description"	TEXT,
        "price"	INTEGER,
        "unit"	TEXT,
        "created_at"	NUMERIC,
        "updated_at"	NUMERIC,
        FOREIGN KEY("profile_id") REFERENCES "profile"("id")
      );
  `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "tanking" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "profile_id"	INTEGER,
        "station_id"	INTEGER,
        "price"	NUMERIC,
        "amount"	NUMERIC,
        "mileage"	NUMERIC,
        "created_at"	NUMERIC,
        FOREIGN KEY("profile_id") REFERENCES "profile"("id"),
        FOREIGN KEY("station_id") REFERENCES "station"("id")
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "service_history" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "profile_id"	INTEGER,
        "name"	TEXT,
        "description"	TEXT,
        "service_id"	INTEGER,
        "parts_ids"	TEXT,
        "service_date"	NUMERIC,
        "created_at" NUMERIC,
        "updated_at" NUMERIC,
        FOREIGN KEY("service_id") REFERENCES "service"("id"),
        FOREIGN KEY("profile_id") REFERENCES "profile"("id"),
      );
    `)

    console.log("Tables created successfully")
  } catch (error) {
    console.error("Error creating tables:", error)
    throw error
  }
}