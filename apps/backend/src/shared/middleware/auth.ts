import type { FastifyRequest, FastifyReply } from "fastify";
import { createRemoteJWKSet, errors, jwtVerify } from "jose";
import { env } from "../env.js";
import { AppError } from "../errors/app-error.js";

const supabaseOrigin = env.supabaseUrl.replace(/\/$/, "");
const jwks = createRemoteJWKSet(new URL(`${supabaseOrigin}/auth/v1/.well-known/jwks.json`));
const issuer = `${supabaseOrigin}/auth/v1`;

export async function authMiddleware(
  request: FastifyRequest,
  _reply: FastifyReply
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Missing token", 401, "UNAUTHORIZED");
  }

  const token = authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : authHeader;

  try {
    const { payload } = await jwtVerify(token, jwks, {
      issuer,
      audience: "authenticated",
    });

    request.user = payload;
  } catch (error) {
    // Diferenciamos token inválido vs problema de configuración/red
    if (
      error instanceof errors.JWTExpired ||
      error instanceof errors.JWTClaimValidationFailed ||
      error instanceof errors.JWSSignatureVerificationFailed ||
      error instanceof errors.JWTInvalid
    ) {
      throw new AppError("Invalid token", 401, "INVALID_TOKEN");
    }

    console.error("Auth verification error:", error);
    throw new AppError("Auth verification failed", 500, "AUTH_VERIFY_FAILED");
  }
}
