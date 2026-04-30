import { env } from "./shared/env.js";
import Fastify from "fastify";
import { billingRoutes } from "./modules/billing/billing.controller.js";
import { AppError } from "./shared/errors/app-error.js";
import { errorResponse } from "./shared/http/response.js";

const app = Fastify();

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send(errorResponse(error.message, error.code));
  }

  console.error(error);

  return reply.status(500).send(errorResponse("Internal server error", "INTERNAL_ERROR"));
});

app.get("/", async () => {
  return { message: "Rent Flow API 🚀" };
});

// 🔥 aquí conectas el módulo
app.register(billingRoutes);

app.listen({ port: env.port }, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
