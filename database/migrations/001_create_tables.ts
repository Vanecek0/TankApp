import type * as SQLite from "expo-sqlite"

export async function createTables(db: SQLite.SQLiteDatabase) {
  try {
    console.log("Creating tables...")

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS station (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT,
        price_per_unit NUMERIC,
        last_visit NUMERIC,
        provider TEXT
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tanking (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tachometer INTEGER,
        station_id INTEGER,
        fuel_type TEXT,
        price NUMERIC,
        price_per_unit NUMERIC,
        amount NUMERIC,
        mileage NUMERIC,
        created_at NUMERIC,
        FOREIGN KEY(station_id) REFERENCES station(id)
      );
    `)

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS fuel_prices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        station_id INTEGER,
        fuel_type TEXT,
        price NUMERIC,
        created_at NUMERIC,
        FOREIGN KEY(station_id) REFERENCES station(id)
      );
    `)

    console.log("Tables created successfully")
  } catch (error) {
    console.error("Error creating tables:", error)
    throw error
  }
}