"use client";
import React, { useEffect } from "react";
import { useChatContext } from "../context/chatContext";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useStreamedText } from "../hooks/useStreamedText";

const ChatWindow: React.FC = () => {
  const { dispatch, state } = useChatContext();
  const { fetchStream, streamedText, isStreaming, setStreamedText } =
    useStreamedText();

  useEffect(() => {
    if (!isStreaming && streamedText) {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { role: "assistant", content: streamedText },
      });
      setStreamedText("");
    }
  }, [isStreaming]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {state.messages.map((msg, index) => (
          <ChatMessage
            key={index}
            role={msg.role}
            content={msg.content}
            isLastIdx={index === state.messages.length-1}
            streamedText={streamedText}
          />
        ))}
      </div>

      <ChatInput fetchStream={fetchStream} />
    </div>
  );
};

export default ChatWindow;
