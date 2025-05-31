"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import Cookies from "js-cookie";

export const AuthInitializer = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      clearAuth();
    }
  }, [clearAuth]);

  return null;
};

export default AuthInitializer;
