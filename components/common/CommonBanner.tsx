import React from "react";
import BigButton from "./BigButton";
import Image, { StaticImageData } from "next/image";

interface BannerProps {
  bannerImage: StaticImageData;
  buttonText?: string;
  href?: string;
  title: string;
  description: string;
}

const CommonBanner = ({
  bannerImage,
  buttonText,
  href,
  title,
  description,
}: BannerProps) => {
  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden ">
      {/* Background Image */}
      <div className="relative w-full h-full">
        <Image
          src={bannerImage}
          alt="About Annanewa Banner"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center section-padding-x section-padding-y text-white z-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight drop-shadow-lg">
          {title}
        </h1>

        <p className="mt-4 text-base sm:text-lg lg:text-xl max-w-2xl drop-shadow-lg">
          {description}
        </p>

        {/* CTA Button — Optional */}
        {buttonText && href && (
          <div className="mt-6">
            <BigButton
              text={buttonText || ""}
              href={href ?? ""}
              className=" mt-6"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CommonBanner;
