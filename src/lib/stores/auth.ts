import Cookies from "js-cookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setToken: (token: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      isLoading: true,
      setToken: (token) => {
        set({ token, isAuthenticated: true });
      },
      clearAuth: () => {
        set({ token: null, isAuthenticated: false });
      },
      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "__session",
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const str = Cookies.get(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          Cookies.set(name, JSON.stringify(value), { expires: 1 });
        },
        removeItem: (name) => {
          Cookies.remove(name);
        },
      })),
    },
  ),
);
