import React from "react";
import { Title36 } from "../common/Title";
import PrimaryBtn from "../common/PrimaryBtn";
import { dummyProducts } from "@/utils/Data";
import ProductCard from "../card/ProductCard";
import { fetchData } from "@/api/api";

const ProductForBuy = async () => {
  const products = await fetchData("product/all-products?postType=buy");
  return (
    <div className="section-padding-x ">
      <div className=" flex w-full gap-6 justify-between items-center">
        <Title36>Product For Buy</Title36>
        <PrimaryBtn text="View All" href="#" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {products?.products.slice(0, 4).map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductForBuy;
