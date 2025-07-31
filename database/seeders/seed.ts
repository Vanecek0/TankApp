import { StationModel } from "@/models/Station"
import { getStationSeeds } from "./factories/stationFactory"
import { getTankingSeeds } from "./factories/tankingFactory"
import type * as SQLite from "expo-sqlite"
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
import { TestModel } from "@/models/TestModel"
import { getTestSeeds } from "./factories/testFactory"

export async function seed(db: SQLite.SQLiteDatabase) {
    try {

        if (!db) {
            throw new Error("Database instance is null or undefined")
        }
        await db.execAsync("BEGIN TRANSACTION;")

        try {

            const fuelSeeds = await getFuelSeeds()

            for (const fuel of fuelSeeds) {
                await FuelModel.create(fuel)
            }

            const stationSeeds = await getStationSeeds()
            for (const station of stationSeeds) {
                await StationModel.create(station)
            }

            const stationFuelSeeds = await getStationFuelSeeds()

            for (const stationFuel of stationFuelSeeds) {
                await StationFuelModel.create(stationFuel)
            }

            const autoserviceSeeds = await getAutoserviceSeeds()

            for (const autoservice of autoserviceSeeds) {
                await AutoserviceModel.create(autoservice)
            }

            const partSeeds = await getPartSeeds()

            for (const part of partSeeds) {
                await PartModel.create(part)
            }

            const carSeeds = await getCarSeeds()

            for (const car of carSeeds) {
                await CarModel.create(car)
            }

            const testSeeds = await getTestSeeds()

            for (const test of testSeeds) {
                await TestModel.create(test)
            }

            const servicingSeeds = await getServicingSeeds()

            for (const servicing of servicingSeeds) {
                await ServicingModel.create(servicing)
            }

            const servicingPartSeeds = await getServicingPartSeeds()

            for (const servicingPart of servicingPartSeeds) {
                await ServicingPartModel.create(servicingPart)
            }

            const tankingSeeds = await getTankingSeeds()

            for (const tanking of tankingSeeds) {
                await TankingModel.create(db, tanking)
            }

            const badgeSeeds = await getBadgeSeeds()

            for (const badge of badgeSeeds) {
                await BadgeModel.create(db, badge)
            }

            const badgeTankingSeeds = await getBadgeTankingSeeds()

            for (const badgeTanking of badgeTankingSeeds) {
                await BadgeTankingModel.create(badgeTanking)
            }


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