import React from "react";
import { X } from "lucide-react";

interface ErrorHandlerProps {
  message: string;
  onClose?: () => void;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="flex items-center mt-3 justify-between gap-3 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 transition"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default ErrorHandler;
