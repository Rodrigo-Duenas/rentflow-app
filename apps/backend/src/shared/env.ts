import dotenv from "dotenv";
import path from "node:path";
import { z } from "zod";

dotenv.config({ path: path.resolve(process.cwd(), "config", ".env") });

const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),

  SUPABASE_URL: z.string().trim().url(),
  SUPABASE_ANON_KEY: z.string().trim().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().trim().min(1).optional(),
});

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  throw new Error(`Invalid environment variables:\n${parsed.error.message}`);
}

const supabaseKey = parsed.data.SUPABASE_SERVICE_ROLE_KEY ?? parsed.data.SUPABASE_ANON_KEY;
if (!supabaseKey) {
  throw new Error("Missing env: SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY)");
}

export const env = {
  port: parsed.data.PORT,
  supabaseUrl: parsed.data.SUPABASE_URL,
  supabaseKey,
} as const;

