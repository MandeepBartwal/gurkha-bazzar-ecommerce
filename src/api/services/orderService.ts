/* ================================================================== */
/*  Order service — place, list, track, cancel                        */
/*                                                                    */
/*  Each function maps to one API endpoint under /api/Order.          */
/* ================================================================== */

import { api } from "../client";
import type {
  ApiResponse,
  PaginatedResponse,
  PlaceOrderRequest,
  OrderListRequest,
  OrderResponse,
  OrderTrackingStep,
  OrderStatus,
  PaymentOption,
} from "../types";

/* ------------------------------------------------------------------ */
/*  Lookups                                                            */
/* ------------------------------------------------------------------ */

/** GET /api/Order/GetOrderStatuses */
export const getOrderStatuses = () =>
  api.get<ApiResponse<OrderStatus[]>>("/Order/GetOrderStatuses");

/** GET /api/Order/PaymentOptions */
export const getPaymentOptions = () =>
  api.get<ApiResponse<PaymentOption[]>>("/Order/PaymentOptions");

/* ------------------------------------------------------------------ */
/*  Order CRUD                                                         */
/* ------------------------------------------------------------------ */

/** POST /api/Order/PlaceOrder */
export const placeOrder = (data: PlaceOrderRequest) =>
  api.post<ApiResponse<OrderResponse>>("/Order/PlaceOrder", { body: data });

/** PATCH /api/Order/UpdateOrder?orderId={id} */
export const updateOrder = (orderId: number, data: PlaceOrderRequest) =>
  api.patch<ApiResponse>("/Order/UpdateOrder", { params: { orderId }, body: data });

/** POST /api/Order/OrderList — paginated filter query */
export const getOrderList = (filters: OrderListRequest) =>
  api.post<ApiResponse<PaginatedResponse<OrderResponse>>>("/Order/OrderList", { body: filters });

/** GET /api/Order/GetOrderById?orderId={id} */
export const getOrderById = (orderId: number) =>
  api.get<ApiResponse<OrderResponse>>("/Order/GetOrderById", { params: { orderId } });

/* ------------------------------------------------------------------ */
/*  Status & tracking                                                  */
/* ------------------------------------------------------------------ */

/** GET /api/Order/ChangeOrderStatus?orderId={id}&statusId={statusId} */
export const changeOrderStatus = (orderId: number, statusId: number) =>
  api.get<ApiResponse>("/Order/ChangeOrderStatus", { params: { orderId, statusId } });

/** GET /api/Order/CancelOrder?orderId={id} */
export const cancelOrder = (orderId: number) =>
  api.get<ApiResponse>("/Order/CancelOrder", { params: { orderId } });

/** GET /api/Order/OrderTracking?orderId={id} */
export const getOrderTracking = (orderId: number) =>
  api.get<ApiResponse<OrderTrackingStep[]>>("/Order/OrderTracking", { params: { orderId } });

/* ------------------------------------------------------------------ */
/*  Misc                                                               */
/* ------------------------------------------------------------------ */

/** GET /api/Order/IsExistingSKU?sku={sku} */
export const isExistingSKU = (sku: string) =>
  api.get<ApiResponse<boolean>>("/Order/IsExistingSKU", { params: { sku } });

/** POST /api/Order/AssignPradesh?pradeshId={id}&orderId={id} */
export const assignPradesh = (pradeshId: number, orderId: number) =>
  api.post<ApiResponse>("/Order/AssignPradesh", { params: { pradeshId, orderId } });
