"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

type SignupFormData = {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  role: "buyer" | "seller";
  password: string;
  confirm_password: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = (data: SignupFormData) => {
    console.log("Signup Data:", data);
    // Here you can send data to backend API
  };

  const password = watch("password");

  return (
    <div className="w-full  bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-8 relative">

      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-4 left-4 text-sm text-primaryColor hover:underline font-medium flex items-center gap-1"
      >
        ← Back to Home
      </Link>

      {/* Title */}
      <h2 className="text-2xl font-bold text-primaryColor text-center mt-6">
        Sign Up
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Create your Annanewa account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500" : "focus:ring-primaryColor"
            }`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

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
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="text"
            placeholder="Phone Number"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.phone ? "border-red-500" : "focus:ring-primaryColor"
            }`}
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Street"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.street ? "border-red-500" : "focus:ring-primaryColor"
            }`}
            {...register("street", { required: "Street is required" })}
          />
          <input
            type="text"
            placeholder="City"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.city ? "border-red-500" : "focus:ring-primaryColor"
            }`}
            {...register("city", { required: "City is required" })}
          />
          <input
            type="text"
            placeholder="State"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.state ? "border-red-500" : "focus:ring-primaryColor"
            }`}
            {...register("state", { required: "State is required" })}
          />
          <input
            type="text"
            placeholder="Zip Code"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.zipCode ? "border-red-500" : "focus:ring-primaryColor"
            }`}
            {...register("zipCode", { required: "Zip Code is required" })}
          />
        </div>

        {/* Role */}
        <div>
          <select
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
            {...register("role", { required: "Please select role" })}
          >
            <option value="">Select Role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
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
            {...register("password", { 
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" }
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
              required: "Confirm password is required",
              validate: value =>
                value === password || "Passwords do not match"
            })}
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>
          )}
        </div>

        {/* Already have account */}
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-primaryColor hover:underline">
            Login
          </Link>
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primaryColor text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Page;
