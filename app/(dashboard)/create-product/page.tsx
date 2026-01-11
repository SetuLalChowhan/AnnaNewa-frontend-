"use client";
import React, { useState, useEffect, FC, ChangeEvent } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { X, Upload, Calendar, Loader } from "lucide-react";
import useMutationClient from "@/hooks/useMutationClient";
import useClient from "@/hooks/useClient";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useValueStore } from "@/providers/useState";
import ErrorHandler from "@/components/common/ErrorHandler";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// Types
interface LocationData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Category {
  _id: string;
  name: string;
}

interface ProductFormData {
  title: string;
  description: string;
  pricePerKg: string;
  totalWeight: string;
  category: string;
  expiryDate: string;
  postType: "sell" | "buy";
  location: LocationData;
  images: File[];
}

interface CalendarInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const PRIMARY_COLOR = "#10b981";

const CalendarInput: FC<CalendarInputProps> = ({ value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    value ? new Date(value) : new Date()
  );

  const getDaysInMonth = (date: Date): number =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date: Date): number =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = (): void =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );

  const handleNextMonth = (): void =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );

  const handleSelectDate = (day: number): void => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const formattedDate = selectedDate.toISOString().split("T")[0];
    onChange(formattedDate);
    setIsOpen(false);
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days: (number | null)[] = Array(firstDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formattedValue = value
    ? new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="relative">
      <div
        className="w-full px-3 py-2.5 border rounded-md flex items-center justify-between cursor-pointer hover:border-gray-300 transition"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: isOpen ? `${PRIMARY_COLOR}05` : "white",
          borderColor: error ? "#ef4444" : "#d1d5db",
        }}
      >
        <span className={formattedValue ? "text-gray-800" : "text-gray-400"}>
          {formattedValue || "Select expiry date"}
        </span>
        <Calendar className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3 w-full max-w-xs">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-gray-100 rounded transition text-sm"
            >
              ←
            </button>
            <h3 className="font-medium text-gray-800 text-sm">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-gray-100 rounded transition text-sm"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
              <div
                key={`${day}-${idx}`}
                className="text-center text-xs text-gray-500 font-medium"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 mb-3">
            {days.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} className="p-1" />;

              const dateForDay = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                day
              );
              dateForDay.setHours(0, 0, 0, 0);

              const isCurrentDay = dateForDay.getTime() === today.getTime();
              const isSelectedDay =
                value ===
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day
                )
                  .toISOString()
                  .split("T")[0];
              const isDisabled = dateForDay < today;

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  onClick={() => !isDisabled && handleSelectDate(day)}
                  disabled={isDisabled}
                  className={`p-1.5 rounded text-xs transition ${
                    isDisabled
                      ? "text-gray-300 cursor-not-allowed"
                      : isSelectedDay
                      ? "text-white"
                      : isCurrentDay
                      ? "text-gray-800 border"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  style={
                    isSelectedDay
                      ? { backgroundColor: PRIMARY_COLOR }
                      : isCurrentDay
                      ? { borderColor: PRIMARY_COLOR }
                      : {}
                  }
                >
                  {day}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full px-3 py-1.5 bg-gray-50 text-gray-700 rounded text-sm hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

const ProductForm: FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { apiError, setApiError } = useValueStore();

  const { data: categoryData } = useClient({
    queryKey: ["categories"],
    url: "/categories",
  });

  const categories = categoryData?.categories || [];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      pricePerKg: "",
      totalWeight: "",
      category: "",
      expiryDate: "",
      postType: "sell",
      location: {
        address: "",
        city: "",
        state: "",
        zipCode: "",
      },
      images: [],
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    if (images.length + files.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
    }

    setError("");
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number): void => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const createProduct = useMutationClient({
    url: `/product`,
    method: "post",
    isPrivate: true,
    successMessage: "Product created!",
    invalidateKeys: [["products"]],
    resetFunction: reset,
    setImages: setImages,
  });

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      if (images.length === 0) {
        setError("Please upload at least one image");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", data.title.trim());
      formData.append("description", data.description.trim());
      formData.append("pricePerKg", data.pricePerKg);
      formData.append("totalWeight", data.totalWeight);
      formData.append("category", data.category);
      formData.append("expiryDate", data.expiryDate);
      formData.append("postType", data.postType);
      formData.append(
        "location",
        JSON.stringify({
          address: data.location.address.trim(),
          city: data.location.city.trim(),
          state: data.location.state.trim(),
          zipCode: data.location.zipCode.trim(),
        })
      );

      images.forEach((file) => {
        formData.append("images", file);
      });

      createProduct.mutate({
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("❌ Submission Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" text-black ">
      <div className="">
        <div className="">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              List a Product
            </h1>
            <p className="text-gray-600 text-sm">
              Create a new product listing for your farm
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 rounded border border-red-200">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Product Title *
              </label>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "Title is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                  maxLength: { value: 100, message: "Maximum 100 characters" },
                }}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter product title"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-emerald-500"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description *
              </label>

              <Controller
                name="description"
                control={control}
                rules={{
                  required: "Description is required",
                  minLength: { value: 10, message: "Minimum 10 characters" },
                  maxLength: { value: 500, message: "Maximum 500 characters" },
                }}
                render={({ field }) => (
                  <>
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Describe your product in detail..."
                      className="bg-white h-48  "
                    />

                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            {/* Price and Weight */}
            <div className="grid grid-cols-2 gap-4 mt-24">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price per KG (₹) *
                </label>
                <Controller
                  name="pricePerKg"
                  control={control}
                  rules={{
                    required: "Price is required",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Invalid price format",
                    },
                    validate: (value) =>
                      parseFloat(value) > 0 || "Price must be greater than 0",
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="number"
                        placeholder="Enter price per KG"
                        step="0.01"
                        min="0"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-emerald-500"
                      />
                      {errors.pricePerKg && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.pricePerKg.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Total Weight (KG) *
                </label>
                <Controller
                  name="totalWeight"
                  control={control}
                  rules={{
                    required: "Weight is required",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Invalid weight format",
                    },
                    validate: (value) =>
                      parseFloat(value) > 0 || "Weight must be greater than 0",
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="number"
                        placeholder="Enter total weight"
                        step="0.01"
                        min="0"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-emerald-500"
                      />
                      {errors.totalWeight && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.totalWeight.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            {/* Category and Expiry */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category *
                </label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <>
                      <select
                        {...field}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-emerald-500"
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {categories.map((cat: Category) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.category.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Expiry Date *
                </label>
                <Controller
                  name="expiryDate"
                  control={control}
                  rules={{
                    required: "Expiry date is required",
                    validate: (value: string) => {
                      if (!value) return "Expiry date is required";
                      const expiry = new Date(value);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      expiry.setHours(0, 0, 0, 0);
                      return expiry > today || "Must be in the future";
                    },
                  }}
                  render={({ field }) => (
                    <CalendarInput
                      value={field.value || ""}
                      onChange={field.onChange}
                      error={errors.expiryDate?.message}
                    />
                  )}
                />
              </div>
            </div>

            {/* Post Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Type *
              </label>
              <Controller
                name="postType"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-3">
                    <label
                      className={`flex-1 px-3 py-2 border rounded-md cursor-pointer transition text-sm text-center ${
                        field.value === "sell"
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input
                        {...field}
                        type="radio"
                        value="sell"
                        checked={field.value === "sell"}
                        className="hidden"
                      />
                      Sell
                    </label>
                    <label
                      className={`flex-1 px-3 py-2 border rounded-md cursor-pointer transition text-sm text-center ${
                        field.value === "buy"
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input
                        {...field}
                        type="radio"
                        value="buy"
                        className="hidden"
                      />
                      Buy
                    </label>
                  </div>
                )}
              />
            </div>

            {/* Location */}
            <div className="space-y-4 p-4  rounded-lg ">
              <h3 className="font-medium text-gray-800 text-sm">
                Location Details
              </h3>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Address *
                </label>
                <Controller
                  name="location.address"
                  control={control}
                  rules={{
                    required: "Address is required",
                    minLength: {
                      value: 5,
                      message: "Minimum 5 characters",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter your address"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-emerald-500"
                      />
                      {errors.location?.address && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.location.address.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    City *
                  </label>
                  <Controller
                    name="location.city"
                    control={control}
                    rules={{
                      required: "City is required",
                      minLength: {
                        value: 2,
                        message: "Minimum 2 characters",
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter your city"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-emerald-500"
                        />
                        {errors.location?.city && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.location.city.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    State *
                  </label>
                  <Controller
                    name="location.state"
                    control={control}
                    rules={{
                      required: "State is required",
                      minLength: {
                        value: 2,
                        message: "Minimum 2 characters",
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter your state"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-emerald-500"
                        />
                        {errors.location?.state && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.location.state.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Zip Code *
                </label>
                <Controller
                  name="location.zipCode"
                  control={control}
                  rules={{
                    required: "Zip Code is required",
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        placeholder=" Enter your zip code"
                        maxLength={6}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-emerald-500"
                      />
                      {errors.location?.zipCode && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.location.zipCode.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images *
              </label>
              <div className="border border-dashed border-gray-300 rounded-md p-6 text-center hover:border-gray-400 transition cursor-pointer bg-white">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-input"
                />
                <label htmlFor="image-input" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-700 text-sm font-medium">
                    Click to upload images
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Max 5 images • 5MB each
                  </p>
                </label>
              </div>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Images ({images.length}/5)
                  </h4>
                  <button
                    type="button"
                    onClick={() => setImages([])}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {images.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="relative group"
                    >
                      <div className="aspect-square overflow-hidden rounded border border-gray-200">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:shadow transition"
                      >
                        <X className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || createProduct.isPending}
              className="w-full py-2.5 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {createProduct.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  Creating...
                </span>
              ) : (
                "Create Listing"
              )}
            </button>

            {apiError && (
              <ErrorHandler
                message={apiError}
                onClose={() => setApiError("")}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
