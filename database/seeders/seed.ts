import { StationModel } from "@/models/Station"
import { getStationSeeds } from "./factories/stationFactory"
import { getTankingSeeds } from "./factories/tankingFactory"
import type * as SQLite from "expo-sqlite"
import { TankingModel } from "@/models/Tanking"
import { getFuelSeeds } from "./factories/fuelFactory"
import { FuelModel } from "@/models/Fuel"
import { getProfileSeeds } from "./factories/profileFactory"
import { ProfileModel } from "@/models/Profile"
import { getStationFuelSeeds } from "./factories/StationFuelFactory"
import { StationFuelModel } from "@/models/StationFuel"

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
                const create = StationModel.create(station)
                console.log(`Inserted station: ${create}`)
            }

            const tankingSeeds = await getTankingSeeds()
            console.log(`Seeding ${tankingSeeds.length} tankings...`)

            for (const tanking of tankingSeeds) {
                const create = TankingModel.create(tanking)
                console.log(`Inserted tanking: ${create}`)
            }

            const fuelSeeds = await getFuelSeeds()
            console.log(`Seeding ${fuelSeeds.length} fuels...`)

            for (const fuel of fuelSeeds) {
                const create = FuelModel.create(fuel)
                console.log(`Inserted fuel: ${create}`)
            }

            const stationFuelSeeds = await getStationFuelSeeds()
            console.log(`Seeding ${fuelSeeds.length} join table station_fuel...`)

            for (const stationFuel of stationFuelSeeds) {
                const create = StationFuelModel.create(stationFuel)
                console.log(`Inserted station_fuel: ${create}`)
            }

            const profileSeeds = await getProfileSeeds()
            console.log(`Seeding ${profileSeeds.length} profiles...`)

            for (const profile of profileSeeds) {
                const create = ProfileModel.create(profile)
                console.log(`Inserted profile: ${create}`)
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
