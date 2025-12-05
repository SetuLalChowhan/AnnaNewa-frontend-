"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import useMutationClient from "@/hooks/useMutationClient";
import { Loader } from "lucide-react";
import ErrorHandler from "@/components/common/ErrorHandler";
import { useValueStore } from "@/providers/useState";

type LoginFormData = {
  email: string;
  password: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const { apiError, setApiError, setEmail } = useValueStore();

  const signInMutation = useMutationClient({
    url: `/auth/login`,
    method: "post",
    isPrivate: false,
    successMessage: "Login successful!",
    redirectTo: "/",
    isLogin: true,
    invalidateKeys: [["userProfile"]],
  });

  const onSubmit = (data: LoginFormData) => {
    signInMutation.mutate({ data: data });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-8 relative">
      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-4 left-4 text-sm text-primaryColor hover:underline font-medium flex items-center gap-1"
      >
        ← Back to Home
      </Link>

      {/* Title */}
      <h2 className="text-2xl font-bold text-primaryColor text-center mt-6">
        Login
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Access your Annanewa account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email Address"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500" : "focus:ring-primaryColor"
            }`}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500" : "focus:ring-primaryColor"
            }`}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="flex justify-between items-center text-sm">
          <Link
            href="/forgot-password"
            className="text-primaryColor hover:underline"
          >
            Forgot password?
          </Link>

          <Link href="/register" className="text-primaryColor hover:underline">
            Create account
          </Link>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-primaryColor flex justify-center items-center text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {signInMutation.isPending ? (
            <Loader className="animate-spin text-white" size={24} />
          ) : (
            "Login"
          )}
        </button>

        {apiError && (
          <ErrorHandler message={apiError} onClose={() => setApiError("")} />
        )}
      </form>
    </div>
  );
};

export default Page;
