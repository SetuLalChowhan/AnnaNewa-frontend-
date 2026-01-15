import ProductRowOne from "@/components/productDetails/ProductRowOne";
import ProductRowTwo from "@/components/productDetails/ProductRowTwo";
import { fetchData } from "@/api/api";
import React from "react";
import { ProductDetails } from "@/types/ProductDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  // The id here is the slug from the URL
  const response = await fetchData(`product/${id}`);
  const product: ProductDetails = {
    ...response.product,
    relatedProduct: response.relatedProduct,
    topBids: response.topBids,
  };

  if (!product) {
    return (
      <div className="section-padding-x section-padding-y text-center">
        <h1 className="text-2xl font-bold text-red-500">Product not found</h1>
      </div>
    );
  }

  return (
    <div className=" section-padding-x section-padding-y">
      <ProductRowOne product={product} />
      <ProductRowTwo product={product} />
    </div>
  );
};

export default page;
