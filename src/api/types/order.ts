/* ================================================================== */
/*  Order DTOs                                                        */
/*                                                                    */
/*  Maps to swagger schemas: OrderDTO, OrderItemDTO, OrderListDTO     */
/*  and the order objects returned by GetOrderById / OrderList.        */
/* ================================================================== */

/* ----------------------- Request DTOs ----------------------------- */

/** Single line item when placing an order */
export interface OrderItemRequest {
    id?: number;
    productId: number;
    productSize?: string | null;
    productColour?: string | null;
    quantity: number;
    unitPrice?: number | null;
}

/** POST /api/Order/PlaceOrder & PATCH UpdateOrder */
export interface PlaceOrderRequest {
    isPlacedByAdmin?: boolean;
    pradeshId?: number;
    orderNumber?: string | null;
    deliveryCharge?: number | null;
    deliveryAddress?: string | null;
    branch?: string | null;
    courierPartner?: string | null;
    deliveryType?: string | null;
    deliveryInstuctions?: string | null;   // note: backend typo kept as-is
    remark?: string | null;
    totalAmount?: number | null;
    orderItems?: OrderItemRequest[] | null;
}

/** POST /api/Order/OrderList (filter + pagination) */
export interface OrderListRequest {
    userId?: number | null;
    vendorId?: number | null;
    from?: string | null;    // ISO date-time
    to?: string | null;
    statusId?: number | null;
    page: number;
    pageSize: number;
}

/* ----------------------- Response DTOs ---------------------------- */

/** Order line item inside an order response */
export interface OrderItemResponse {
    id: number;
    productId: number;
    productName: string;
    productImage: string | null;
    productSize: string | null;
    productColour: string | null;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

/** Single order returned by GetOrderById / OrderList */
export interface OrderResponse {
    id: number;
    orderNumber: string;
    userId: number;
    userName: string | null;
    orderDate: string;
    statusId: number;
    statusName: string;
    deliveryAddress: string | null;
    deliveryCharge: number;
    totalAmount: number;
    remark: string | null;
    orderItems: OrderItemResponse[];
}

/** Tracking step returned by GET /api/Order/OrderTracking */
export interface OrderTrackingStep {
    statusId: number;
    statusName: string;
    updatedAt: string;
    isCurrent: boolean;
}

/** GET /api/Order/GetOrderStatuses */
export interface OrderStatus {
    id: number;
    name: string;
}

/** GET /api/Order/PaymentOptions */
export interface PaymentOption {
    id: number;
    name: string;
    description: string | null;
}
