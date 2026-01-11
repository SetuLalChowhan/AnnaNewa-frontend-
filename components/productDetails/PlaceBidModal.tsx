"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useMutationClient from "@/hooks/useMutationClient";
import { useValueStore } from "@/providers/useState";
import ErrorHandler from "@/components/common/ErrorHandler";
import { Title18 } from "../common/Title";
import { Loader } from "lucide-react";

interface BidFormData {
  bidAmount: number;
  paymentMethod: string;
  deliveryAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface PlaceBidModalProps {
  productId: string;
  minBid: number;
  postType: "buy" | "sell";
}

const PlaceBidModal = ({ productId, minBid, postType }: PlaceBidModalProps) => {
  const { apiError, setApiError } = useValueStore();

  const isSell = postType === "sell";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BidFormData>({
    defaultValues: {
      bidAmount: isSell ? minBid + 1 : Math.max(0, minBid - 1),
      paymentMethod: "Cash on Delivery",
      deliveryAddress: {
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "Bangladesh",
      },
    },
  });

  const placeBid = useMutationClient({
    url: `/product/${productId}/bid`,
    method: "post",
    isPrivate: true,
    successMessage: "Bid placed successfully!",
    invalidateKeys: [["product", productId], ["products"]],
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data: BidFormData) => {
    placeBid.mutate({ data });
  };

  return (
    <Dialog onOpenChange={(open) => !open && setApiError("")}>
      <DialogTrigger asChild>
        <button className="w-full py-3 bg-primaryColor text-white rounded-lg font-medium hover:bg-primaryColor/90 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]">
          {isSell ? "Place Your Bid" : "Submit Your Offer"}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none rounded-2xl shadow-2xl bg-white">
        <DialogHeader className="p-6 bg-primaryColor text-white">
          <DialogTitle className="text-2xl font-bold">
            {isSell ? "Place Your Bid" : "Submit Your Offer"}
          </DialogTitle>
          <p className="text-white/80 text-sm mt-1">
            {isSell
              ? "Fill in the details below to bid higher on this product"
              : "Fill in the details below to offer a lower price for this request"}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* API Error Message */}
          <ErrorHandler message={apiError} onClose={() => setApiError("")} />

          {/* Bid Amount */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              {isSell ? "Bid Amount (৳)" : "Offer Amount (৳)"}
            </label>
            <Controller
              name="bidAmount"
              control={control}
              rules={{
                required: "Amount is required",
                validate: (value) => {
                  if (isSell) {
                    return (
                      value > minBid || `Bid must be higher than ৳ ${minBid}`
                    );
                  } else {
                    return (
                      value < minBid || `Offer must be lower than ৳ ${minBid}`
                    );
                  }
                },
              }}
              render={({ field }) => (
                <div className="relative group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primaryColor transition-colors">
                    ৳
                  </span>
                  <input
                    {...field}
                    type="number"
                    className={`w-full pl-8 pr-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                      errors.bidAmount
                        ? "border-red-500 bg-red-50"
                        : "border-transparent focus:border-primaryColor focus:bg-white"
                    }`}
                    placeholder="Enter amount"
                  />
                  {errors.bidAmount && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {errors.bidAmount.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Payment Method
            </label>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-3">
                  {["Cash on Delivery", "Online Payment"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => field.onChange(method)}
                      className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-300 ${
                        field.value === method
                          ? "border-primaryColor bg-primaryColor/5 text-primaryColor shadow-inner"
                          : "border-gray-100 bg-gray-50 text-gray-500 hover:border-primaryColor/30"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              )}
            />
          </div>

          {/* Delivery Address Section */}
          <div className="space-y-4 pt-2">
            <Title18 className="text-gray-900 border-b pb-2">
              {isSell ? "Delivery Address" : "Pickup Address"}
            </Title18>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Street Address
                </label>
                <Controller
                  name="deliveryAddress.address"
                  control={control}
                  rules={{ required: "Address is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      className={`w-full px-4 py-2.5 bg-gray-50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                        errors.deliveryAddress?.address
                          ? "border-red-500 bg-red-50"
                          : "border-transparent focus:border-primaryColor focus:bg-white"
                      }`}
                      placeholder="Street name, house no."
                    />
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    City
                  </label>
                  <Controller
                    name="deliveryAddress.city"
                    control={control}
                    rules={{ required: "City is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={`w-full px-4 py-2.5 bg-gray-50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                          errors.deliveryAddress?.city
                            ? "border-red-500 bg-red-50"
                            : "border-transparent focus:border-primaryColor focus:bg-white"
                        }`}
                        placeholder="City"
                      />
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    State
                  </label>
                  <Controller
                    name="deliveryAddress.state"
                    control={control}
                    rules={{ required: "State is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={`w-full px-4 py-2.5 bg-gray-50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                          errors.deliveryAddress?.state
                            ? "border-red-500 bg-red-50"
                            : "border-transparent focus:border-primaryColor focus:bg-white"
                        }`}
                        placeholder="State"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Zip Code
                  </label>
                  <Controller
                    name="deliveryAddress.zipCode"
                    control={control}
                    rules={{ required: "Zip Code is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={`w-full px-4 py-2.5 bg-gray-50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                          errors.deliveryAddress?.zipCode
                            ? "border-red-500 bg-red-50"
                            : "border-transparent focus:border-primaryColor focus:bg-white"
                        }`}
                        placeholder="Zip"
                      />
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Country
                  </label>
                  <Controller
                    name="deliveryAddress.country"
                    control={control}
                    rules={{ required: "Country is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={`w-full px-4 py-2.5 bg-gray-50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                          errors.deliveryAddress?.country
                            ? "border-red-500 bg-red-50"
                            : "border-transparent focus:border-primaryColor focus:bg-white"
                        }`}
                        placeholder="Country"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={placeBid.isPending}
            className="w-full py-4 bg-primaryColor text-white rounded-xl font-bold shadow-lg hover:bg-primaryColor/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {placeBid.isPending ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                {isSell ? "Placing Bid..." : "Submitting Offer..."}
              </>
            ) : isSell ? (
              "Confirm Your Bid"
            ) : (
              "Confirm Your Offer"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceBidModal;
