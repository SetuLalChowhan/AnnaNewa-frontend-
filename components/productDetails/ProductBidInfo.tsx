"use client";
import { ProductDetails } from "@/types/ProductDetails";
import React, { useEffect, useState } from "react";
import { MdLocationOn, MdPhone, MdScale } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

interface Props {
  product: ProductDetails;
}

const ProductBidInfo = ({ product }: Props) => {
  const [timeLeft, setTimeLeft] = useState("");
  const expiry = product.expiryDate ? new Date(product.expiryDate).getTime() : 0;

  useEffect(() => {
    if (!expiry) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = expiry - now;

      if (distance <= 0) {
        setTimeLeft("Time Ended");
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
  }, [expiry]);

  const winner = product.bidWinner;
  const winnerDetails =
    winner && product.bids.find((b) => b.user?._id === winner.user);

  const highestBid =
    product.bids.length > 0
      ? [...product.bids].sort((a, b) => b.amount - a.amount)[0]
      : null;

  const isExpired = timeLeft === "Time Ended";
  const showWinner = isExpired || !!winner;

  return (
    <div className="space-y-6">
      {/* Product Summary */}
      <div className="p-6 rounded-xl border border-gray-100 bg-white">
        <h1 className="text-2xl font-semibold text-primaryColor mb-4">{product.title}</h1>
        
        <div className="space-y-3 text-gray-600">
          <div className="flex items-center">
            <CgProfile size={20} className=" mr-3 text-primaryColor" />
            <span>Created by: <span className="font-medium">{product.user.name}</span></span>
          </div>

          <div className="flex items-center">
            <IoLocationOutline size={20}  className=" mr-3 text-primaryColor" />
            <span>{product.user.address.city}, {product.user.address.state}</span>
          </div>

          <div className="flex items-center">
            <MdOutlinePhone size={20} className=" mr-3 text-primaryColor" />
            <span>{product.user.phone}</span>
          </div>

          {/* Price and Weight Information */}
          <div className="flex items-center">
            <MdScale className="w-4 h-4 mr-3 text-primaryColor" />
            <div className="flex gap-4">
              <span>Price: <span className="font-medium">৳ {product.pricePerKg}/kg</span></span>
              <span>Weight: <span className="font-medium">{product.totalWeight}kg</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Bid Information */}
      <div className="p-6 rounded-xl border border-gray-100 bg-white space-y-6">
        <h2 className="text-xl font-semibold text-primaryColor">Bid Information</h2>

        {/* Countdown Timer */}
        <div className="text-center p-4 rounded-lg bg-gray-50">
          <p className="text-sm text-gray-600 mb-1">Auction Ends In</p>
          <p className={`text-lg font-semibold ${
            timeLeft === "Time Ended" ? "text-red-500" : "text-primaryColor"
          }`}>
            {timeLeft}
          </p>
        </div>

        {/* Winner or Current Bid */}
        {showWinner && winnerDetails ? (
          <div className="p-4 rounded-lg bg-primaryColor/5 border border-primaryColor/20">
            <h3 className="font-semibold text-primaryColor mb-2">Winner Announced</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Winner:</span> {winnerDetails.user?.name ?? "N/A"}</p>
              <p><span className="font-medium">Winning Bid:</span> ৳ {winnerDetails.amount ?? "N/A"}</p>
              <p><span className="font-medium">Accepted At:</span> {winner?.acceptedAt ? new Date(winner.acceptedAt).toLocaleString() : "N/A"}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Current Highest Bid */}
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-primaryColor mb-2 text-lg">Current Highest Bid</h3>
              {highestBid ? (
                <div className="space-y-1 text-base text-gray-600">
                  <p><span className="font-medium">Bidder:</span> {highestBid.user?.name ?? "N/A"}</p>
                  <p><span className="font-medium">Amount:</span> ৳ {highestBid.amount ?? "N/A"}</p>
                  <p><span className="font-medium">Bid Time:</span> {highestBid.bidAt ? new Date(highestBid.bidAt).toLocaleString() : "N/A"}</p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No bids yet</p>
              )}
            </div>

            {/* Place Bid Button */}
            {!isExpired && (
              <button className="w-full py-3 bg-primaryColor text-white rounded-lg font-medium hover:bg-primaryColor/90 transition-colors">
                Place Your Bid
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductBidInfo;