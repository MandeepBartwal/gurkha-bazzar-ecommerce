import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { cartService } from "@/api/services";
import { getToken } from "@/api/client";
import type { Product } from "@/data/products";
import type { CartItemResponse } from "@/api/types";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface CartItem {
  product: Product;
  quantity: number;
  /** Server-side cart item ID (only set when user is logged in) */
  cartItemId?: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, qty: number) => void;
  clearCart: () => void;
  coupon: string | null;
  discount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  loading: boolean;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "shophub_cart";
const TAX_RATE = 0.08;

/** Hard-coded coupon codes for demo purposes */
const COUPONS: Record<string, number> = {
  SAVE10: 10,
  SAVE20: 20,
  WELCOME: 15,
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const loadCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

/**
 * Map server cart item to local CartItem shape.
 * We store a minimal Product from the server data.
 */
const mapServerCartItem = (item: CartItemResponse): CartItem => ({
  product: {
    id: item.productId,
    name: item.productName,
    price: item.unitPrice,
    image: item.productImage ?? "/placeholder.svg",
    category: "",
    rating: 0,
    reviews: 0,
  },
  quantity: item.quantity,
  cartItemId: item.id,
});

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Persist to localStorage whenever items change
  useEffect(() => saveCart(items), [items]);

  /**
   * Fetch cart from server when user is logged in.
   * Falls back to localStorage for guest users.
   */
  const refreshCart = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      setLoading(true);
      const response = await cartService.getMyCart();
      if (response.success && response.data) {
        const serverItems = response.data.cartItems.map(mapServerCartItem);
        setItems(serverItems);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback((product: Product, qty = 1) => {
    // Optimistic local update first
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i,
        );
      }
      return [...prev, { product, quantity: qty }];
    });

    // Fire-and-forget server sync when logged in
    const token = getToken();
    if (token) {
      cartService.addToCart({ productId: product.id, quantity: qty }).catch(console.error);
    }
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      // Remove from server if we have a cart item ID
      if (item?.cartItemId) {
        cartService.removeFromCart(item.cartItemId).catch(console.error);
      } else if (getToken()) {
        cartService.removeProductFromCart(productId).catch(console.error);
      }
      return prev.filter((i) => i.product.id !== productId);
    });
  }, []);

  const updateQuantity = useCallback((productId: number, qty: number) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i)),
    );
    // Re-add with correct quantity on server
    if (getToken()) {
      cartService.addToCart({ productId, quantity: qty }).catch(console.error);
    }
  }, []);

  const handleClearCart = useCallback(() => {
    setItems([]);
    setCoupon(null);
    if (getToken()) {
      cartService.clearCart().catch(console.error);
    }
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const discount = coupon ? (subtotal * (COUPONS[coupon] ?? 0)) / 100 : 0;

  const applyCoupon = useCallback((code: string): boolean => {
    const upper = code.toUpperCase().trim();
    if (COUPONS[upper] !== undefined) {
      setCoupon(upper);
      return true;
    }
    return false;
  }, []);

  const removeCoupon = useCallback(() => setCoupon(null), []);

  return (
    <CartContext.Provider
      value={{
        items,
        count: items.reduce((n, i) => n + i.quantity, 0),
        subtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart: handleClearCart,
        coupon,
        discount,
        applyCoupon,
        removeCoupon,
        loading,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
};

export { TAX_RATE };
