"use client";

import { useAuth } from "@/hooks/useAuth";
import useClient from "@/hooks/useClient";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
  profilePicture?: {
    url?: string;
  };
  address: Address;
};

type FormValues = {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

const page = () => {
  const { userData: user  ,isLoading} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      street: user?.address?.street,
      city: user?.address?.city,
      state: user?.address?.state,
      zipCode: user?.address?.zipCode,
      country: user?.address?.country,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("✅ SETTINGS FORM DATA:", data);
  };

  const hasProfilePicture = !!user?.profilePicture?.url;

  return (
    <div className=" text-black!">
      <div className="bg-white w-full  rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          {hasProfilePicture ? (
            <img
              src={user.profilePicture?.url}
              alt="Profile"
              className="w-16 h-16 object-cover rounded-full border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primaryColor text-white flex items-center justify-center text-xl">
              {user?.name?.charAt(0)}
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-primaryColor">
              {user?.name}
            </h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <p className="text-xs">
              Role:{" "}
              <span className="font-semibold text-primaryColor">
                {user?.role}
              </span>
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Input
            label="Full Name"
            register={register("name", { required: true })}
            error={errors.name}
          />
          <Input
            label="Email"
            register={register("email", { required: true })}
            error={errors.email}
          />
          <Input
            label="Phone"
            register={register("phone")}
            error={errors.phone}
          />
          <Input
            label="Street"
            register={register("street")}
            error={errors.street}
          />
          <Input label="City" register={register("city")} error={errors.city} />
          <Input
            label="State"
            register={register("state")}
            error={errors.state}
          />
          <Input
            label="Zip Code"
            register={register("zipCode")}
            error={errors.zipCode}
          />
          <Input
            label="Country"
            register={register("country")}
            error={errors.country}
          />

          <div className="col-span-full mt-4">
            <button
              type="submit"
              className="bg-primaryColor text-white w-full py-2 rounded-md font-semibold hover:opacity-90"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;

type InputProps = {
  label: string;
  register: any;
  error: any;
};

const Input = ({ label, register, error }: InputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-primaryColor">
        {label}
      </label>
      <input
        {...register}
        className="w-full border border-none bg-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primaryColor"
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">This field is required</p>
      )}
    </div>
  );
};
