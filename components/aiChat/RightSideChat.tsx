import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { LuSend } from "react-icons/lu";

interface RightSideChatProps {
  selectedQuestion: string | null;
}

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
}

const RightSideChat: React.FC<RightSideChatProps> = ({ selectedQuestion }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Scroll to bottom
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => scrollToBottom(), [messages]);

  // Add selected question as YOUR message (sender: "me")
  useEffect(() => {
    if (selectedQuestion && chatStarted) {
      const newId = messages.length ? Math.max(...messages.map((m) => m.id)) + 1 : 1;
      setMessages((prev) => [
        ...prev,
        { id: newId, text: selectedQuestion, sender: "me" },
      ]);
    }
  }, [selectedQuestion, chatStarted]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const newId = messages.length ? Math.max(...messages.map((m) => m.id)) + 1 : 1;
    setMessages((prev) => [
      ...prev,
      { id: newId, text: newMessage, sender: "me" },
    ]);
    setNewMessage("");
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const messageVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 18, stiffness: 200 },
    },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {chatStarted ? (
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={messageVariants}
                className={`mb-4 flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-xl text-sm max-w-[70%] ${
                    msg.sender === "me"
                      ? "bg-primaryColor text-white rounded-br-none"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-[#d2e5f5] rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-600 dark:text-gray-400">
            <p className="mb-4 text-lg">Welcome to Annanewa Chat!</p>
            <p className="mb-6 text-sm">
              Click below to start chatting about your products and bids.
            </p>
            <button
              onClick={() => setChatStarted(true)}
              className="px-6 py-3 bg-primaryColor text-white rounded-full font-semibold hover:brightness-90 transition"
            >
              Start Chat
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      {chatStarted && (
        <div className="p-4 bg-gray-50 dark:bg-[#020617] border-t border-gray-200 dark:border-slate-700 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-full border dark:bg-slate-900 dark:border-slate-700 dark:text-[#d2e5f5] focus:outline-none focus:ring-2 "
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="bg-primaryColor text-white p-3 rounded-full flex items-center justify-center"
          >
            <LuSend size={20} />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default RightSideChat;
