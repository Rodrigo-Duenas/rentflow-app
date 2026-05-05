import { create } from "zustand";
import type { Theme } from "@/domain/theme/theme.types";
import { themeSchema } from "@/domain/theme/theme.schema";

const STORAGE_KEY = "app-theme";

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(STORAGE_KEY);

  const parsed = themeSchema.safeParse(stored);

  if (parsed.success) return parsed.data;

  // fallback: sistema operativo
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  return systemPrefersDark ? "dark" : "light";
};

export const useTheme = create<ThemeState>((set, get) => ({
  theme: getInitialTheme(),

  setTheme: (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    set({ theme });
  },

  toggleTheme: () => {
    const current = get().theme;
    const next = current === "light" ? "dark" : "light";

    localStorage.setItem(STORAGE_KEY, next);
    set({ theme: next });
  },
}));
