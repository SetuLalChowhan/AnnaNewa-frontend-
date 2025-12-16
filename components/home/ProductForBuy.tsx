import React from "react";
import { Title36 } from "../common/Title";
import PrimaryBtn from "../common/PrimaryBtn";
import { dummyProducts } from "@/utils/Data";
import ProductCard from "../card/ProductCard";
import { fetchData } from "@/api/api";

const ProductForBuy = async () => {
  const products = await fetchData("product/all-products?postType=buy");
   const length = products?.products.length;
  return (
    <div className="section-padding-x ">
      <div className=" flex w-full gap-6 justify-between items-center">
        <Title36>Product For Buy</Title36>
        <PrimaryBtn text="View All" href="#" />
      </div>

      {
        length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-gray-500">No products available for Buy</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {products?.products.map((product : any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )
      }
    </div>
  );
};

export default ProductForBuy;
