import { StationModel } from "@/models/Station"
import { getStationSeeds } from "./factories/stationFactory"
import { getTankingSeeds } from "./factories/tankingFactory"
import type * as SQLite from "expo-sqlite"
import { TankingModel } from "@/models/Tanking"
import { getFuelSeeds } from "./factories/fuelFactory"
import { FuelModel } from "@/models/Fuel"
import { getProfileSeeds } from "./factories/profileFactory"
import { ProfileModel } from "@/models/Profile"
import { getStationFuelSeeds } from "./factories/stationFuelFactory"
import { StationFuelModel } from "@/models/StationFuel"
import { getServicingSeeds } from "./factories/servicingFactory"
import { ServicingModel } from "@/models/Servicing"
import { getPartSeeds } from "./factories/partFactory"
import { PartModel } from "@/models/Part"
import { getAutoserviceSeeds } from "./factories/autoserviceFactory"
import { AutoserviceModel } from "@/models/Autoservice"
import { getCarSeeds } from "./factories/carFactory"
import { CarModel } from "@/models/Car"
import { getServicingPartSeeds } from "./factories/servicingPartFactory"
import { ServicingPartModel } from "@/models/ServicingPart"
import { getBadgeSeeds } from "./factories/badgeFactory"
import { BadgeModel } from "@/models/Badge"
import { getBadgeTankingSeeds } from "./factories/badgeTankingFactory"
import { BadgeTankingModel } from "@/models/BadgeTanking"

export async function seed(db: SQLite.SQLiteDatabase) {
    try {

        if (!db) {
            throw new Error("Database instance is null or undefined")
        }
        await db.execAsync("BEGIN TRANSACTION;")

        try {
            /*await db.execAsync("DELETE FROM tanking;")
            await db.execAsync("DELETE FROM station;")
            await db.execAsync("DELETE FROM fuel;")
            await db.execAsync("DELETE FROM servicing;")
            await db.execAsync("DELETE FROM autoservice;")
            await db.execAsync("DELETE FROM profile;")
            await db.execAsync("DELETE FROM part;")
            await db.execAsync("DELETE FROM car;")
            await db.execAsync("DELETE FROM badge;")
            await db.execAsync("DELETE FROM badge_tanking;")
            await db.execAsync("DELETE FROM station_fuel;")
            await db.execAsync("DELETE FROM servicing_part;")
            await db.execAsync("DELETE FROM sqlite_sequence WHERE name IN ('station', 'tanking', 'fuel', 'servicing', 'autoservice', 'profile', 'part', 'car', 'badge', 'badge_tanking', 'station_fuel', 'servicing_part');")*/
            
            const profileSeeds = await getProfileSeeds()
            console.log(`Seeding ${profileSeeds.length} profiles...`)

            for (const profile of profileSeeds) {
                const create = ProfileModel.create(profile)
                console.log(`Inserted profile: ${create}`)
            }

            const fuelSeeds = await getFuelSeeds()
            console.log(`Seeding ${fuelSeeds.length} fuels...`)

            for (const fuel of fuelSeeds) {
                const create = FuelModel.create(fuel)
                console.log(`Inserted fuel: ${create}`)
            }

            const stationSeeds = await getStationSeeds()
            console.log(`Seeding ${stationSeeds.length} stations...`)

            for (const station of stationSeeds) {
                const create = StationModel.create(station)
                console.log(`Inserted station: ${create}`)
            }

            const stationFuelSeeds = await getStationFuelSeeds()
            console.log(`Seeding ${stationFuelSeeds.length} join table station_fuel...`)

            for (const stationFuel of stationFuelSeeds) {
                const create = StationFuelModel.create(stationFuel)
                console.log(`Inserted station_fuel: ${create}`)
            }

            const autoserviceSeeds = await getAutoserviceSeeds()
            console.log(`Seeding ${autoserviceSeeds.length} autoservice...`)

            for (const autoservice of autoserviceSeeds) {
                const create = AutoserviceModel.create(autoservice)
                console.log(`Inserted autoservice: ${create}`)
            }

            const partSeeds = await getPartSeeds()
            console.log(`Seeding ${partSeeds.length} part...`)

            for (const part of partSeeds) {
                const create = PartModel.create(part)
                console.log(`Inserted part: ${create}`)
            }

            const carSeeds = await getCarSeeds()
            console.log(`Seeding ${partSeeds.length} car...`)

            for (const car of carSeeds) {
                const create = CarModel.create(car)
                console.log(`Inserted car: ${create}`)
            }

            const servicingSeeds = await getServicingSeeds()
            console.log(`Seeding ${servicingSeeds.length} servicing...`)

            for (const servicing of servicingSeeds) {
                const create = ServicingModel.create(servicing)
                console.log(`Inserted servicing: ${create}`)
            }

            const servicingPartSeeds = await getServicingPartSeeds()
            console.log(`Seeding ${fuelSeeds.length} join table servicing_part...`)

            for (const servicingPart of servicingPartSeeds) {
                const create = ServicingPartModel.create(servicingPart)
                console.log(`Inserted servicing_part: ${create}`)
            }

            const badgeSeeds = await getBadgeSeeds()
            console.log(`Seeding ${badgeSeeds.length} join table badge...`)

            for (const badge of badgeSeeds) {
                const create = BadgeModel.create(badge)
                console.log(`Inserted badge: ${create}`)
            }

            const tankingSeeds = await getTankingSeeds()
            console.log(`Seeding ${tankingSeeds.length} tankings...`)

            for (const tanking of tankingSeeds) {
                const create = TankingModel.create(tanking)
                console.log(`Inserted tanking: ${create}`)
            }

            const badgeTankingSeeds = await getBadgeTankingSeeds()
            console.log(`Seeding ${badgeTankingSeeds.length} join table badge_tanking...`)

            for (const badgeTanking of badgeTankingSeeds) {
                const create = BadgeTankingModel.create(badgeTanking)
                console.log(`Inserted badge_tanking: ${create}`)
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
