import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const useAxiosSecure = () => {
  const router = useRouter();
  const axiosRef = useRef(
    axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
  );

  const axiosSecure = axiosRef.current;

  useEffect(() => {
    // Request Interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,   // ✅ return full response
      async (error) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true;
          router.push("/login");
        }

        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";

        return Promise.reject({
          success: false,
          message: errorMessage,
          status: error.response?.status ?? 500,
        });
      }
    );

    // Cleanup
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [router, axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
