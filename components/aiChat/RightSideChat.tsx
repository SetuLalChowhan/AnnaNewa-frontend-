"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuSend, LuLoader, LuBot, LuUser, LuCopy, LuCheck } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import useClient from "@/hooks/useClient";

// --- Components for Markdown Rendering ---

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
      title="Copy code"
    >
      {copied ? <LuCheck size={14} className="text-green-400" /> : <LuCopy size={14} />}
    </button>
  );
};

const CodeBlock = ({ inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";
  const codeString = String(children).replace(/\n$/, "");

  if (!inline && match) {
    return (
      <div className="relative my-4 rounded-lg overflow-hidden border border-gray-700/50 shadow-sm bg-[#1e1e1e]">
        <div className="flex items-center justify-between px-3 py-2 bg-[#2d2d2d] border-b border-gray-700/50">
          <span className="text-xs text-gray-400 font-mono lower">{language}</span>
          <CopyButton text={codeString} />
        </div>
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          className="!m-0 !p-4 !bg-transparent text-sm overflow-x-auto custom-scrollbar"
          showLineNumbers={true}
          wrapLines={true} // Ensure long lines wrap
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code
      className={`${className} bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400`}
      {...props}
    >
      {children}
    </code>
  );
};

const MarkdownComponents = {
  // Use our custom CodeBlock component
  code: CodeBlock,
  // Custom Table Components
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <table className="w-full text-left text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-gray-100 dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700">
      {children}
    </thead>
  ),
  tr: ({ children }: any) => <tr className="border-b border-gray-100 dark:border-gray-700 last:border-0">{children}</tr>,
  th: ({ children }: any) => (
    <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">{children}</th>
  ),
  td: ({ children }: any) => <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{children}</td>,
  // Links
  a: ({ href, children }: any) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 hover:underline">
      {children}
    </a>
  ),
  // Lists
  ul: ({ children }: any) => <ul className="list-disc pl-5 my-2 space-y-1">{children}</ul>,
  ol: ({ children }: any) => <ol className="list-decimal pl-5 my-2 space-y-1">{children}</ol>,
  li: ({ children }: any) => <li className="pl-1">{children}</li>,
  // Headings
  h1: ({ children }: any) => <h1 className="text-2xl font-bold mb-4 mt-6 pb-2 border-b dark:border-slate-700">{children}</h1>,
  h2: ({ children }: any) => <h2 className="text-xl font-bold mb-3 mt-5 pb-1 border-b dark:border-slate-700/50">{children}</h2>,
  h3: ({ children }: any) => <h3 className="text-lg font-bold mb-2 mt-4">{children}</h3>,
  // Paragraph
  p: ({ children }: any) => <p className="leading-7 mb-3 last:mb-0">{children}</p>,
  // Blockquote
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-1 my-4 bg-gray-50 dark:bg-slate-800/50 italic text-gray-600 dark:text-gray-300 rounded-r">
      {children}
    </blockquote>
  ),
};

