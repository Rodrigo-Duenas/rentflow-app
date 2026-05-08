import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Correo no válido"),
  password: z.string().min(1, "Introduce tu contraseña"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
