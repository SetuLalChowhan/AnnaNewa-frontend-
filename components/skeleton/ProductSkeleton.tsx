import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 sm:h-56 lg:h-64 bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-4 flex flex-col gap-3">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mt-2" />
        <div className="h-4 bg-gray-200 rounded-full w-20" />
      </div>

      {/* Button Skeleton */}
      <div className="p-4">
        <div className="h-10 bg-gray-200 rounded-lg w-full" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
