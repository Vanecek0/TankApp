import { Test } from "@/models/TestModel";

export function createTestSeed(overrides: Partial<Test> = {}): Test {
    return {
        manufacturer: '',
        model: '',
        manufacture_year: Date.now(),
        registration_date: Date.now(),
        fuel_id: 1,
        car_nickname: '',
        tachometer: 50000,
        ...overrides,
    };
}

export async function getTestSeeds() {
    return [
        createTestSeed({
            manufacturer: 'Škoda',
            model: 'Octavia',
            manufacture_year: 2015,
            registration_date: 2016,
            fuel_id: 3,
            car_nickname: 'Rodinná Octa',
            tachometer: 128000,
        }),

        createTestSeed({
            manufacturer: 'Volkswagen',
            model: 'Golf',
            manufacture_year: 2012,
            registration_date: 2013,
            fuel_id: 7,
            car_nickname: 'Golfík',
            tachometer: 142300,
        }),

        createTestSeed({
            manufacturer: 'Toyota',
            model: 'Corolla',
            manufacture_year: 2019,
            registration_date: 2020,
            fuel_id: 3,
            car_nickname: 'Korela',
            tachometer: 65300,
        }),

        createTestSeed({
            manufacturer: 'Dacia',
            model: 'Duster',
            manufacture_year: 2018,
            registration_date: 2019,
            fuel_id: 7,
            car_nickname: 'Dusterka',
            tachometer: 104500,
        }),

        createTestSeed({
            manufacturer: 'Peugeot',
            model: '208',
            manufacture_year: 2020,
            registration_date: 2021,
            fuel_id: 4,
            car_nickname: 'Pěťule',
            tachometer: 34500,
        }),

        createTestSeed({
            manufacturer: 'Ford',
            model: 'Focus',
            manufacture_year: 2016,
            registration_date: 2016,
            fuel_id: 8,
            car_nickname: 'Modrák',
            tachometer: 98500,
        }),

        createTestSeed({
            manufacturer: 'Hyundai',
            model: 'i30',
            manufacture_year: 2017,
            registration_date: 2018,
            fuel_id: 5,
            car_nickname: 'Hájíčko',
            tachometer: 76800,
        }),

        createTestSeed({
            manufacturer: 'Renault',
            model: 'Clio',
            manufacture_year: 2013,
            registration_date: 2014,
            fuel_id: 2,
            car_nickname: 'Klijo',
            tachometer: 119200,
        }),

        createTestSeed({
            manufacturer: 'Opel',
            model: 'Astra',
            manufacture_year: 2014,
            registration_date: 2015,
            fuel_id: 1,
            car_nickname: 'Astrička',
            tachometer: 133000,
        }),

        createTestSeed({
            manufacturer: 'Tesla',
            model: 'Model 3',
            manufacture_year: 2021,
            registration_date: 2022,
            fuel_id: 13,
            car_nickname: 'Teslička',
            tachometer: 25300,
        })
    ];
}