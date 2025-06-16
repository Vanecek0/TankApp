import { Database } from "@/database/database";

export type Car = {
    id?: number;
    manufacturer: string;
    model: string;
    manufacture_year: number;
    registration_date: number;
    profile_id: number;
    fuel_id: number;
    car_nickname: string;
    tachometer: number;
};

export class CarModel {

    static async create(car: Car) {
        try {
            const result = await Database.executeSql(
                'INSERT INTO car (manufacturer, model, manufacture_year, registration_date, profile_id, fuel_id, car_nickname, tachometer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [car.manufacturer, car.model, car.manufacture_year, car.registration_date, car.profile_id, car.fuel_id, car.car_nickname, car.tachometer]
            );

            return result;
        }
        catch (error) {
            console.error('Chyba při vkládání car:', error);
            throw new Error('Nepodařilo se vytvořit nový záznam.');
        }
    }

    static async all(): Promise<Car[]> {
        const db = await Database.getConnection();
        const rows = await db.getAllAsync<Car>('SELECT * FROM car');
        return rows;
    }

    static async count(): Promise<any> {
        const db = await Database.getConnection();
        const promiseThen = new Promise((resolve, reject) => {
            const count = db.getAllAsync('SELECT COUNT(*) FROM car')
            resolve(count);
        });

        return promiseThen
            .then((val: any) => {
                return val[0]["COUNT(*)"];
            })
            .catch((err) => console.log(err));
    }

    static async findById(id: number): Promise<Car | null> {
        const db = await Database.getConnection();
        const row = await db.getFirstAsync<Car>('SELECT * FROM car WHERE id = ?', [id]);
        return row;
    }

    static async delete(id: number) {
        await Database.executeSql('DELETE FROM car WHERE id = ?', [id]);
    }

}