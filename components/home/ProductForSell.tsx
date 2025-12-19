import { dummyProducts } from "@/utils/Data";

import ProductCard from "../card/ProductCard";
import { Title36 } from "../common/Title";
import PrimaryBtn from "../common/PrimaryBtn";
import { fetchData } from "@/api/api";

const ProductForSell = async () => {
  const products = await fetchData("product/all-products?postType=sell");
  const length = products?.products.length;

  return (
    <div className="section-padding-x section-padding-y">
      <div className=" flex w-full gap-6 justify-between items-center">
        <Title36>Product For Sell</Title36>
        <div hidden={length<=4} >
          <PrimaryBtn text="View All" href="/products" />
        </div>
      </div>

      {length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-500">No products available for sale</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xlg:grid-cols-4 gap-6 mt-6">
          {products?.products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductForSell;
