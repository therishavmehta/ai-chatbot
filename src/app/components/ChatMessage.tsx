// components/ChatMessage.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";
import TypeWriterWithIndicator from "./TypeWriterWithIndicator";
import { isTypedArray } from "util/types";
import { Copy, Brain } from "lucide-react";
import sentientLogo from "../../../public/sentientLogo.png";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLastIdx: boolean;
  streamedText: string;
  isStreaming: boolean;
  isThinking: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  isLastIdx,
  streamedText,
  isStreaming,
  isThinking,
}) => {
  const isUser = role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <div
        className={`flex ${
          isUser ? "justify-end" : "justify-start"
        } text-sm mb-2`}
      >
        {!isUser && <Brain className="h-6 w-6 mr-2 mt-4" />}
        <div
          className={`p-3 rounded-lg ${
            isUser
              ? " max-w-xl bg-blue-600 text-white"
              : "text-gray-300 max-w-4xl bg-gray-700"
          }`}
        >
          {!isUser && (
            <button className="text-foreground-tertiary hover:text-foreground-secondary float-right">
              <Copy onClick={handleCopy} className="h-4 w-4" />
            </button>
          )}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
      {!isThinking && isLastIdx && streamedText && (
        <div className={`flex justify-start text-sm mb-2`}>
          <Brain className="h-6 w-6 mr-2 mt-4" />
          <div className={`max-w-4xl p-3 rounded-lg bg-gray-700 text-gray-300`}>
            <TypeWriterWithIndicator
              streamText={streamedText}
              isTyping={isStreaming}
            />
          </div>
        </div>
      )}
      {isLastIdx && isThinking && (
        <div className="flex flex-row gap-2 items-center">
          <Brain className="mr-2 mb-4" />
          <div className="flex flex-row gap-2">
            <div
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
