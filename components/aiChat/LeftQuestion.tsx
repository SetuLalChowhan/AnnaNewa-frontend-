import React, { useState } from "react";

interface LeftQuestionProps {
  setSelectedQuestion: (q: string) => void;
}

const questions = [
  "Post a product as a seller",
  "Bid on a product as a buyer",
  "Check my bids",
  "Read farming articles",
];

const LeftQuestion: React.FC<LeftQuestionProps> = ({ setSelectedQuestion }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="w-full md:w-1/4 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-lg flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-[#d2e5f5] mb-4">
        Actions
      </h2>
      <div className="flex flex-col gap-3">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedQuestion(q);
              setActiveIndex(idx);
            }}
            className={`
              text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium
              ${
                activeIndex === idx
                  ? "bg-primaryColor text-white shadow-md"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-[#d2e5f5] hover:bg-primaryColor/20 "
              }
            `}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeftQuestion;
