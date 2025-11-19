import React from "react";
import ProductBannerImage from "@/assets/images/p5.jpeg";
import Image from "next/image";
import CommonBanner from "../common/CommonBanner";

const ProductBanner = () => {
  return (
    <CommonBanner
      bannerImage={ProductBannerImage}
      title={`Explore All Products Posted by Farmers & Buyers`}
      description={`Discover fresh farm products, daily essentials, and buyer requests — all in one transparent marketplace. Bid, connect, and trade directly without any middlemen.`}
    />
  );
};

export default ProductBanner;
