/* ================================================================== */
/*  Auth & User DTOs                                                  */
/*                                                                    */
/*  Maps 1-to-1 with the swagger schemas: LoginDto, Register form,    */
/*  CustomerCreateDTO, and the user object returned by GetCurrentUser. */
/* ================================================================== */

/* ----------------------- Request DTOs ----------------------------- */

/** POST /api/User/Login */
export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

/**
 * POST /api/User/Register
 *
 * Sent as multipart/form-data (supports optional ProfileImage upload).
 * When calling from the frontend we pass a plain object and let
 * the HTTP client build the FormData.
 */
export interface RegisterRequest {
    UserName: string;
    Email: string;
    Password: string;
    Phone: string;
    RoleId?: number;
    ProfileImage?: File;
}

/** POST /api/User/RegisterCustomer & UpdateCustomer */
export interface CustomerCreateRequest {
    id?: number | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    pradeshId?: number;
    isActive?: boolean;
    password?: string | null;
}

/* ----------------------- Response DTOs ---------------------------- */

/**
 * Shape returned by POST /api/User/Login on success.
 *
 * The token should be stored and sent as a Bearer header
 * on every subsequent authenticated request.
 */
export interface LoginResponse {
    token: string;
    userId: number;
    userName: string;
    email: string;
    roleId: number;
    roleName: string;
}

/** Shape returned by GET /api/User/GetCurrentUser */
export interface CurrentUser {
    id: number;
    userName: string;
    email: string;
    phone: string;
    address: string | null;
    roleId: number;
    roleName: string;
    profileImageUrl: string | null;
    isActive: boolean;
}

/** Shape returned by GET /api/User/GetUserById/{id} */
export interface UserDetail extends CurrentUser {
    createdDate: string;
    updatedDate: string | null;
}

/** GET /api/User/GetActiveRoles */
export interface Role {
    id: number;
    name: string;
    isActive: boolean;
}
