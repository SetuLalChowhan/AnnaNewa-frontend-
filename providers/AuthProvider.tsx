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
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
      { withCredentials: true }
    );
    setUser(res.data.user);
    return res.data.user;
  },
  initialData : initialData || undefined,
  refetchOnMount: false,     // 🔥 ADD THIS
  refetchOnWindowFocus: false, // 🔥 ADD THIS
  staleTime: Infinity,         // 🔥 ADD THIS
});

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      queryClient.removeQueries({ queryKey: ["userProfile"] });
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
