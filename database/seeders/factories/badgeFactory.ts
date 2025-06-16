import { Badge } from "@/models/Badge";

export function createBadgeSeed(overrides: Partial<Badge> = {}): Badge {
    return {
        name: '',
        color: '',
        ...overrides,
    };
}

export async function getBadgeSeeds() {
    return [
        createBadgeSeed({
            name: 'Plná nádrž',
            color: '#00ff00',
        }),

        createBadgeSeed({
            name: 'Půl nádrže',
            color: '#ffff00',
        }),
        createBadgeSeed({
            name: 'Rezerva',
            color: '#ff0000',
        }),
        
        createBadgeSeed({
            name: 'Ekonomická jízda',
            color: '#00b894',
        }),
        
        createBadgeSeed({
            name: 'Měsíční tankování',
            color: '#fd79a8',
        })
    ];
}