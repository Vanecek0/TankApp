import { Profile } from "@/models/Profile";

export function createProfileSeed(overrides: Partial<Profile> = {}): Profile {
    return {
        name: '',
        avatar_url: '',
        created_at: Date.now(),
        updated_at: Date.now(),
        ...overrides,
    };
}

export async function getProfileSeeds() {
    return [
        createProfileSeed({
            name: 'Pavel Vaněček',
            avatar_url: 'https://i.pravatar.cc/150?img=12',
            created_at: Date.now(),
            updated_at: Date.now(),
        }),

        createProfileSeed({
            name: 'Lucie Novotná',
            avatar_url: 'https://i.pravatar.cc/150?img=25',
            created_at: Date.now(),
            updated_at: Date.now(),
        }),
    ];
}