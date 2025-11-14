import { dummyProducts } from "@/utils/Data";
import React from "react";
import ProductCard from "../card/ProductCard";
import { Title36 } from "../common/Title";
import PrimaryBtn from "../common/PrimaryBtn";

const ProductForSell = () => {
  return (
    <div className="section-padding-x section-padding-y">
      <div className=" flex w-full gap-6 justify-between items-center">
        <Title36>Product For Sell</Title36>
        <PrimaryBtn text="View All" href="#" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dummyProducts.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductForSell;
