import type { FastifyInstance } from "fastify";
import { BillingService } from "./billing.service.js";
import { successResponse } from "../../shared/http/response.js";

export async function billingRoutes(app: FastifyInstance) {
  const service = new BillingService();

  app.get("/debts", async () => {
    const data = await service.getTenantDebts();
    return successResponse(data);
  });
}
