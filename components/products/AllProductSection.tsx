"use client";

import React, { useState } from "react";
import ProductFilter from "./ProductFilter";
import AllProducts from "./AllProducts";
import useClient from "@/hooks/useClient";
import { useValueStore } from "@/providers/useState";

const AllProductSection = ({ products }: any) => {
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);
  const { filterValue, setFilterValue } = useValueStore();
  const { data, isLoading, isError } = useClient({
    queryKey: ["products"],
    url: "/product/all-products",
    isPrivate: false,
    params: {
      search: filterValue.search,
      category: filterValue.category_id,
      sort: filterValue.sort,
      postType: filterValue.postType,
      page: page,
    },
  });

  return (
    <div className="relative">
      <div className="section-padding-x section-padding-y flex w-full gap-10">
        {/* Desktop Filter Sidebar */}
        <div className="w-[25%] hidden md:block">
          <ProductFilter />
        </div>

        {/* Products */}
        <div className="w-full md:w-[75%]">
          <AllProducts
            openFilter={() => setShowFilter(true)}
            page={page}
            setPage={setPage}
            products={data?.products}
            pagination={data?.pagination}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </div>

      {/* Mobile Slide-In Filter */}
      {showFilter && (
        <div
          onClick={() => setShowFilter(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        >
          <div
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            className="absolute left-0 top-20 w-[75%] sm:w-[60%] overflow-y-auto h-screen bg-white shadow-xl animate-slideRight p-5"
          >
            <ProductFilter closeFilter={() => setShowFilter(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProductSection;
