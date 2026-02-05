// app/ai-chat/page.tsx
"use client";
import React, { useState } from "react";
import LeftQuestion from "@/components/aiChat/LeftQuestion";
import RightSideChat from "@/components/aiChat/RightSideChat";
import PrivateRoute from "@/components/shared/PrivateRoute";

const Page: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  return (
    <PrivateRoute>
      <div className="fixed top-[74px] left-0 w-full h-[calc(100vh-74px)] flex flex-col md:flex-row gap-6 md:gap-10 p-4 md:p-10 overflow-hidden">
        <div className="w-full md:w-1/4 h-full overflow-y-auto">
          <LeftQuestion setSelectedQuestion={setSelectedQuestion} />
        </div>
        <div className="flex-1 min-h-0 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 overflow-hidden">
          <RightSideChat selectedQuestion={selectedQuestion} />
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Page;
