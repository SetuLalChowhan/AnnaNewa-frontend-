// components/ProductCard.tsx
import Link from "next/link";

import { Product } from "@/types/Product";
import PrimaryBtn from "../common/PrimaryBtn";
import Image from "next/image";
import { Title14, Title18, TitleBase } from "../common/Title";
import DummyImage from "@/assets/images/dumy.png";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const {
    title,
    description,
    pricePerKg,
    totalWeight,
    images,
    category,
    slug,
  } = product;
  const mainImage = images?.length > 0 ? images[0]?.url : DummyImage;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 w-full max-w-sm">
      <div className="w-full h-48 sm:h-56 lg:h-64 overflow-hidden relative">
        {" "}
        {/* Added relative for better positioning */}
        <Image
          src={mainImage}
          alt={title}
          width={800}
          height={600}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-4 flex flex-col gap-3 items-start">
        <Title18>{title}</Title18>
        <div
          className="text-sm text-black font-normal line-clamp-2"
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />

        <TitleBase>
          {pricePerKg} BDT / kg | {totalWeight} kg
        </TitleBase>
        <span className="inline-flex bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
          {category}
        </span>
      </div>
      <div className="w-full p-4 inline-flex">
        <PrimaryBtn
          text="View"
          href={`/product/${slug}`} // Fixed to use dynamic slug instead of hard-coded "/product/1"
          className="text-center w-full"
        />
      </div>
    </div>
  );
};

export default ProductCard;
