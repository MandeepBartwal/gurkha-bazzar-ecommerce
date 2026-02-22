/* ================================================================== */
/*  Auth service — login, register, profile, logout                   */
/*                                                                    */
/*  Each function maps to one API endpoint.                           */
/*  Return types use the DTOs from `@/api/types/auth`.                */
/* ================================================================== */

import { api } from "../client";
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  CustomerCreateRequest,
  CurrentUser,
  UserDetail,
  Role,
} from "../types";

/* ------------------------------------------------------------------ */
/*  Login & Register                                                   */
/* ------------------------------------------------------------------ */

/** POST /api/User/Login */
export const login = (credentials: LoginRequest) =>
  api.post<ApiResponse<LoginResponse>>("/User/Login", { body: credentials });

/**
 * POST /api/User/Register
 *
 * Accepts multipart form data because the backend allows
 * an optional ProfileImage file upload during registration.
 */
export const register = (data: RegisterRequest) => {
  const formData = new FormData();
  formData.append("UserName", data.UserName);
  formData.append("Email", data.Email);
  formData.append("Password", data.Password);
  formData.append("Phone", data.Phone);
  if (data.RoleId !== undefined) formData.append("RoleId", String(data.RoleId));
  if (data.ProfileImage) formData.append("ProfileImage", data.ProfileImage);

  return api.post<ApiResponse>("/User/Register", { body: formData, isFormData: true });
};

/** POST /api/User/RegisterCustomer */
export const registerCustomer = (data: CustomerCreateRequest) =>
  api.post<ApiResponse>("/User/RegisterCustomer", { body: data });

/** POST /api/User/UpdateCustomer */
export const updateCustomer = (data: CustomerCreateRequest) =>
  api.post<ApiResponse>("/User/UpdateCustomer", { body: data });

/* ------------------------------------------------------------------ */
/*  Current user                                                       */
/* ------------------------------------------------------------------ */

/** GET /api/User/GetCurrentUser — requires valid Bearer token */
export const getCurrentUser = () =>
  api.get<ApiResponse<CurrentUser>>("/User/GetCurrentUser");

/** PUT /api/User/UpdateUser/{id} — multipart */
export const updateUser = (
  id: number,
  data: { UserName?: string; Phone?: string; Email?: string; Address?: string; ProfileImage?: File; IsActive?: boolean },
) => {
  const formData = new FormData();
  if (data.UserName) formData.append("UserName", data.UserName);
  if (data.Phone) formData.append("Phone", data.Phone);
  if (data.Email) formData.append("Email", data.Email);
  if (data.Address) formData.append("Address", data.Address);
  if (data.ProfileImage) formData.append("ProfileImage", data.ProfileImage);
  if (data.IsActive !== undefined) formData.append("IsActive", String(data.IsActive));

  return api.put<ApiResponse>(`/User/UpdateUser/${id}`, { body: formData, isFormData: true });
};

/* ------------------------------------------------------------------ */
/*  Session                                                            */
/* ------------------------------------------------------------------ */

/** POST /api/User/Logout */
export const logout = () =>
  api.post<ApiResponse>("/User/Logout");

/* ------------------------------------------------------------------ */
/*  Lookups                                                            */
/* ------------------------------------------------------------------ */

/** GET /api/User/GetActiveRoles */
export const getActiveRoles = () =>
  api.get<ApiResponse<Role[]>>("/User/GetActiveRoles");

/** GET /api/User/ActivePradeshList */
export const getActivePradeshList = () =>
  api.get<ApiResponse>("/User/ActivePradeshList");
