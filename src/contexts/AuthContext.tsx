import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { authService } from "@/api/services";
import { setToken, clearToken, getToken, ApiError } from "@/api/client";
import type { LoginResponse, CurrentUser } from "@/api/types";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImageUrl?: string | null;
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
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: { name?: string; email?: string; phone?: string; address?: string }) => Promise<boolean>;
  fetchCurrentUser: () => Promise<void>;
  addOrder: (order: Order) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_ORDERS = "shophub_orders";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const mapCurrentUserToProfile = (u: CurrentUser): UserProfile => ({
  id: u.id,
  name: u.userName,
  email: u.email,
  phone: u.phone,
  address: u.address ?? "",
  profileImageUrl: u.profileImageUrl,
});

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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>(loadOrders);
  const [loading, setLoading] = useState(false);

  /**
   * On mount: if we have a stored token, try fetching the current user.
   * This keeps the session alive across page reloads.
   */
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchCurrentUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await authService.getCurrentUser();
      if (response.success && response.data) {
        setUser(mapCurrentUserToProfile(response.data));
      }
    } catch (err) {
      // Token expired or invalid — clear it silently
      if (err instanceof ApiError && err.status === 401) {
        clearToken();
        setUser(null);
      }
      console.error("Failed to fetch current user:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authService.login({ email, password });
      if (response.success && response.data) {
        const loginData = response.data as LoginResponse;
        setToken(loginData.token);
        await fetchCurrentUser();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchCurrentUser]);

  const signup = useCallback(async (
    name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authService.register({
        UserName: name,
        Email: email,
        Phone: phone,
        Password: password,
      });
      if (response.success) {
        // Auto-login after registration
        return await login(email, password);
      }
      return false;
    } catch (err) {
      console.error("Registration failed:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [login]);

  const handleLogout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Even if the server call fails, clear the local session
    }
    clearToken();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (
    data: { name?: string; email?: string; phone?: string; address?: string },
  ): Promise<boolean> => {
    if (!user) return false;
    try {
      const response = await authService.updateUser(user.id, {
        UserName: data.name,
        Email: data.email,
        Phone: data.phone,
        Address: data.address,
      });
      if (response.success) {
        await fetchCurrentUser();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Profile update failed:", err);
      return false;
    }
  }, [user, fetchCurrentUser]);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => {
      const updated = [order, ...prev];
      localStorage.setItem(STORAGE_ORDERS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        orders,
        loading,
        login,
        signup,
        logout: handleLogout,
        updateProfile,
        fetchCurrentUser,
        addOrder,
      }}
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
