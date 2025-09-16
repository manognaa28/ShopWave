
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types";

type AuthContextType = {
  user: Omit<User, 'password'> | null;
  login: (user: User, callback?: () => void) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("shopwave-user");
      if (storedUser) {
        const { password, ...userToSet } = JSON.parse(storedUser);
        setUser(userToSet);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("shopwave-user");
    }
  }, []);

  const login = useCallback((userData: User, callback?: () => void) => {
    localStorage.setItem("shopwave-user", JSON.stringify(userData));
    const { password, ...userToSet } = userData;
    setUser(userToSet);
    if (callback) {
      callback();
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("shopwave-user");
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push("/");
  }, [router, toast]);

  const isAuthenticated = !!user;

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
