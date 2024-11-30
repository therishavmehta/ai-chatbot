import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";
import TypeWriterWithIndicator from "./TypeWriterWithIndicator";
import { Brain } from "lucide-react";

interface ChatStreamProps {
  role?: "user" | "assistant";
  content?: string;
  streamingText?: string;
  isStreaming?: boolean;
  isThinking?: boolean;
}

const ChatStream: React.FC<ChatStreamProps> = ({
  streamingText = "",
  isStreaming = false,
  isThinking = false,
}) => {
  return (
    <>
      {!isThinking && streamingText && (
        <div className={`flex justify-start text-sm mb-2`}>
          <Brain className="h-6 w-6 mr-2 mt-4" />
          <div
            className={
              "p-3 rounded-lg text-gray-300 bg-gray-700 max-w-full sm:max-w-4xl"
            }
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {streamingText}
            </ReactMarkdown>
          </div>
        </div>
      )}
      {isThinking && (
        <div className="flex flex-row gap-2 items-center md:gap-3 md:mt-2">
          <Brain className="mr-2 mb-4 md:h-8 md:w-8" />
          <div className="flex flex-row gap-2 md:gap-3">
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

export default ChatStream;
