"use client";
import React, { useEffect, useRef, useState } from "react";
import { useChatContext } from "../context/chatContext";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useStreamedText } from "../hooks/useStreamedText";
import ChatStream from "./chat-stream";
import { saveMessage, getMessages } from "@/lib/indexedDB"; // Import the utility functions

const ChatWindow: React.FC = () => {
  const { dispatch, state } = useChatContext();
  const { messages } = state;
  const {
    fetchStream,
    streamingText,
    isStreaming,
    setStreamingText,
    isThinking,
    streamedText,
    setStreamedText,
  } = useStreamedText();
  const [input, setInput] = useState<string>("");
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const endOfContentRef = useRef<HTMLDivElement>(null);

  // Fetch chat history on initial load
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const storedMessages = await getMessages();
        dispatch({
          type: "LOAD_MESSAGES",
          payload: storedMessages,
        });
        console.log(storedMessages);
      } catch (error) {
        console.error("Failed to fetch messages from IndexedDB", error);
      }
    };
    fetchChatHistory();
  }, []);

  useEffect(() => {
    (async function () {
      if (!isStreaming && streamedText) {
        const newMessage = { role: "assistant", content: streamedText };
        dispatch({
          type: "ADD_MESSAGE",
          payload: newMessage,
        });
        saveMessage(newMessage);
        setStreamingText("");
        setStreamedText("");
        setIsAutoScroll(true);
      }
    })();
  }, [isStreaming]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = { role: "user", content: input.trim() || "" };
      dispatch({
        type: "ADD_MESSAGE",
        payload: newMessage,
      });
      saveMessage(newMessage);
      setInput("");
      setIsAutoScroll(true);
      fetchStream({
        ...state,
        messages: [...state.messages, { role: "user", content: input.trim() }],
      });
    }
  };

  const scrollToBottom = () => {
    endOfContentRef.current &&
      endOfContentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (endOfContentRef.current && isStreaming && isAutoScroll) {
      scrollToBottom();
    }
  }, [streamingText, isStreaming, isAutoScroll]);

  const handleScroll = () => {
    setIsAutoScroll(false);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Chat Messages */}
      <div
        className="flex-1 overflow-y-auto space-y-4 p-4"
        ref={containerRef}
        onWheel={handleScroll}
      >
        {messages.map((message, idx) => {
          const isLastIdx = idx === messages.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChatMessage role={message.role} content={message.content} />
              {isLastIdx && isStreaming ? (
                <ChatStream
                  streamingText={streamingText}
                  isStreaming={isStreaming}
                  isThinking={isThinking}
                />
              ) : null}
            </React.Fragment>
          );
        })}
        <div ref={endOfContentRef} />
      </div>
      {/* Chat Input */}
      <ChatInput
        handleSubmit={handleSubmit}
        input={input}
        setInput={setInput}
      />
    </div>
  );
};

export default ChatWindow;
