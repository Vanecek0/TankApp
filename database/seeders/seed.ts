import { getStationSeeds } from "./factories/stationFactory"
import { getTankingSeeds } from "./factories/tankingFactory"
import { getFuelSeeds } from "./factories/fuelFactory"
import { getStationFuelSeeds } from "./factories/stationFuelFactory"
import { getPartSeeds } from "./factories/partFactory"
import { getAutoserviceSeeds } from "./factories/autoserviceFactory"
import { getCarSeeds } from "./factories/carFactory"
import { getServicingPartSeeds } from "./factories/servicingPartFactory"
import { getBadgeSeeds } from "./factories/badgeFactory"
import { getBadgeTankingSeeds } from "./factories/badgeTankingFactory"
import { badgeTankingRepository } from "@/repositories/badgeTankingRepository"
import { badgeRepository } from "@/repositories/badgeRepository"
import { tankingRepository } from "@/repositories/tankingRepository"
import { servicingPartRepository } from "@/repositories/servicingPartRepository"
import { servicingRepository } from "@/repositories/servicingRepository"
import { carRepository } from "@/repositories/carRepository"
import { partRepository } from "@/repositories/partRepository"
import { autoserviceRepository } from "@/repositories/autoserviceRepository"
import { stationFuelRepository } from "@/repositories/stationFuelRepository"
import { stationRepository } from "@/repositories/stationRepository"
import { fuelRepository } from "@/repositories/fuelRepository"
import { getServicingSeeds } from "./factories/servicingFactory"
import { seedEntity } from "./seedFactory"
import type * as SQLite from "expo-sqlite"

export async function seed(db: SQLite.SQLiteDatabase) {
    try {

        if (!db) {
            throw new Error("Database instance is null or undefined")
        }
        await db.execAsync("BEGIN TRANSACTION;")
        
        try {
            await seedEntity(await getFuelSeeds(), fuelRepository)
            await seedEntity(await getStationSeeds(), stationRepository)
            await seedEntity(await getStationFuelSeeds(), stationFuelRepository)
            await seedEntity(await getAutoserviceSeeds(), autoserviceRepository)
            await seedEntity(await getPartSeeds(), partRepository)
            await seedEntity(await getCarSeeds(), carRepository)
            await seedEntity(await getServicingSeeds(), servicingRepository)
            await seedEntity(await getServicingPartSeeds(), servicingPartRepository)
            await seedEntity(await getTankingSeeds(), tankingRepository)
            await seedEntity(await getBadgeSeeds(), badgeRepository)
            await seedEntity(await getBadgeTankingSeeds(), badgeTankingRepository)

            await db.execAsync("COMMIT;")
        } catch (error) {
            await db.execAsync("ROLLBACK;")
            throw error
        }
    } catch (err) {
        console.error("Seeding failed:", err)
        throw err
    }
}