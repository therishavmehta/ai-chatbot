"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";
import { Copy, Brain } from "lucide-react";
import ThemedToast from "./ui/toast";
import { IFCMessage } from "@/types/message";

const ChatMessage: React.FC<IFCMessage> = ({ role = "user", content = "" }) => {
  const isUser = role === "user";
  const [openToast, setOpenToast] = useState({
    title: "",
    description: "",
    open: false,
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setOpenToast({
        title: "Copied",
        description: "Copied to clipboard",
        open: true,
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } text-sm mb-2`}
    >
      {!isUser && <Brain className="flex-shrink-0 h-6 w-6 mr-2 mt-4" />}
      <div
        className={`p-3 rounded-lg flex-shrink-1 ${
          isUser
            ? "bg-accent-primary text-foreground-primary max-w-full sm:max-w-xl" // Updated with design system colors
            : "text-foreground-primary bg-background-secondary max-w-full sm:max-w-4xl" // Updated with design system colors
        }`}
      >
        {!isUser && (
          <button className="text-foreground-tertiary hover:text-foreground-secondary float-right">
            <Copy onClick={handleCopy} className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        )}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>
      <ThemedToast {...openToast} setOpen={setOpenToast} />
    </div>
  );
};

export default ChatMessage;
