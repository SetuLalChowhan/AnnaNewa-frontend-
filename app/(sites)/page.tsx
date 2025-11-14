"use client";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ProductForBuy from "@/components/home/ProductForBuy";
import ProductForSell from "@/components/home/ProductForSell";
import WhyGoDirectSection from "@/components/home/WhyGoDirectSection";
import { useEmailStore } from "@/providers/useState";
import React from "react";

const page = () => {
  const email = useEmailStore((state) => state.email);

  console.log(email);
  return (
    <div>
      <HeroSection />
      <ProductForSell />
      <ProductForBuy />
      <HowItWorksSection/>
      <WhyGoDirectSection/>
    </div>
  );
};

export default page;
