"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

type ResetPasswordFormData = {
  password: string;
  confirm_password: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log("Reset Password Data:", data);
    // Call backend API to reset password here
  };

  const password = watch("password", "");

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
        Reset Password
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Enter your new password below to reset your account password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="New Password"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500" : "focus:ring-primaryColor"
            }`}
            {...register("password", { 
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.confirm_password ? "border-red-500" : "focus:ring-primaryColor"
            }`}
            {...register("confirm_password", { 
              required: "Confirm your password",
              validate: value => value === password || "Passwords do not match"
            })}
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primaryColor text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Reset Password
        </button>
      </form>

      {/* Link to login */}
      <p className="text-sm text-center text-gray-500 mt-4">
        Remembered your password?{" "}
        <Link href="/login" className="text-primaryColor hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Page;
