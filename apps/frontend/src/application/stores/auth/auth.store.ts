import { create } from "zustand";

import { persist } from "zustand/middleware";

import type { AuthState, AuthUser } from "./auth.types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,

      refreshToken: null,

      user: null,

      isAuthenticated: false,

      setAuth: (accessToken: string, refreshToken: string, user: AuthUser) =>
        set({
          accessToken,
          refreshToken,
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "rentflow-auth",
    },
  ),
);
