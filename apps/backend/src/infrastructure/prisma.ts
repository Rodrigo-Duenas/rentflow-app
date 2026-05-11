import { PrismaClient } from "@prisma/client";

/**
 * Una sola instancia de Prisma por proceso (Fastify).
 * Tras cambiar el schema: `pnpm db:generate`
 */
export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});
