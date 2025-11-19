import { ProductDetails } from "@/types/ProductDetails";
import React from "react";
import ProductImageSlider from "./ProductImageSlider";
import ProductBidInfo from "./ProductBidInfo";

interface Props {
  product: ProductDetails;
}

const ProductRowOne = ({ product }: Props) => {
  return (
    <div className=" flex w-full gap-10 justify-between">
      <div className=" w-1/2">
        <ProductImageSlider images={product.images} />
      </div>

      <div className=" w-1/2">
        <ProductBidInfo product={product} />
      </div>
    </div>
  );
};

export default ProductRowOne;
