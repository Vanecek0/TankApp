import { Tanking } from "@/models/Tanking";

export async function getTankingSeeds(): Promise<Tanking[]> {
    return [
        {
            car_id: 1,
            station_fuel_id: 1,
            price_per_unit: 30.6,
            price: 1071,
            amount: 35,
            mileage: 315,
            tachometer: 35316,
            tank_date: 1609545600000,
            snapshot: "{\"id\":1,\"car_id\":1,\"station_fuel_id\":1,\"price_per_unit\":30.6,\"price\":1071,\"amount\":35,\"mileage\":315,\"tachometer\":35316,\"tank_date\":1609545600000,\"created_at\":1609545600000,\"updated_at\":1609545600000,\"station\":{\"id\":1,\"name\":\"Tank ONO\",\"address\":\"Domažlická 674/160, 318 00 Plzeň 3\",\"phone\":\"+420 607 111 111\",\"opening_hrs\":1753855200000,\"closing_hrs\":1753912800000,\"last_visit\":1752184877250,\"provider\":\"ONO\",\"note\":\"Nejlevnější v okolí\",\"created_at\":1753912877250,\"updated_at\":1753912877250},\"fuels\":[{\"id\":1,\"name\":\"Benzín\",\"code\":\"BA 90\",\"trademark\":\"Natural 90\",\"unit\":\"l\"},{\"id\":3,\"name\":\"Benzín\",\"code\":\"BA 95\",\"trademark\":\"Natural 95\",\"unit\":\"l\"},{\"id\":7,\"name\":\"Nafta\",\"code\":\"NM\",\"trademark\":\"Diesel\",\"unit\":\"l\"}]}",
            created_at: 1609545600000,
            updated_at: 1609545600000,
        },
        {
            car_id: 1,
            station_fuel_id: 1,
            price_per_unit: 31.2,
            price: 998.4,
            amount: 32,
            mileage: 295,
            tachometer: 35611,
            tank_date: 1612137600000,
            snapshot: JSON.stringify({
                id: 2,
                car_id: 1,
                station_fuel_id: 1,
                price_per_unit: 31.2,
                price: 998.4,
                amount: 32,
                mileage: 295,
                tachometer: 35611,
                tank_date: 1612137600000,
                created_at: 1612137600000,
                updated_at: 1612137600000,
                station: {
                    id: 1,
                    name: "Tank ONO",
                    address: "Domažlická 674/160, 318 00 Plzeň 3",
                    phone: "+420 607 111 111",
                    opening_hrs: 1753855200000,
                    closing_hrs: 1753912800000,
                    last_visit: 1752184877250,
                    provider: "ONO",
                    note: "Nejlevnější v okolí",
                    created_at: 1753912877250,
                    updated_at: 1753912877250,
                },
                fuels: [
                    { id: 1, name: "Benzín", code: "BA 90", trademark: "Natural 90", unit: "l" },
                    { id: 3, name: "Benzín", code: "BA 95", trademark: "Natural 95", unit: "l" },
                    { id: 7, name: "Nafta", code: "NM", trademark: "Diesel", unit: "l" }
                ]
            }),
            created_at: 1612137600000,
            updated_at: 1612137600000,
        },
    ];
}