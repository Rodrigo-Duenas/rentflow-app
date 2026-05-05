import { z } from "zod";

export const themeSchema = z.enum(["light", "dark"]);

export type ThemeSchema = z.infer<typeof themeSchema>;
