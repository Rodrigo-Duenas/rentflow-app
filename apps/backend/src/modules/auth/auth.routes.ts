import type { FastifyInstance } from "fastify";

import { AppError } from "../../shared/errors/app-error.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { authService } from "./auth.service.js";

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/register", async (request, reply) => {
    const parsed = registerSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        message: "Datos inválidos",
        issues: parsed.error.flatten(),
      });
    }

    try {
      const result = await authService.register(parsed.data);
      return reply.status(201).send(result);
    } catch (err) {
      if (err instanceof Error && err.message === "El usuario ya existe") {
        throw new AppError(err.message, 409, "USER_EXISTS");
      }
      throw err;
    }
  });

  app.post("/auth/login", async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        message: "Datos inválidos",
        issues: parsed.error.flatten(),
      });
    }

    try {
      const result = await authService.login(parsed.data);
      return reply.send(result);
    } catch (err) {
      if (err instanceof Error && err.message === "Credenciales inválidas") {
        throw new AppError(err.message, 401, "INVALID_CREDENTIALS");
      }
      throw err;
    }
  });
}
