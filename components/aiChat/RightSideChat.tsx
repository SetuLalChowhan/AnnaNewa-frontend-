// components/aiChat/RightSideChat.tsx
import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { LuSend, LuLoader, LuBot, LuUser } from "react-icons/lu";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";
import axios from "axios";
import ReactMarkdown from "react-markdown";

interface RightSideChatProps {
  selectedQuestion: string | null;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp?: Date;
  isLoading?: boolean;
}

interface ChatHistory {
  _id: string;
  userId: string;
  userMessage: string;
  aiReply: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ChatHistoryResponse {
  success: boolean;
  chats: ChatHistory[];
}

const RightSideChat: React.FC<RightSideChatProps> = ({ selectedQuestion }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fetch chat history
  const { data: chatHistoryData, isLoading: isHistoryLoading } = useClient({
    queryKey: ["chatHistory"],
    url: "/ai/chat/history",
    isPrivate: true,
  });

  // Stream chat mutation - using your existing hook for non-streaming fallback
  const streamMutation = useMutationClient({
    url: "/ai/chat/stream",
    method: "post",
    isPrivate: true,
    successMessage: "",
    invalidateKeys: [["chatHistory"]],
  });

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history on component mount
  useEffect(() => {
    if (chatHistoryData?.chats && chatHistoryData.chats.length > 0) {
      const historyMessages: Message[] = [];
      
      chatHistoryData.chats.forEach((chat :any, index :any) => {
        // Add user message
        historyMessages.push({
          id: index * 2 + 1,
          text: chat.userMessage,
          sender: "user",
          timestamp: new Date(chat.createdAt),
        });
        
        // Add AI reply
        historyMessages.push({
          id: index * 2 + 2,
          text: chat.aiReply,
          sender: "ai",
          timestamp: new Date(chat.createdAt),
        });
      });
      
      setMessages(historyMessages);
      if (!chatStarted) {
        setChatStarted(true);
      }
    }
  }, [chatHistoryData]);

  // Add selected question from LeftQuestion
  useEffect(() => {
    if (selectedQuestion && chatStarted) {
      handleSendMessage(selectedQuestion);
    }
  }, [selectedQuestion, chatStarted]);

  // Function to send message with streaming
  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || newMessage.trim();
    if (!text) return;

    // Create user message
    const userMessageId = Date.now();
    const aiMessageId = userMessageId + 1;

    // Add user message
    setMessages(prev => [...prev, {
      id: userMessageId,
      text: text,
      sender: "user",
      timestamp: new Date(),
    }]);

    // Add loading AI message
    setMessages(prev => [...prev, {
      id: aiMessageId,
      text: "",
      sender: "ai",
      timestamp: new Date(),
      isLoading: true,
    }]);

    // Clear input if using input field
    if (!messageText) {
      setNewMessage("");
    }

    setIsStreaming(true);

    try {
      // Cancel any existing stream
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new AbortController for this stream
      abortControllerRef.current = new AbortController();

      // Stream the AI response
      await streamAIResponse(text, aiMessageId);

    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Stream error:', error);
        // Update AI message with error
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, text: "Sorry, I encountered an error. Please try again.", isLoading: false }
            : msg
        ));
      }
    } finally {
      setIsStreaming(false);
      if (!messageText) {
        inputRef.current?.focus();
      }
    }
  };

  // Stream AI response
  const streamAIResponse = async (userMessage: string, aiMessageId: number) => {
    try {
      const response = await fetch('http://localhost:4000/api/ai/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
          credentials: 'include',
          
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      const decoder = new TextDecoder();
      let aiResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              // Stream complete
              setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId 
                  ? { ...msg, isLoading: false }
                  : msg
              ));
              return;
            }

            aiResponse += data;
            // Update AI message with new content
            setMessages(prev => prev.map(msg => 
              msg.id === aiMessageId 
                ? { ...msg, text: aiResponse, isLoading: false }
                : msg
            ));
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Stream aborted');
      } else {
        throw error;
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isStreaming) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStartChat = () => {
    setChatStarted(true);
    
    // If there's no history, show welcome message
    if (messages.length === 0) {
      setMessages([{
        id: 1,
        text: "Hello! I'm here to help you with Annanewa. You can ask me about posting products, bidding, checking your bids, or farming articles. How can I assist you today?",
        sender: "ai",
        timestamp: new Date(),
      }]);
    }
  };

  const handleStopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
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
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-[#d2e5f5]">
            AI Assistant
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ask me anything about Annanewa
          </p>
        </div>
        {isStreaming && (
          <button
            onClick={handleStopStream}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Stop
          </button>
        )}
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {chatStarted ? (
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial="hidden"
                animate="visible"
                variants={messageVariants}
                className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] flex ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"} items-start gap-3`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.sender === "user" 
                      ? "bg-primaryColor text-white" 
                      : "bg-blue-500 text-white"
                  }`}>
                    {msg.sender === "user" ? <LuUser size={16} /> : <LuBot size={16} />}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${msg.sender === "user"
                      ? "bg-primaryColor text-white rounded-tr-none"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-[#d2e5f5] rounded-tl-none"
                    }`}
                  >
                    {msg.isLoading ? (
                      <div className="flex items-center gap-2">
                        <LuLoader className="animate-spin" size={16} />
                        <span>Thinking...</span>
                      </div>
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    )}
                    <div className="text-xs opacity-70 mt-2">
                      {msg.timestamp?.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primaryColor to-blue-500 flex items-center justify-center mb-6">
              <LuBot size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              Welcome to Annanewa Chat!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
              I'm your AI assistant here to help you with farming-related questions, 
              product listings, bidding, and more.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-lg">
              {[
                "How do I list a product?",
                "What's the bidding process?",
                "How to check my bids?",
                "Tell me about organic farming"
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setChatStarted(true);
                    handleSendMessage(suggestion);
                  }}
                  className="px-4 py-3 text-left bg-gray-100 dark:bg-slate-700 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-700 dark:text-gray-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <button
              onClick={handleStartChat}
              className="px-8 py-3 bg-gradient-to-r from-primaryColor to-blue-500 text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Start New Chat
            </button>
          </div>
        )}
      </div>

      {/* Message input */}
      {chatStarted && (
        <div className="p-4 bg-gray-50 dark:bg-[#020617] border-t border-gray-200 dark:border-slate-700">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isStreaming}
              className="flex-1 px-4 py-3 rounded-full border dark:bg-slate-900 dark:border-slate-700 dark:text-[#d2e5f5] focus:outline-none focus:ring-2 focus:ring-primaryColor disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSendMessage()}
              disabled={!newMessage.trim() || isStreaming}
              className="bg-primaryColor text-white p-3 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primaryColor/90 transition-colors"
            >
              {isStreaming ? (
                <LuLoader className="animate-spin" size={20} />
              ) : (
                <LuSend size={20} />
              )}
            </motion.button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Press Enter to send • AI may produce inaccurate information
          </p>
        </div>
      )}
    </div>
  );
};

export default RightSideChat;