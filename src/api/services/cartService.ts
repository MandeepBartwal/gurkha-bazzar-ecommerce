/* ================================================================== */
/*  Cart service — add, remove, fetch, merge                          */
/*                                                                    */
/*  Each function maps to one API endpoint under /api/Cart.           */
/* ================================================================== */

import { api } from "../client";
import type {
  ApiResponse,
  AddToCartRequest,
  CartResponse,
  CartTotalResponse,
  CartCountResponse,
  CartItemResponse,
} from "../types";

/* ------------------------------------------------------------------ */
/*  Read operations                                                    */
/* ------------------------------------------------------------------ */

/** GET /api/Cart/GetMyCart — requires auth */
export const getMyCart = () =>
  api.get<ApiResponse<CartResponse>>("/Cart/GetMyCart");

/** GET /api/Cart/GetCartByUserId/{userId} — admin use */
export const getCartByUserId = (userId: number) =>
  api.get<ApiResponse<CartResponse>>(`/Cart/GetCartByUserId/${userId}`);

/** GET /api/Cart/GetCartTotal */
export const getCartTotal = () =>
  api.get<ApiResponse<CartTotalResponse>>("/Cart/GetCartTotal");

/** GET /api/Cart/GetCartItemCount */
export const getCartItemCount = () =>
  api.get<ApiResponse<CartCountResponse>>("/Cart/GetCartItemCount");

/** GET /api/Cart/GetInactiveCartItems */
export const getInactiveCartItems = () =>
  api.get<ApiResponse<CartItemResponse[]>>("/Cart/GetInactiveCartItems");

/* ------------------------------------------------------------------ */
/*  Write operations                                                   */
/* ------------------------------------------------------------------ */

/** POST /api/Cart/AddToCart */
export const addToCart = (data: AddToCartRequest) =>
  api.post<ApiResponse>("/Cart/AddToCart", { body: data });

/** DELETE /api/Cart/RemoveFromCart/{cartItemId} */
export const removeFromCart = (cartItemId: number) =>
  api.delete<ApiResponse>(`/Cart/RemoveFromCart/${cartItemId}`);

/** DELETE /api/Cart/RemoveProductFromCart/{productId} */
export const removeProductFromCart = (productId: number) =>
  api.delete<ApiResponse>(`/Cart/RemoveProductFromCart/${productId}`);

/** DELETE /api/Cart/ClearCart */
export const clearCart = () =>
  api.delete<ApiResponse>("/Cart/ClearCart");

/** POST /api/Cart/MergeCarts/{targetUserId} */
export const mergeCarts = (targetUserId: number) =>
  api.post<ApiResponse>(`/Cart/MergeCarts/${targetUserId}`);
