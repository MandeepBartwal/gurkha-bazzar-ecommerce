import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Product } from "@/data/products";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  /** Number of distinct products in the cart */
  count: number;
  /** Sum of (price × quantity) for every item */
  subtotal: number;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, qty: number) => void;
  clearCart: () => void;
  /** Applied coupon code (null if none) */
  coupon: string | null;
  /** Discount amount derived from the coupon */
  discount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "shophub_cart";
const TAX_RATE = 0.08; // 8 %

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

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [coupon, setCoupon] = useState<string | null>(null);

  // Persist to localStorage whenever items change
  useEffect(() => saveCart(items), [items]);

  const addToCart = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i,
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, qty: number) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i)),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCoupon(null);
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const discount = coupon ? (subtotal * (COUPONS[coupon] ?? 0)) / 100 : 0;

  const applyCoupon = useCallback(
    (code: string): boolean => {
      const upper = code.toUpperCase().trim();
      if (COUPONS[upper] !== undefined) {
        setCoupon(upper);
        return true;
      }
      return false;
    },
    [],
  );

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
        clearCart,
        coupon,
        discount,
        applyCoupon,
        removeCoupon,
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
