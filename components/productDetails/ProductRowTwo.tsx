import { ProductDetails } from "@/types/ProductDetails";
import React from "react";
import { Title18, Title20, Title36 } from "../common/Title";
import RelatedProduct from "./RelatedProduct";
import { FaDollarSign, FaGift, FaShippingFast } from "react-icons/fa";

interface Props {
  product: ProductDetails;
}
const ProductRowTwo = ({ product }: Props) => {
  return (
    <div className=" flex flex-col  marginTop gap-20">
      <div className=" flex flex-row gap-20">
        <div className="w-[70%] flex flex-col gap-6">
          <Title36>About Product</Title36>

          <div
            className="text-black"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>

        <div className="lg:w-[30%] flex flex-col gap-6 p-6 bg-primaryColor/10 rounded-2xl shadow-lg border border-primaryColor">
          <Title20 className="text-primaryColor font-bold">
            Why Shop With AanaNewa?
          </Title20>

          <div className="flex items-start gap-4">
            <FaGift className="text-primaryColor text-2xl mt-1" />
            <p className="text-secondaryColor text-base">
              Bid only once per product and ensure your spot to grab fresh,
              high-quality farm products at fair prices.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <FaShippingFast className="text-primaryColor text-2xl mt-1" />
            <p className="text-secondaryColor text-base">
              Proper delivery details are ensured. We hand-deliver your products
              via our trusted trucks directly from farmers to your doorstep.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <FaDollarSign className="text-primaryColor text-2xl mt-1" />
            <p className="text-secondaryColor text-base">
              No middlemen involved. Farmers get their fair value, and consumers
              get fresh products at a reasonable price.
            </p>
          </div>

          <button className="mt-4 w-full py-3 bg-primaryColor text-white font-bold rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg">
            Start Bidding Now
          </button>
        </div>
      </div>

      <div className=" w-full">
        <RelatedProduct products={product.relatedProduct || []} />
      </div>
    </div>
  );
};

export default ProductRowTwo;
