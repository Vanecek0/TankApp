import { StationModel } from "@/models/Station"
import { getStationSeeds } from "./factories/stationFactory"
import { getTankingSeeds } from "./factories/tankingFactory"
import { TankingModel } from "@/models/Tanking"
import { getFuelSeeds } from "./factories/fuelFactory"
import { FuelModel } from "@/models/Fuel"
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
import { seedEntity } from "./seedFactory"
import type * as SQLite from "expo-sqlite"

export async function seed(db: SQLite.SQLiteDatabase) {
    try {

        if (!db) {
            throw new Error("Database instance is null or undefined")
        }
        await db.execAsync("BEGIN TRANSACTION;")

        try {
            await seedEntity(await getFuelSeeds(), FuelModel)
            await seedEntity(await getStationSeeds(), StationModel)
            await seedEntity(await getStationFuelSeeds(), StationFuelModel)
            await seedEntity(await getAutoserviceSeeds(), AutoserviceModel)
            await seedEntity(await getPartSeeds(), PartModel)
            await seedEntity(await getCarSeeds(), CarModel)
            await seedEntity(await getServicingSeeds(), ServicingModel)
            await seedEntity(await getServicingPartSeeds(), ServicingPartModel)
            await seedEntity(await getTankingSeeds(), TankingModel)
            await seedEntity(await getBadgeSeeds(), BadgeModel)
            await seedEntity(await getBadgeTankingSeeds(), BadgeTankingModel)

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