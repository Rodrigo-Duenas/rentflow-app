import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "@/infrastructure/auth/auth.service";

import type { LoginCredentials } from "@/domain/auth/auth.types";
import type { LoginResponse } from "@/domain/auth/auth.responses";
import { useAuthStore } from "@/application/stores/auth";

export const useLogin = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const setAuth = useAuthStore(
    (state) => state.setAuth
  );

  const login = async (
    credentials: LoginCredentials,
  ): Promise<LoginResponse | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.login(credentials);

      setAuth(response.accessToken, response.refreshToken, response.user);
      navigate("/dashboard", { replace: true });

      return response;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado");
      }

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
};
