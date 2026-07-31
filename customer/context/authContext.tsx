"use client";

import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface StoreContextType {
  url: string;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  logout: () => void;
}

export const StoreContext = createContext<StoreContextType>({
  url: API_URL,
  token: null,
  setToken: () => {},
  loading: true,
  user: null,
  setUser: () => {},
  logout: () => {},
});

const StoreContextProvider = (props: { children: React.ReactNode }) => {
  const url = API_URL;
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push("/login"); // Redirect user after logging out
  };

  useEffect(() => {
    async function initializeAuth() {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);
        try {
          const response = await fetch(`${url}/api/user/me`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (response.ok) {
            const res = await response.json();
            setUser(res?.data || null);
          } else {
            // Token expired or invalid: perform clean logout
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setUser(null);
        }
      }

      setLoading(false);
    }

    initializeAuth();
  }, [url]);

  const contextValue = {
    url,
    token,
    setToken,
    loading,
    user,
    setUser,
    logout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;