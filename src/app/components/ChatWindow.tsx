"use client";
import React, { useEffect, useRef, useState } from "react";
import { useChatContext } from "../context/chatContext";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useStreamedText } from "../hooks/useStreamedText";

const ChatWindow: React.FC = () => {
  const { dispatch, state } = useChatContext();
  const {
    fetchStream,
    streamedText,
    isStreaming,
    setStreamedText,
    isThinking,
  } = useStreamedText();
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const endOfContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isStreaming && streamedText) {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { role: "assistant", content: streamedText },
      });
      setStreamedText("");
    }
  }, [isStreaming]);

  const scrollToBottom = () =>
    endOfContentRef.current &&
    endOfContentRef.current.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (isAutoScroll && endOfContentRef.current && isStreaming) {
      scrollToBottom();
    }
  }, [streamedText, isAutoScroll, isStreaming]);

  useEffect(() => {
    if (!streamedText) {
      setIsAutoScroll(true);
    }
  }, [streamedText]);

  // Handle user scroll event
  const handleScroll = () => {
    const container = containerRef.current;

    if (!container) return;

    // Check if user scrolled up (not at the bottom)
    const isAtBottom =
      container.scrollHeight - container.scrollTop === container.clientHeight;

    if (!isAtBottom && isStreaming) {
      setIsAutoScroll(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div
        className="flex-1 space-y-4 overflow-y-auto scrollbar-hide"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {state.messages.map((msg, index) => (
          <ChatMessage
            key={index}
            role={msg.role}
            content={msg.content}
            isLastIdx={index === state.messages.length - 1}
            streamedText={streamedText}
            isStreaming={isStreaming}
            isThinking={isThinking}
          />
        ))}
        <div ref={endOfContentRef} />
      </div>

      <ChatInput fetchStream={fetchStream} scrollToBottom={scrollToBottom} />
    </div>
  );
};

export default ChatWindow;
