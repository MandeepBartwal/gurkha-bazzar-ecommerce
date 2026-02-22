/* ================================================================== */
/*  Cart DTOs                                                         */
/*                                                                    */
/*  Maps to the swagger schema: AddToCartDto and the cart objects      */
/*  returned by GetMyCart / GetCartByUserId.                           */
/* ================================================================== */

/* ----------------------- Request DTOs ----------------------------- */

/** POST /api/Cart/AddToCart */
export interface AddToCartRequest {
    productId: number;
    /** Minimum 1 */
    quantity: number;
}

/* ----------------------- Response DTOs ---------------------------- */

/** Single line item inside a cart */
export interface CartItemResponse {
    id: number;
    productId: number;
    productName: string;
    productImage: string | null;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
    isActive: boolean;
}

/** Full cart returned by GetMyCart */
export interface CartResponse {
    cartItems: CartItemResponse[];
    totalAmount: number;
    totalItems: number;
}

/** GET /api/Cart/GetCartTotal */
export interface CartTotalResponse {
    totalAmount: number;
}

/** GET /api/Cart/GetCartItemCount */
export interface CartCountResponse {
    count: number;
}
