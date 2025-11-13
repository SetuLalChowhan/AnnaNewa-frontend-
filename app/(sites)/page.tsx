"use client";
import HeroSection from "@/components/home/HeroSection";
import { useEmailStore } from "@/providers/useState";
import React from "react";

const page = () => {
  const email = useEmailStore((state) => state.email);

  console.log(email);
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default page;
