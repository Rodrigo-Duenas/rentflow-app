export type AuthUser = {
  id: string;
  email: string;
};

export type AuthState = {
  accessToken: string | null;

  refreshToken: string | null;

  user: AuthUser | null;

  isAuthenticated: boolean;

  setAuth: (accessToken: string, refreshToken: string, user: AuthUser) => void;

  logout: () => void;
};
