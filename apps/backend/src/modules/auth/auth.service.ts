import type { LoginBody } from "./auth.types.js";

export const authService = {
  login: async (body: LoginBody) => {
    return {
      accessToken: "fake-access-token",

      refreshToken: "fake-refresh-token",

      user: {
        id: "1",
        email: body.email,
      },
    };
  },
};
