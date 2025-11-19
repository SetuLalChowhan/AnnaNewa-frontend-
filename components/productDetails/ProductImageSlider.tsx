"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

interface Props {
  images: (string | StaticImageData)[];
}

const ProductImageSlider: React.FC<Props> = ({ images }) => {
  const [mainImage, setMainImage] = useState<string | StaticImageData>(
    images[0] || ""
  );

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Main Image */}
      <div className="w-full  relative h-[400px] md:h-[500px]">
        <Image
          src={mainImage}
          alt="Main Product Image"
          fill
          className="object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4  gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative md:h-24 h-14 cursor-pointer rounded-lg overflow-hidden border border-gray-200"
            onClick={() => setMainImage(img)}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              width={300}
              height={200}
              className="object-cover "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageSlider;
