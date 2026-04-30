import { z } from "zod";

export const TenantDebtSchema = z.object({
  id: z.string(),
  name: z.string(),
  rent_amount: z.number(),
  people_count: z.number(),
  shared_services: z.number(),
  room_services: z.number(),
  total_paid: z.number(),
  total_debt: z.number(),
});

export type TenantDebt = z.infer<typeof TenantDebtSchema>;
