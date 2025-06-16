import { Car } from "@/models/Car";

export function createCarSeed(overrides: Partial<Car> = {}): Car {
    return {
        manufacturer: '',
        model: '',
        manufacture_year: Date.now(),
        registration_date: Date.now(),
        profile_id: 1,
        fuel_id: 1,
        car_nickname: '',
        tachometer: 50000,
        ...overrides,
    };
}

export async function getCarSeeds() {
    return [
        createCarSeed({
            manufacturer: 'Škoda',
            model: 'Octavia',
            manufacture_year: 2015,
            registration_date: 2016,
            profile_id: 1,
            fuel_id: 3,
            car_nickname: 'Rodinná Octa',
            tachometer: 128000,
        }),

        createCarSeed({
            manufacturer: 'Volkswagen',
            model: 'Golf',
            manufacture_year: 2012,
            registration_date: 2013,
            profile_id: 1,
            fuel_id: 7,
            car_nickname: 'Golfík',
            tachometer: 142300,
        }),

        createCarSeed({
            manufacturer: 'Toyota',
            model: 'Corolla',
            manufacture_year: 2019,
            registration_date: 2020,
            profile_id: 1,
            fuel_id: 3,
            car_nickname: 'Korela',
            tachometer: 65300,
        }),

        createCarSeed({
            manufacturer: 'Dacia',
            model: 'Duster',
            manufacture_year: 2018,
            registration_date: 2019,
            profile_id: 1,
            fuel_id: 7,
            car_nickname: 'Dusterka',
            tachometer: 104500,
        }),

        createCarSeed({
            manufacturer: 'Peugeot',
            model: '208',
            manufacture_year: 2020,
            registration_date: 2021,
            profile_id: 1,
            fuel_id: 4,
            car_nickname: 'Pěťule',
            tachometer: 34500,
        }),

        createCarSeed({
            manufacturer: 'Ford',
            model: 'Focus',
            manufacture_year: 2016,
            registration_date: 2016,
            profile_id: 1,
            fuel_id: 8,
            car_nickname: 'Modrák',
            tachometer: 98500,
        }),

        createCarSeed({
            manufacturer: 'Hyundai',
            model: 'i30',
            manufacture_year: 2017,
            registration_date: 2018,
            profile_id: 1,
            fuel_id: 5,
            car_nickname: 'Hájíčko',
            tachometer: 76800,
        }),

        createCarSeed({
            manufacturer: 'Renault',
            model: 'Clio',
            manufacture_year: 2013,
            registration_date: 2014,
            profile_id: 1,
            fuel_id: 2,
            car_nickname: 'Klijo',
            tachometer: 119200,
        }),

        createCarSeed({
            manufacturer: 'Opel',
            model: 'Astra',
            manufacture_year: 2014,
            registration_date: 2015,
            profile_id: 2,
            fuel_id: 1,
            car_nickname: 'Astrička',
            tachometer: 133000,
        }),

        createCarSeed({
            manufacturer: 'Tesla',
            model: 'Model 3',
            manufacture_year: 2021,
            registration_date: 2022,
            profile_id: 2,
            fuel_id: 13,
            car_nickname: 'Teslička',
            tachometer: 25300,
        })
    ];
}