"use client";

import React, { useState } from "react";
import ProductCard from "../card/ProductCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useValueStore } from "@/providers/useState";
import Pagination from "../common/Pagination";
import { Loader, AlertCircle } from "lucide-react";

interface Pagination {
  totalPages?: number;
  page?: number;
  limit?: number;
}

interface AllProductsProps {
  openFilter?: () => void;
  page: number;
  setPage: Function;
  products: Array<any>;
  pagination: Pagination;
  isLoading?: boolean;
  isError?: boolean;
  isPlaceholderData?: boolean;
}

const AllProducts = ({
  openFilter,
  page,
  setPage,
  products,
  pagination,
  isLoading,
  isError,

}: AllProductsProps) => {
  const { filterValue, setFilterValue } = useValueStore();
  const [sortType, setSortType] = useState(filterValue.sort || "latest");
  const length = products?.length;

  // Loading state
  if (isLoading ) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader className="text-green-600 animate-spin" size={34} />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center py-10 text-center gap-3">
        <AlertCircle size={34} className="text-red-600" />
        <p className="text-red-600 font-medium">
          Something went wrong while fetching products.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Heading + Sort + Mobile Filter */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <h2 className="text-2xl font-bold">All Products</h2>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            className="md:hidden bg-primaryColor text-white px-4 py-2 rounded-lg"
            onClick={openFilter}
          >
            Filter
          </button>

          {/* Sort Select */}
          <Select
            onValueChange={(value) => {
              setSortType(value);
              setFilterValue({ sort: value });
            }}
            defaultValue={sortType}
          >
            <SelectTrigger className="w-40 border-gray-300">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">oldest</SelectItem>
              <SelectItem value="lowestPrice">Lowest Price</SelectItem>
              <SelectItem value="highestPrice">Highest Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      {length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-500">No products available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {products.map((product : any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex w-full justify-center mt-10 items-center">
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={pagination.totalPages || 1}
        />
      </div>
    </div>
  );
};

export default AllProducts;
