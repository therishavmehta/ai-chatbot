// components/ChatMessage.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLastIdx: boolean;
  streamedText: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  isLastIdx,
  streamedText,
}) => {
  const isUser = role === "user";

  return (
    <>
      <div
        className={`flex ${
          isUser ? "justify-end" : "justify-start"
        } text-sm mb-2`}
      >
        <div
          className={`max-w-xl p-3 rounded-lg ${
            isUser ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
      {isLastIdx && streamedText && (
        <div className={`flex justify-start text-sm mb-2`}>
          <div className={`max-w-xl p-3 rounded-lg bg-gray-700 text-gray-300`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {streamedText}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
