"use client";

import { ReactNode, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "@/context";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { set } from "react-hook-form";
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  [key: string]: any;
}

interface AuthProviderProps {
  children: ReactNode;
  initialData?: User | null;
}

export const AuthProvider = ({
  children,
  initialData = null,
}: AuthProviderProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(initialData || null);
  const {
    data: userData,
    refetch: userRefetch,
    isLoading,
    isFetching,
  } = useQuery<User>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
          { withCredentials: true },
        );
        const fetchedUser = res.data.user;
        if (fetchedUser) {
          localStorage.setItem("anna_newa_logged_in", "true");
          setUser(fetchedUser);
        }
        return fetchedUser;
      } catch (error) {
        localStorage.removeItem("anna_newa_logged_in");
        setUser(null);
        throw error;
      }
    },
    initialData: initialData || undefined,
    retry: false,
  });

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      queryClient.removeQueries({ queryKey: ["userProfile"] });
      localStorage.removeItem("anna_newa_logged_in");
      router.push("/login");
      setUser(null);
      toast.success("Logout successful");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const contextValue = {
    userData,
    user,
    setUser,
    userRefetch,
    isLoading,
    isFetching,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
