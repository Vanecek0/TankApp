import { BadgeTanking } from "@/models/BadgeTanking";

export function createBadgeTankingSeed(overrides: Partial<BadgeTanking> = {}) {
    return {
      id_badge: 1,
      id_tanking: 1,
      ...overrides,
    };
  }
  
  export async function getBadgeTankingSeeds() {
    return [
        createBadgeTankingSeed({ id_badge: 1, id_tanking: 1}),
        createBadgeTankingSeed({ id_badge: 2, id_tanking: 1}),
        createBadgeTankingSeed({ id_badge: 3, id_tanking: 2}),
        createBadgeTankingSeed({ id_badge: 4, id_tanking: 1}),
        createBadgeTankingSeed({ id_badge: 2, id_tanking: 2}),
        createBadgeTankingSeed({ id_badge: 3, id_tanking: 1})
    ];
  }