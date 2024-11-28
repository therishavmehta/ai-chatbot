"use client";
import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { useStreamedText } from "./hooks/useStreamedText";
import "highlight.js/styles/github.css";

const StreamingChat: React.FC = () => {
  const { streamedText, isStreaming, error, fetchStream } = useStreamedText();
  const containerRef = useRef<HTMLDivElement>(null);

  const bindedStream = fetchStream.bind(
    {},
    {
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: "hello",
        },
        {
          role: "assistant",
          content: "Hello! How can I assist you today?",
        },
        {
          role: "user",
          content: "find sum of 2 number in js function.",
        },
      ],
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true, // Enable streaming
    }
  );

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [streamedText]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <button
        onClick={bindedStream}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        disabled={isStreaming} // Disable button during streaming
      >
        {isStreaming ? "Streaming..." : "Start Streaming"}
      </button>
      <div
        ref={containerRef}
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
          background: "#f9f9f9",
          overflowY: "auto",
          maxHeight: "400px",
          whiteSpace: "pre-wrap",
          fontFamily: "Courier New, monospace",
        }}
      >
        {error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {streamedText}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default StreamingChat;
