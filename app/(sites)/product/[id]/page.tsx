import ProductRowOne from "@/components/productDetails/ProductRowOne";
import ProductRowTwo from "@/components/productDetails/ProductRowTwo";
import { productDetails } from "@/utils/Data";
import React from "react";

const page = () => {
  const product = productDetails;
  return (
    <div className=" section-padding-x section-padding-y">
      <ProductRowOne product={product} />
      <ProductRowTwo product={product} />
    </div>
  );
};

export default page;
