import Image from "next/image";
import React from "react";
import AboutImage from "@/assets/images/aboutBanner.png"; // <-- replace with your image
import BigButton from "../common/BigButton";

const AboutBanner = () => {
  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden ">

      {/* Background Image */}
      <div className="relative w-full h-full">
        <Image
          src={AboutImage}
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
          Transforming Agriculture, One Direct Connection at a Time
        </h1>

        <p className="mt-4 text-base sm:text-lg lg:text-xl max-w-2xl drop-shadow-lg">
          Annanewa is a revolutionary platform bridging the gap between farmers
          and consumers, eliminating middlemen for fair and transparent pricing
          on both sides.
        </p>

        {/* CTA Button — Optional */}
       <BigButton text="Learn More" href="#" className=" mt-6" />
      </div>
    </section>
  );
};

export default AboutBanner;
