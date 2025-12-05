"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import useMutationClient from "@/hooks/useMutationClient";
import { useValueStore } from "@/providers/useState";
import ErrorHandler from "@/components/common/ErrorHandler";
import { Loader } from "lucide-react";

type ForgotPasswordFormData = {
  email: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();
  const { apiError, setApiError, setEmail } = useValueStore();

  const forgetPasswordMutation = useMutationClient({
    url: `/auth/forgot-password`,
    method: "post",
    isPrivate: false,
    successMessage: "Password reset code sent successfully!",
    redirectTo: "/otp-verify",
    isLogin: true,
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    setEmail(data.email);
    forgetPasswordMutation.mutate({ data: data });
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
      <h2 className="text-2xl font-bold text-primaryColor text-center my-6">
        Forgot Password
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Enter your email address and we will send you a link to reset your
        password.
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
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primaryColor flex justify-center items-center text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {forgetPasswordMutation.isPending ? (
            <Loader className="animate-spin text-white" size={24} />
          ) : (
            "Continue"
          )}
        </button>
      </form>
      {apiError && (
        <ErrorHandler message={apiError} onClose={() => setApiError("")} />
      )}

      {/* Link to login */}
      <p className="text-sm text-center text-gray-500 mt-4">
        Remember your password?{" "}
        <Link href="/login" className="text-primaryColor hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Page;
