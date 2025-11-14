"use client";
import HeroSection from "@/components/home/HeroSection";
import ProductForBuy from "@/components/home/ProductForBuy";
import ProductForSell from "@/components/home/ProductForSell";
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
    </div>
  );
};

export default page;
