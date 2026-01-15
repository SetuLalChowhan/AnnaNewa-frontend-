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
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-4 md:p-10 w-full h-screen bg-linear-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-950">
        <div className="w-full md:w-1/4">
          <LeftQuestion setSelectedQuestion={setSelectedQuestion} />
        </div>
        <div className="flex-1 min-h-0">
          <RightSideChat selectedQuestion={selectedQuestion} />
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Page;
