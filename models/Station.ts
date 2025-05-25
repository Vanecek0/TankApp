import { Database } from "@/database/database";

export type Station = {
  id?: number;
  name: string;
  address: string;
  price_per_unit: number;
  last_visit: number;
  provider: string;
};