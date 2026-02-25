import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tankFormSchema, TankFormValues } from "./schema/tankForm.schema";

export function useTankForm() {
  const form = useForm<TankFormValues>({
    resolver: zodResolver(tankFormSchema),
    defaultValues: {
      tank_date: Date.now(),
      full_tank: false,
    },
    mode: "onBlur",
  });

  return form;
}