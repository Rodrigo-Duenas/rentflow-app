import type { LoginCredentials } from "@/domain/auth/auth.types";
import type { LoginResponse } from "@/domain/auth/auth.responses";

import { httpClient } from "../httpClient";

export const authService = {
  login: (credentials: LoginCredentials): Promise<LoginResponse> =>
    httpClient.post<LoginResponse>("/auth/login", credentials),
};
