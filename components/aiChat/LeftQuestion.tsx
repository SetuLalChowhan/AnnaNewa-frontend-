// components/aiChat/LeftQuestion.tsx
import React, { useState } from "react";
import { 
  LuShoppingBag, 
  LuGavel, 
  LuListChecks, 
  LuNewspaper,
  LuMessageSquare
} from "react-icons/lu";

interface LeftQuestionProps {
  setSelectedQuestion: (q: string) => void;
}

const questions = [
  { 
    text: "How do I participate in a bid as a buyer?", 
    icon: <LuGavel size={20} /> 
  },
  { 
    text: "How can I post my harvest for sale?", 
    icon: <LuShoppingBag size={20} /> 
  },
  { 
    text: "Explain the product delivery process", 
    icon: <LuListChecks size={20} /> 
  },
  { 
    text: "Check latest farming technique articles", 
    icon: <LuNewspaper size={20} /> 
  },
];

const LeftQuestion: React.FC<LeftQuestionProps> = ({ setSelectedQuestion }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="h-full bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primaryColor/10 rounded-lg">
          <LuMessageSquare size={24} className="text-primaryColor" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-[#d2e5f5]">
            Quick Actions
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click to ask about
          </p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-3">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedQuestion(q.text);
              setActiveIndex(idx);
            }}
            className={`
              flex items-center gap-4 text-left px-5 py-4 rounded-xl 
              transition-all duration-200 font-medium
              ${activeIndex === idx
                ? "bg-gradient-to-r from-primaryColor to-blue-500 text-white shadow-lg transform scale-[1.02]"
                : "bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-[#d2e5f5] hover:bg-gray-200 dark:hover:bg-slate-700"
              }
            `}
          >
            <div className={`${activeIndex === idx ? "text-white" : "text-primaryColor"}`}>
              {q.icon}
            </div>
            <span className="flex-1">{q.text}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-800">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Select an action to ask the AI assistant
        </p>
      </div>
    </div>
  );
};

export default LeftQuestion;