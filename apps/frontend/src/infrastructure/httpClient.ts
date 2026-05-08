import { API_URL } from "./http.constants";
import type { RequestOptions } from "./http.types";

const request = async <T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  const { method = "GET", body, headers } = options;

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },

    body: body ? JSON.stringify(body) : undefined,
  });

  // manejo básico de errores
  if (!response.ok) {
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const error = (await response.json()) as { message?: string };
      throw new Error(error.message || "Error en la petición");
    }

    const text = await response.text();
    throw new Error(text || "Error en la petición");
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return null as T;
};

export const httpClient = {
  get: <T>(endpoint: string, headers?: HeadersInit) =>
    request<T>(endpoint, {
      method: "GET",
      headers,
    }),

  post: <T>(endpoint: string, body?: unknown, headers?: HeadersInit) =>
    request<T>(endpoint, {
      method: "POST",
      body,
      headers,
    }),

  put: <T>(endpoint: string, body?: unknown, headers?: HeadersInit) =>
    request<T>(endpoint, {
      method: "PUT",
      body,
      headers,
    }),

  patch: <T>(endpoint: string, body?: unknown, headers?: HeadersInit) =>
    request<T>(endpoint, {
      method: "PATCH",
      body,
      headers,
    }),

  delete: <T>(endpoint: string, headers?: HeadersInit) =>
    request<T>(endpoint, {
      method: "DELETE",
      headers,
    }),
};