const ChatMessage = memo(({ message }: { message: any }) => {
  const isUser = message.role === "user";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex gap-3 max-w-[90%] md:max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            isUser ? "bg-primaryColor" : "bg-blue-600"
          } text-white shadow-sm mt-1`}
        >
          {isUser ? <LuUser size={14} /> : <LuBot size={14} />}
        </div>

        {/* Bubble */}
        <div
          className={`p-4 rounded-2xl shadow-sm text-sm ${
            isUser
              ? "bg-primaryColor text-white rounded-tr-sm"
              : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-sm border border-gray-100 dark:border-slate-700"
          }`}
        >
          {message.isLoading ? (
            <div className="flex items-center gap-2 text-gray-500 py-1 px-1">
               <LuLoader className="animate-spin" size={16} />
               <span className="text-xs">Thinking...</span>
            </div>
          ) : (
            <div className={`markdown-body ${isUser ? "text-white" : "dark:text-slate-100"}`}>
               {/* 
                  If it's a user message, we might not want full markdown rendering 
                  for safety/simplicity, or we can allow it. 
                  Usually user messages are plain text, but rendering basic MD is fine.
                  We'll apply specific overrides for user messages if needed (e.g., keeping white text).
               */}
               {isUser ? (
                 <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
               ) : (
                 <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed">
                   <ReactMarkdown 
                      remarkPlugins={[remarkGfm]} 
                      components={MarkdownComponents}
                   >
                      {message.content}
                   </ReactMarkdown>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ChatMessage.displayName = "ChatMessage";

const RightSideChat = ({ selectedQuestion }: { selectedQuestion: string | null }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 1. Fetch History using your custom hook
  const { data: history } = useClient({
    queryKey: ["chatHistory"],
    url: "/ai/chat/history",
    isPrivate: true,
  });

  // Sync history once data arrives
  useEffect(() => {
    if (history?.chats) {
      const formatted = history.chats.flatMap((c: any) => [
        { role: "user", content: c.userMessage },
        { role: "assistant", content: c.aiReply }
      ]);
      setMessages(formatted);
    }
  }, [history]);

  // 2. Auto-scroll logic
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3. Optimized Streaming Handler
  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return;

    // Add user message & empty assistant placeholder
    setMessages(prev => [...prev, { role: "user", content: text }, { role: "assistant", content: "", isLoading: true }]);
    setIsStreaming(true);

    abortControllerRef.current = new AbortController();
    
    try {
      const response = await fetch("http://localhost:4000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
        signal: abortControllerRef.current.signal,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Check if the response is JSON (not a stream)
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        const reply = data.reply || data.message || JSON.stringify(data); // Fallback for various formats
        
        setMessages(prev => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          updated[lastIdx] = { ...updated[lastIdx], content: reply, isLoading: false };
          return updated;
        });
        return; // Exit early since we handled the JSON response
      }

      // Standard Streaming Logic (SSE)
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let streamContent = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.replace("data: ", "");
          
          if (data === "[DONE]") break;
          
          streamContent += data;
          // Functional update to avoid stale state
          setMessages(prev => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            updated[lastIdx] = { ...updated[lastIdx], content: streamContent, isLoading: false };
            return updated;
          });
        }
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Chat Error:", err);
        setMessages(prev => {
          const updated = [...prev];
          if (updated.length > 0 && updated[updated.length - 1].isLoading) {
             updated[updated.length - 1] = { ...updated[updated.length - 1], content: "Error: " + (err.message || "Failed to connect"), isLoading: false };
          }
          return updated; 
        });
      }
    } finally {
      setIsStreaming(false);
    }
  }, [isStreaming]);

  // 4. Prevent infinite loop on selectedQuestion
  const prevQuestionRef = useRef<string | null>(null);

  useEffect(() => {
    if (selectedQuestion && selectedQuestion !== prevQuestionRef.current) {
      prevQuestionRef.current = selectedQuestion;
      handleSendMessage(selectedQuestion);
    }
  }, [selectedQuestion, handleSendMessage]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border dark:border-slate-800">
      <div className="p-4 border-b dark:border-slate-800 flex justify-between items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur z-10">
        <h2 className="font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100"><LuBot className="text-primaryColor" /> AI Assistant</h2>
        {isStreaming && (
          <button onClick={() => abortControllerRef.current?.abort()} className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors font-medium border border-red-200">Stop Generating</button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
        {messages.length === 0 && <WelcomeHero />}
        <AnimatePresence mode="popLayout" initial={false}>
          {messages.map((m, i) => (
            <ChatMessage key={i} message={m} />
          ))}
        </AnimatePresence>
        <div ref={scrollRef} className="h-4" />
      </div>

      <ChatInput onSend={handleSendMessage} disabled={isStreaming} />
    </div>
  );
};

const ChatInput = ({ onSend, disabled }: any) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
    // Reset height if we were using auto-resize (optional enhancement)
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="p-4 bg-white dark:bg-slate-900 border-t dark:border-slate-800 flex gap-2 items-end" onSubmit={handleSubmit}>
      <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full bg-gray-50 dark:bg-slate-800 border-0 text-slate-900 dark:text-slate-100 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primaryColor/50 outline-none resize-none min-h-[44px] max-h-[120px] scrollbar-hide"
            disabled={disabled}
            style={{ height: "auto" }} // Simplification, normally we'd calc height
          />
      </div>
      <button 
        type="submit" 
        disabled={!input.trim() || disabled} 
        className="p-3 bg-primaryColor hover:bg-primaryColor/90 text-white rounded-xl disabled:opacity-50 disabled:hover:bg-primaryColor transition-all shadow-sm"
      >
        <LuSend size={18} />
      </button>
    </form>
  );
};

const WelcomeHero = () => (
  <div className="flex flex-col items-center justify-center h-full opacity-60 pointer-events-none select-none">
    <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
        <LuBot size={32} className="text-primaryColor" />
    </div>
    <p className="text-lg font-medium text-slate-700 dark:text-slate-300">How can I help you today?</p>
    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Ask me anything about your data or code.</p>
  </div>
);

export default RightSideChat;