import Image from "next/image";
import React from "react";
import AboutImage from "@/assets/images/aboutBanner.png"; // <-- replace with your image
import BigButton from "../common/BigButton";
import CommonBanner from "../common/CommonBanner";

const AboutBanner = () => {
  return (
    <CommonBanner
      bannerImage={AboutImage}
      buttonText="Learn More"
      href="#"
      title={`Transforming Agriculture, One Direct Connection at a Time`}
      description={`Annanewa is a revolutionary platform bridging the gap between farmers
          and consumers, eliminating middlemen for fair and transparent pricing
          on both sides.`}
    />
  );
};

export default AboutBanner;
