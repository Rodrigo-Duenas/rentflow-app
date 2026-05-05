import type { FastifyInstance } from "fastify";
import { authMiddleware } from "#shared/middleware/auth.js";
import { successResponse } from "#shared/http/response.js";
import { BillingService } from "./billing.service.js";

export async function billingRoutes(app: FastifyInstance) {
  const service = new BillingService();

  app.get("/me", { preHandler: authMiddleware }, async (request) => {
    return successResponse(request.user);
  });

  app.get(
    "/debts",
    { preHandler: authMiddleware },
    async (request) => {
      const data = await service.getTenantDebts();
      return successResponse(data);
    }
  );
}
