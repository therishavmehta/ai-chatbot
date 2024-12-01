"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";

interface TypeWriterWithIndicatorProps {
  streamText: string;
  isTyping: boolean;
}

const TypeWriterWithIndicator: React.FC<TypeWriterWithIndicatorProps> = ({
  streamText,
  isTyping,
}) => {
  return (
    <div className="flex flex-col">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        className="whitespace-pre-line text-sm sm:text-base md:text-lg"
      >
        {`${streamText}`}
      </ReactMarkdown>
      {isTyping && (
        <div className="inline-block w-3 h-3 bg-white rounded-full animate-blink mt-2 sm:mt-3 md:mt-4"></div>
      )}
    </div>
  );
};

export default TypeWriterWithIndicator;
