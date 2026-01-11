"use client";
import { ProductDetails } from "@/types/ProductDetails";
import React, { useEffect, useState, useMemo } from "react";
import { MdScale, MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import useClient from "@/hooks/useClient";
import PlaceBidModal from "./PlaceBidModal";

interface Props {
  product: ProductDetails;
}

const CountdownTimer = ({
  expiryDate,
  onEnd,
}: {
  expiryDate: string;
  onEnd: () => void;
}) => {
  const [timeLeft, setTimeLeft] = useState("");
  const expiry = useMemo(
    () => (expiryDate ? new Date(expiryDate).getTime() : 0),
    [expiryDate]
  );

  useEffect(() => {
    if (!expiry) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = expiry - now;

      if (distance <= 0) {
        setTimeLeft("Time Ended");
        onEnd();
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiry, onEnd]);

  return (
    <div className="text-center p-4 rounded-lg bg-gray-50 border border-gray-100">
      <p className="text-sm text-gray-600 mb-1">Auction Ends In</p>
      <p
        className={`text-lg font-bold tracking-wider ${
          timeLeft === "Time Ended" ? "text-red-500" : "text-primaryColor"
        }`}
      >
        {timeLeft || "Calculating..."}
      </p>
    </div>
  );
};

const ProductBidInfo = ({ product: initialProduct }: Props) => {
  const { data: dynamicData } = useClient({
    queryKey: ["product", initialProduct._id],
    url: `/product/${initialProduct.slug}`,
  });

  const product = dynamicData?.product || initialProduct;
  const [isExpired, setIsExpired] = useState(false);

  const winner = product.bidWinner;
  const winnerDetails = useMemo(
    () => winner && product.bids.find((b: any) => b.user?._id === winner.user),
    [winner, product.bids]
  );

  const currentBestBid = useMemo(
    () =>
      product.bids.length > 0
        ? [...product.bids].sort((a, b) =>
            product.postType === "sell"
              ? b.bidAmount - a.bidAmount
              : a.bidAmount - b.bidAmount
          )[0]
        : null,
    [product.bids, product.postType]
  );

  const showWinner = isExpired || !!winner;
  

  return (
    <div className="space-y-6">
      {/* Product Summary */}
      <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        <h1 className="text-2xl font-semibold text-primaryColor mb-4">
          {product.title}
        </h1>

        <div className="space-y-3 text-gray-600">
          <div className="flex items-center">
            <CgProfile size={20} className=" mr-3 text-primaryColor" />
            <span>
              Created by:{" "}
              <span className="font-medium">{product.user.name}</span>
            </span>
          </div>

          <div className="flex items-center">
            <IoLocationOutline size={20} className=" mr-3 text-primaryColor" />
            <span>
              {product.user.address.city}, {product.user.address.state}
            </span>
          </div>

          <div className="flex items-center">
            <MdOutlinePhone size={20} className=" mr-3 text-primaryColor" />
            <span>{product.user.phone}</span>
          </div>

          {/* Price and Weight Information */}
          <div className="flex items-center">
            <MdScale className="w-4 h-4 mr-3 text-primaryColor" />
            <div className="flex gap-4">
              <span>
                {product.postType === "sell" ? "Asking Price" : "Budget"}:{" "}
                <span className="font-medium">৳ {product.pricePerKg}/kg</span>
              </span>
              <span>
                Weight:{" "}
                <span className="font-medium">{product.totalWeight}kg</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bid Information */}
      <div className="p-6 rounded-xl border border-gray-100 bg-white space-y-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h2 className="text-xl font-semibold text-primaryColor flex items-center gap-2">
          Bid Information
          <span className="flex h-2 w-2 rounded-full bg-primaryColor animate-pulse"></span>
        </h2>

        {/* Countdown Timer */}
        <CountdownTimer
          expiryDate={product.expiryDate || ""}
          onEnd={() => setIsExpired(true)}
        />

        {/* Winner or Current Bid */}
        {showWinner && winnerDetails ? (
          <div className="p-4 rounded-xl bg-primaryColor/5 border border-primaryColor/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 bg-primaryColor/10 rounded-bl-xl text-[10px] font-bold text-primaryColor uppercase tracking-tighter">
              Winner
            </div>
            <h3 className="font-semibold text-primaryColor mb-2">
              Winner Announced
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Winner:</span>{" "}
                {winnerDetails.user?.name ?? "N/A"}
              </p>
              <p>
                <span className="font-medium">Winning Bid:</span> ৳{" "}
                {winnerDetails.bidAmount ?? "N/A"}
              </p>
              <p>
                <span className="font-medium">Accepted At:</span>{" "}
                {winner?.acceptedAt
                  ? new Date(winner.acceptedAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Current Best Bid */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h3 className="font-semibold text-primaryColor mb-2 text-lg">
                {product.postType === "sell"
                  ? "Current Highest Bid"
                  : "Current Lowest Offer"}
              </h3>
              {currentBestBid ? (
                <div className="space-y-1 text-base text-gray-600">
                  <p>
                    <span className="font-medium">Bidder:</span>{" "}
                    {currentBestBid.user?.name ?? "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Amount:</span> ৳{" "}
                    {currentBestBid.bidAmount ?? "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Bid Time:</span>{" "}
                    {currentBestBid.bidAt
                      ? new Date(currentBestBid.bidAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">
                  No bids yet. Be the first to bid!
                </p>
              )}
            </div>

            {/* Place Bid Button */}
            {!isExpired && (
              <PlaceBidModal
                productId={product._id}
                minBid={
                  currentBestBid ? currentBestBid.bidAmount : product.pricePerKg
                }
                postType={product.postType}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductBidInfo;
