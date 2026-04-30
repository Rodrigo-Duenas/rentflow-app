import { supabase } from "../../infrastructure/index.js";
import { AppError } from "../../shared/errors/app-error.js";
import { TenantDebtSchema, type TenantDebt } from "./billing.types.js";

export class BillingService {
  async getTenantDebts(): Promise<TenantDebt[]> {
    const { data, error } = await supabase.rpc("get_tenant_debts");

    if (error) {
      console.error(error);
      throw new AppError("Database error", 500, "DB_ERROR");
    }

    const parsed = (data ?? []).map((item: unknown) => {
      const result = TenantDebtSchema.safeParse(item);

      if (!result.success) {
        console.error(result.error);
        throw new AppError("Invalid data from DB", 500, "VALIDATION_ERROR");
      }

      return result.data;
    });

    return parsed;
  }
}
