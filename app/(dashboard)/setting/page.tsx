"use client";

import ErrorHandler from "@/components/common/ErrorHandler";
import { useAuth } from "@/hooks/useAuth";
import useMutationClient from "@/hooks/useMutationClient";
import { useValueStore } from "@/providers/useState";
import { Loader } from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

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
  const { user } = useAuth();

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isImageModified, setIsImageModified] = useState(false);

  const { apiError, setApiError } = useValueStore();
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setIsImageModified(true);
  };

  const removeImage = () => {
    setProfileImage(null);
    setPreviewImage(null);
    setIsImageModified(false);
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = "";
    }
  };

  const handleAvatarClick = () => {
    hiddenFileInput.current?.click();
  };

  const hasOldImage = user?.profilePicture?.url && !previewImage;

  const updateProfileMutation = useMutationClient({
    url: `/auth/profile`,
    method: "put",
    isPrivate: true,
    successMessage: "Profile updated!",
    invalidateKeys: [["userProfile"]],
    isLogin: true,
  });

  const profileImageMutation = useMutationClient({
    url: `/auth/profile/picture`,
    method: "put",
    isPrivate: true,
    successMessage: "Profile updated!",
    invalidateKeys: [["userProfile"]],
  });

  const handleUploadImage = async () => {
    if (!profileImage) return;

    setIsImageUploading(true);
    const formData = new FormData();
    formData.append("profilePicture", profileImage);

    profileImageMutation.mutate(
      {
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      },
      {
        onSuccess: () => {
          setIsImageModified(false);
          setIsImageUploading(false);
          setProfileImage(null);
          setPreviewImage(null);
          if (hiddenFileInput.current) {
            hiddenFileInput.current.value = "";
          }
        },
        onError: () => {
          setIsImageUploading(false);
        },
      }
    );
  };

  const onSubmit = (data: FormValues) => {
    const payload = {
      name: data.name,
      phone: data.phone,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
      },
    };

    updateProfileMutation.mutate({ data: payload });
  };

  return (
    <div className="text-black!">
      <div className="bg-white w-full rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div
              onClick={handleAvatarClick}
              className="cursor-pointer group relative"
            >
              {isImageUploading && (
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center z-10">
                  <Loader className="animate-spin text-white" size={20} />
                </div>
              )}

              {previewImage ? (
                <img
                  src={previewImage}
                  className="w-20 h-20 rounded-full object-cover border shadow-sm transition group-hover:opacity-90"
                />
              ) : hasOldImage ? (
                <img
                  src={user.profilePicture.url}
                  className="w-20 h-20 rounded-full object-cover border shadow-sm transition group-hover:opacity-90"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primaryColor text-white flex items-center justify-center text-2xl shadow-sm cursor-pointer group-hover:opacity-90">
                  {user?.name?.charAt(0)}
                </div>
              )}

              <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition">
                Change
              </div>
            </div>

            {previewImage && (
              <button
                onClick={removeImage}
                disabled={isImageUploading}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs disabled:opacity-50"
              >
                X
              </button>
            )}

            <input
              type="file"
              accept="image/*"
              ref={hiddenFileInput}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

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
            {isImageModified && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleUploadImage}
                  disabled={isImageUploading}
                  className="text-xs bg-primaryColor text-white px-3 py-1 rounded-md hover:opacity-90 disabled:opacity-50 flex items-center gap-1"
                >
                  {isImageUploading ? (
                    <>
                      <Loader size={12} className="animate-spin" />
                      Uploading
                    </>
                  ) : (
                    "Save Image"
                  )}
                </button>
                <button
                  onClick={removeImage}
                  disabled={isImageUploading}
                  className="text-xs bg-gray-400 text-white px-3 py-1 rounded-md hover:opacity-90 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Input
            label="Full Name"
            register={register("name", { required: true })}
            error={errors.name}
          />

          {/* EMAIL DISABLED */}
          <Input
            label="Email"
            register={register("email")}
            error={errors.email}
            disabled={true}
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
              className="bg-primaryColor text-white w-full py-2 rounded-md font-semibold hover:opacity-90 flex justify-center items-center"
            >
              {updateProfileMutation.isPending ? (
                <Loader className="animate-spin text-white" size={24} />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>

        {apiError && (
          <ErrorHandler message={apiError} onClose={() => setApiError("")} />
        )}
      </div>
    </div>
  );
};

export default page;

type InputProps = {
  label: string;
  register: any;
  error: any;
  disabled?: boolean;
};

const Input = ({ label, register, error, disabled = false }: InputProps) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-primaryColor">
      {label}
    </label>

    <input
      {...register}
      disabled={disabled}
      className={`w-full bg-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primaryColor 
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
      `}
    />

    {error && !disabled && (
      <p className="text-red-500 text-xs mt-1">This field is required</p>
    )}
  </div>
);
