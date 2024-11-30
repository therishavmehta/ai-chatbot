import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";
import { Copy, Brain } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  role = "user",
  content = "",
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
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } text-sm mb-2`}
    >
      {!isUser && <Brain className="h-6 w-6 mr-2 mt-4" />}
      <div
        className={`p-3 rounded-lg ${
          isUser
            ? "bg-blue-600 text-white max-w-full sm:max-w-xl"
            : "text-gray-300 bg-gray-700 max-w-full sm:max-w-4xl"
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
    </div>
  );
};

export default ChatMessage;
