import { Database } from "@/database/database";

export type Profile = {
  id?: number;
  name: string;
  avatar_url: string;
  created_at: number;
  updated_at: number;
};

export class ProfileModel {

    static async create(profile: Profile) {
        try {
            const result = await Database.executeSql(
                'INSERT INTO profile (name, avatar_url, created_at, updated_at) VALUES (?, ?, ?, ?)',
                [profile.name, profile.avatar_url, profile.created_at, profile.updated_at]
            );
            return result;
        }
        catch (error) {
            console.error('Chyba při vkládání p:', error);
            throw new Error('Nepodařilo se vytvořit nový záznam.');
        }
    }

    static async all(): Promise<Profile[]> {
        const db = await Database.getConnection();
        const rows = await db.getAllAsync<Profile>('SELECT * FROM profile');
        return rows;
    }

    static async count(): Promise<any> {
        const db = await Database.getConnection();
        const promiseThen = new Promise((resolve, reject) => {
            const count = db.getAllAsync('SELECT COUNT(*) FROM profile')
            resolve(count);
        });

        return promiseThen
            .then((val: any) => {
                return val[0]["COUNT(*)"];
            })
            .catch((err) => console.log(err));
    }

    static async findById(id: number): Promise<Profile | null> {
        const db = await Database.getConnection();
        const row = await db.getFirstAsync<Profile>('SELECT * FROM profile WHERE id = ?', [id]);
        return row;
    }

    static async delete(id: number) {
        await Database.executeSql('DELETE FROM profile WHERE id = ?', [id]);
    }
}