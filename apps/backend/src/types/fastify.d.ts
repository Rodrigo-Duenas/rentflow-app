import "fastify";
import type { JWTPayload } from "jose";

declare module "fastify" {
  interface FastifyRequest {
    user?: JWTPayload;
  }
}
