import { Badge } from "@/models/Badge";

export async function getBadgeSeeds(): Promise<Badge[]> {
    return [
        {
            name: 'Plná nádrž',
            color: '#00ff00',
        },
        {
            name: 'Půl nádrže',
            color: '#ffff00',
        },
        {
            name: 'Rezerva',
            color: '#ff0000',
        },

        {
            name: 'Ekonomická jízda',
            color: '#00b894',
        },
        {
            name: 'Měsíční tankování',
            color: '#fd79a8',
        }
    ];
}