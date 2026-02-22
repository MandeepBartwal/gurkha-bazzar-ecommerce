/* ================================================================== */
/*  API barrel export                                                  */
/*                                                                    */
/*  Single entry point for consuming the API layer:                   */
/*    import { api, authService, ApiProduct } from "@/api";           */
/* ================================================================== */

export { api, getToken, setToken, clearToken, ApiError } from "./client";
export * from "./types";
export * from "./services";
