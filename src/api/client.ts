/* ================================================================== */
/*  HTTP client — thin wrapper around fetch()                         */
/*                                                                    */
/*  Handles:                                                          */
/*   • Base URL configuration                                        */
/*   • Auth token injection (Bearer header)                           */
/*   • JSON & FormData request building                               */
/*   • Consistent error handling with typed ApiError                  */
/*                                                                    */
/*  Usage:                                                            */
/*    import { api } from "@/api/client";                             */
/*    const products = await api.get<ApiProduct[]>("/Product/GetAll"); */
/* ================================================================== */

import type { ApiResponse } from "./types";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const BASE_URL = "https://zoumapushpak.com:449/api";

/**
 * Auth token lives in localStorage so it survives page reloads.
 * The token key is intentionally simple — this is a frontend-only
 * auth setup with no refresh-token rotation.
 */
const TOKEN_KEY = "shophub_auth_token";

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = (): void => localStorage.removeItem(TOKEN_KEY);

/* ------------------------------------------------------------------ */
/*  Error class                                                        */
/* ------------------------------------------------------------------ */

/**
 * Custom error thrown when the API returns a non-2xx status.
 *
 * Consumers can `catch (err)` and check `err instanceof ApiError`
 * to differentiate network failures from server rejections.
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: unknown,
  ) {
    super(`API ${status}: ${statusText}`);
    this.name = "ApiError";
  }
}

/* ------------------------------------------------------------------ */
/*  Core request helper                                                */
/* ------------------------------------------------------------------ */

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  /** Query-string params appended to the URL */
  params?: Record<string, string | number | boolean | undefined>;
  /** JSON body (ignored for GET/DELETE without body) */
  body?: unknown;
  /** Set true when body is FormData (skips JSON serialization) */
  isFormData?: boolean;
  /** Override default headers */
  headers?: Record<string, string>;
}

/**
 * Build query string from a params object.
 * Undefined values are silently dropped.
 */
const buildQueryString = (params: Record<string, string | number | boolean | undefined>): string => {
  const entries = Object.entries(params).filter(([, v]) => v !== undefined);
  if (entries.length === 0) return "";
  return "?" + entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join("&");
};

/**
 * Low-level request function.
 *
 * All public helpers (get, post, put …) delegate here.
 * Returns the **parsed JSON body** typed as `T`.
 */
async function request<T>(method: HttpMethod, path: string, options: RequestOptions = {}): Promise<T> {
  const { params, body, isFormData, headers: extraHeaders } = options;

  const url = `${BASE_URL}${path}${params ? buildQueryString(params) : ""}`;

  const headers: Record<string, string> = { ...extraHeaders };

  // Attach auth token when available
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Build fetch init
  const init: RequestInit = { method, headers };

  if (body !== undefined) {
    if (isFormData && body instanceof FormData) {
      // Let the browser set Content-Type with boundary
      init.body = body;
    } else {
      headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(body);
    }
  }

  const response = await fetch(url, init);

  // Handle empty responses (204 No Content, etc.)
  const text = await response.text();
  const parsed = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText, parsed);
  }

  return parsed as T;
}

/* ------------------------------------------------------------------ */
/*  Public API object                                                  */
/* ------------------------------------------------------------------ */

/**
 * Typed HTTP client pre-configured for the AlphaLogistics API.
 *
 * ```ts
 * // Simple GET
 * const categories = await api.get<ApiCategory[]>("/Product/GetAllCategories");
 *
 * // POST with body
 * const result = await api.post<ApiResponse<LoginResponse>>("/User/Login", { body: credentials });
 *
 * // GET with query params
 * const order = await api.get<OrderResponse>("/Order/GetOrderById", { params: { orderId: 42 } });
 * ```
 */
export const api = {
  get: <T>(path: string, opts?: RequestOptions) => request<T>("GET", path, opts),
  post: <T>(path: string, opts?: RequestOptions) => request<T>("POST", path, opts),
  put: <T>(path: string, opts?: RequestOptions) => request<T>("PUT", path, opts),
  patch: <T>(path: string, opts?: RequestOptions) => request<T>("PATCH", path, opts),
  delete: <T>(path: string, opts?: RequestOptions) => request<T>("DELETE", path, opts),
};
