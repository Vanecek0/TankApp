import { getStationSeeds } from "./factories/stationFactory"
import { getTankingSeeds } from "./factories/tankingFactory"
import type * as SQLite from "expo-sqlite"

export async function seed(db: SQLite.SQLiteDatabase) {
    try {

        if (!db) {
            throw new Error("Database instance is null or undefined")
        }
        await db.execAsync("BEGIN TRANSACTION;")

        try {
            await db.execAsync("DELETE FROM tanking;")
            await db.execAsync("DELETE FROM station;")

            await db.execAsync("DELETE FROM sqlite_sequence WHERE name IN ('station', 'tanking');")


            const stationSeeds = await getStationSeeds()
            console.log(`Seeding ${stationSeeds.length} stations...`)

            for (const station of stationSeeds) {
                const result = await db.runAsync(
                    `INSERT INTO station (name, address, price_per_unit, last_visit, provider)
           VALUES (?, ?, ?, ?, ?)`,
                    [station.name, station.address, station.price_per_unit, station.last_visit, station.provider],
                )
                console.log(`Inserted station with ID: ${result.lastInsertRowId}`)
            }

            const tankingSeeds = await getTankingSeeds()
            console.log(`Seeding ${tankingSeeds.length} tankings...`)

            for (const tanking of tankingSeeds) {
                const result = await db.runAsync(
                    `INSERT INTO tanking (tachometer, station_id, fuel_type, price, price_per_unit, amount, mileage, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        tanking.tachometer,
                        tanking.station_id,
                        tanking.fuel_type,
                        tanking.price,
                        tanking.price_per_unit,
                        tanking.amount,
                        tanking.mileage,
                        tanking.created_at,
                    ],
                )
                console.log(`Inserted tanking with ID: ${result.lastInsertRowId}`)
            }

            await db.execAsync("COMMIT;")
            console.log("Seeding complete")
        } catch (error) {
            await db.execAsync("ROLLBACK;")
            throw error
        }
    } catch (err) {
        console.error("Seeding failed:", err)
        throw err
    }
}
