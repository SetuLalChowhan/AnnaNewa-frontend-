import { Product } from "@/types/Product";
import React from "react";
import { Title20, Title36 } from "../common/Title";
import ProductCard from "../card/ProductCard";

interface Props {
  products: Product[];
}

const RelatedProduct = ({ products }: Props) => {
  return (
    <div className=" flex flex-col ">
      <Title36>Related Products</Title36>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 italic">No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;
