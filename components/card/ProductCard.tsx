// components/ProductCard.tsx
import Link from "next/link";

import { Product } from "@/types/Product";
import PrimaryBtn from "../common/PrimaryBtn";
import Image from "next/image";
import { Title14, Title18, TitleBase } from "../common/Title";

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
  const mainImage = images.length > 0 ? images[0] : "/images/placeholder.png";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 w-full max-w-sm">
      <div className="w-full h-48 sm:h-56 lg:h-64 overflow-hidden">
        <Image
          src={mainImage}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-4 flex flex-col gap-3 items-start">
        <Title18>{title}</Title18>
        <Title14>{description}</Title14>
        <TitleBase>
          {pricePerKg} BDT / kg | {totalWeight} kg
        </TitleBase>
        <span className="inline-flex bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
          {category}
        </span>
      </div>
      <div className=" w-full p-4 inline-flex">
        <PrimaryBtn text="View" href="#" className="text-center w-full" />
      </div>
    </div>
  );
};

export default ProductCard;
