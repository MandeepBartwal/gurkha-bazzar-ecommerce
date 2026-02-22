/* ================================================================== */
/*  Common API response wrappers & shared types                       */
/*                                                                    */
/*  Every API response from the backend follows a consistent shape.   */
/*  These generic wrappers let us handle success/error uniformly      */
/*  across all service modules.                                       */
/* ================================================================== */

/**
 * Standard envelope returned by the AlphaLogistics API.
 *
 * The backend wraps every successful response in this shape.
 * `data` holds the actual payload; `message` provides a human-readable
 * status string (e.g. "Success", "Product created").
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data: T;
}

/**
 * Paginated list response.
 *
 * Endpoints that return collections (products, orders, vendors)
 * include pagination metadata alongside the item array.
 */
export interface PaginatedResponse<T> {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

/**
 * Lightweight ID + label pair used in dropdowns
 * (e.g. order statuses, payment options, roles).
 */
export interface LookupItem {
    id: number;
    name: string;
}
