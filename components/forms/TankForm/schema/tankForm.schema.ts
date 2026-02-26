import { z } from "zod"

export const tankFormSchema = z.object({
  tachometer: z.number().min(0, "Zadej stav tachometru"),
  station_id: z.string().min(1, "Vyber stanici"),
  station_fuel_id: z.string().min(1, "Vyber palivo"),
  amount: z.number().positive("Musí být > 0"),
  price_per_unit: z.number().positive(),
  price: z.number().positive(),
  tank_date: z.number(),
  full_tank: z.boolean(),
  note: z.string().optional(),
});

export type TankFormValues = z.infer<typeof tankFormSchema>;