"use client";
import React, { useState } from "react";
import LeftQuestion from "@/components/aiChat/LeftQuestion";
import RightSideChat from "@/components/aiChat/RightSideChat";

const Page: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-4 md:p-10 w-full h-screen bg-gray-50 dark:bg-slate-900">
      <LeftQuestion setSelectedQuestion={setSelectedQuestion} />
      <RightSideChat selectedQuestion={selectedQuestion} />
    </div>
  );
};

export default Page;
