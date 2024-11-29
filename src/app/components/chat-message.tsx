"use client";
import { Copy, Brain } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";

interface ChatMessageProps {
  role: "system" | "user" | "assistant";
  content: string;
  streamedText: string;
  isStreaming: boolean;
  isLastIdx: boolean;
}

export function ChatMessage({
  role,
  content,
  isLastIdx,
  streamedText,
  isStreaming,
}: ChatMessageProps) {
  return (
    <>
      <div className="border-b border-border-default px-4 py-6">
        <div className="flex items-start justify-between">
          <span className="font-medium text-foreground-secondary capitalize">
            {role}
          </span>
          <div className="flex items-center gap-2">
            <button className="text-foreground-tertiary hover:text-foreground-secondary">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mt-2 text-foreground-primary">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
      {isLastIdx && streamedText && (
        <div className="border-b border-border-default px-4 py-6">
          <div className="flex items-start justify-between">
            <span className="font-medium text-foreground-secondary capitalize">
              {role}
            </span>
            <div className="flex items-center gap-2">
              <button className="text-foreground-tertiary hover:text-foreground-secondary">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-2 text-foreground-primary">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
}
