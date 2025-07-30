import { SQLiteDatabase } from 'expo-sqlite'; // nebo odkud máš ten typ

export type Car = {
    id?: number;
    manufacturer: string;
    model: string;
    manufacture_year: number;
    registration_date: number;
    fuel_id: number;
    car_nickname: string;
    tachometer: number;
};

export class CarModel {
    static async create(db: SQLiteDatabase, car: Car) {
        try {
            const result = await db.runAsync(
                `INSERT INTO car (manufacturer, model, manufacture_year, registration_date, fuel_id, car_nickname, tachometer)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    car.manufacturer,
                    car.model,
                    car.manufacture_year,
                    car.registration_date,
                    car.fuel_id,
                    car.car_nickname,
                    car.tachometer
                ]
            );
            return result;
        } catch (error) {
            console.error('Chyba při vkládání car:', error);
            throw new Error('Nepodařilo se vytvořit nový záznam.');
        }
    }

    static async first(db: SQLiteDatabase): Promise<Car | null> {
        const row = await db.getFirstAsync<Car>('SELECT * FROM car ORDER BY id ASC LIMIT 1');
        return row ?? null;
    }

    static async all(db: SQLiteDatabase): Promise<Car[]> {
        const rows = await db.getAllAsync<Car>('SELECT * FROM car');
        return rows;
    }

    static async count(db: SQLiteDatabase): Promise<number> {
        const rows = await db.getAllAsync<{ count: number }>('SELECT COUNT(*) AS count FROM car');
        return rows[0]?.count ?? 0;
    }

    static async findById(db: SQLiteDatabase, id: number): Promise<Car | null> {
        const row = await db.getFirstAsync<Car>('SELECT * FROM car WHERE id = ?', [id]);
        return row ?? null;
    }

    static async delete(db: SQLiteDatabase, id: number) {
        await db.runAsync('DELETE FROM car WHERE id = ?', [id]);
    }
}