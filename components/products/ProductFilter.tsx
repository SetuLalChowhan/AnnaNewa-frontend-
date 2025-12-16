"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useValueStore } from "@/providers/useState";
import useClient from "@/hooks/useClient";

interface FilterProps {
  closeFilter?: () => void;
}

const ProductFilter = ({ closeFilter }: FilterProps) => {
  const { filterValue, setFilterValue } = useValueStore();

  // Single category toggle
  const handleCategoryChange = (cat: any) => {
    const newCategory = filterValue.category_id === cat._id ? "" : cat._id;
    setFilterValue({ category_id: newCategory });
  };
  const categories = useClient({
    queryKey: ["categories"],
    url: "/categories",
    isPrivate: false,
  });

  // Post type change
  const handlePostTypeChange = (value: string) => {
    setFilterValue({ postType: value });
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-md border border-gray-200 h-auto md:h-fit w-full flex flex-col relative">
      {/* CLOSE BUTTON TOP RIGHT */}
      {closeFilter && (
        <button
          onClick={closeFilter}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 font-bold"
        >
          ✕
        </button>
      )}

      <h2 className="text-lg font-semibold mb-6">Filter Products</h2>

      {/* POST TYPE */}
      <div className="mb-6">
        <label className="text-sm font-medium">Post Type</label>

        <Select
          onValueChange={handlePostTypeChange}
          defaultValue={filterValue.postType || "all"}
        >
          <SelectTrigger className="mt-2 w-full border-gray-300">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="sell">Seller Posts</SelectItem>
            <SelectItem value="buy">Buyer Posts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* CATEGORY CHECKBOX LIST (SINGLE SELECT) */}
      <div className="mb-6">
        <label className="text-sm font-medium">Categories</label>
        <div className="mt-3 flex flex-col gap-3">
          {categories?.data?.categories?.map((cat: any, index: number) => (
            <label
              key={index}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-4 h-4 accent-primaryColor"
                checked={filterValue.category_id == cat?._id}
                onChange={() => handleCategoryChange(cat)}
              />
              <span className="text-sm">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* MOBILE APPLY BUTTON */}
      {closeFilter && (
        <button
          onClick={closeFilter}
          className="mt-auto bg-primaryColor text-white w-full p-2 rounded-lg"
        >
          Apply Filters
        </button>
      )}
    </div>
  );
};

export default ProductFilter;
