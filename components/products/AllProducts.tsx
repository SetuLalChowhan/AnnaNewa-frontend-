"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "../card/ProductCard";
import { dummyProducts } from "@/utils/Data";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useValueStore } from "@/providers/useState";
import Pagination from "../common/Pagination";

interface AllProductsProps {
  openFilter?: () => void;
  page: number;
  setPage: Function;
}

const AllProducts = ({ openFilter, page, setPage }: AllProductsProps) => {
  const { filterValue, setFilterValue } = useValueStore();
  const [sortType, setSortType] = useState(filterValue.sort || "latest");

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
              <SelectItem value="lowestPrice">Lowest Price</SelectItem>
              <SelectItem value="highestPrice">Highest Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {dummyProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className=" flex w-full justify-center mt-10 items-center">
        <Pagination page={page} setPage={setPage} totalPage={10} />
      </div>
    </div>
  );
};

export default AllProducts;
