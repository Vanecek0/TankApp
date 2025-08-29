import { BadgeTanking } from "@/models/BadgeTanking";

export async function getBadgeTankingSeeds(): Promise<BadgeTanking[]> {
  return [
    { id_badge: 1, id_tanking: 1 },
    { id_badge: 2, id_tanking: 1 },
    { id_badge: 3, id_tanking: 2 },
    { id_badge: 4, id_tanking: 1 },
    { id_badge: 2, id_tanking: 2 },
    { id_badge: 3, id_tanking: 1 },
  ];
}