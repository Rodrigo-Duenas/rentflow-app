import { useState } from "react";

import { authService } from "@/infrastructure/auth/auth.service";

import type { LoginCredentials } from "@/domain/auth/auth.types";
import type { LoginResponse } from "@/domain/auth/auth.responses";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const login = async (
    credentials: LoginCredentials,
  ): Promise<LoginResponse | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.login(credentials);

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
