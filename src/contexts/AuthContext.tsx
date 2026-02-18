import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  date: string;
  items: { name: string; price: number; quantity: number }[];
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
}

interface AuthContextValue {
  user: UserProfile | null;
  isLoggedIn: boolean;
  orders: Order[];
  login: (email: string, password: string) => boolean;
  signup: (profile: UserProfile, password: string) => boolean;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  changePassword: (oldPass: string, newPass: string) => boolean;
  addOrder: (order: Order) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_USER = "shophub_user";
const STORAGE_PASS = "shophub_pass";
const STORAGE_ORDERS = "shophub_orders";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const loadUser = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const loadOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(STORAGE_ORDERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(loadUser);
  const [orders, setOrders] = useState<Order[]>(loadOrders);

  const login = useCallback((email: string, password: string): boolean => {
    const saved = localStorage.getItem(STORAGE_USER);
    const savedPass = localStorage.getItem(STORAGE_PASS);
    if (!saved || !savedPass) return false;

    const profile: UserProfile = JSON.parse(saved);
    if (profile.email === email && savedPass === password) {
      setUser(profile);
      return true;
    }
    return false;
  }, []);

  const signup = useCallback((profile: UserProfile, password: string): boolean => {
    localStorage.setItem(STORAGE_USER, JSON.stringify(profile));
    localStorage.setItem(STORAGE_PASS, password);
    setUser(profile);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback((partial: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...partial };
      localStorage.setItem(STORAGE_USER, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const changePassword = useCallback((oldPass: string, newPass: string): boolean => {
    const savedPass = localStorage.getItem(STORAGE_PASS);
    if (savedPass !== oldPass) return false;
    localStorage.setItem(STORAGE_PASS, newPass);
    return true;
  }, []);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => {
      const updated = [order, ...prev];
      localStorage.setItem(STORAGE_ORDERS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, orders, login, signup, logout, updateProfile, changePassword, addOrder }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};
