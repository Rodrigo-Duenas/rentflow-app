import type { FastifyInstance } from "fastify";

import { authService } from "./auth.service.js";

import type { LoginBody } from "./auth.types.js";

export async function authController(app: FastifyInstance) {
  app.post<{
    Body: LoginBody;
  }>("/auth/login", async (request, reply) => {
    const response = await authService.login(request.body);

    return reply.send(response);
  });
}
