import { Product } from "@/types/Product";
import React from "react";
import { Title20, Title36 } from "../common/Title";
import { dummyProducts } from "@/utils/Data";
import ProductCard from "../card/ProductCard";

interface Props {
  products: Product[];
}

const RelatedProduct = ({ products }: Props) => {
  return (
    <div className=" flex flex-col ">
      <Title36>Related Products</Title36>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {dummyProducts.slice(0, 4).map((product : any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
