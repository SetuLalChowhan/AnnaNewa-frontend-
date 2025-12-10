import { fetchData } from "@/api/api";
import AllProductSection from "@/components/products/AllProductSection";
import ProductBanner from "@/components/products/ProductBanner";
import React from "react";

const page = async () => {
  const products = await fetchData("product/all-products");

  return (
    <div>
      <ProductBanner />
      <AllProductSection products={products} />
    </div>
  );
};

export default page;
