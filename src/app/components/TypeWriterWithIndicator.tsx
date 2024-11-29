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
    <div className="flex-column">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {`${streamText}`}
      </ReactMarkdown>
      {isTyping && (
        <div className="inline-block w-3 h-3 bg-white rounded-full animate-blink"></div>
      )}
    </div>
  );
};

export default TypeWriterWithIndicator;
