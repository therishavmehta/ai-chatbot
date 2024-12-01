"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChatContext } from "../context/chat-context";
import ChatMessage from "./chat-message";
import ChatInput from "./chat-input";
import { useStreamedText } from "../hooks/useStreamedText";
import ChatStream from "./chat-stream";
import { saveMessage, getMessages } from "@/lib/indexedDB"; // Import the utility functions
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { IFCChatActionType, IFCRole } from "@/types/message";
import ThemedToast from "./ui/toast";

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
    error,
  } = useStreamedText();
  const [input, setInput] = useState<string>("");
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);
  const virtuosoRef = useRef<VirtuosoHandle>(null); // Virtuoso ref to interact with the list
  const [toast, setToast] = useState({
    title: "",
    open: false,
    description: "",
  });

  // Fetch chat history on initial load
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const storedMessages = await getMessages();
        dispatch({
          type: IFCChatActionType.LOAD_MESSAGES,
          payload: storedMessages,
        });
      } catch (error) {
        console.error("Failed to fetch messages from IndexedDB", error);
      }
    };
    fetchChatHistory();
  }, [dispatch]);

  useEffect(() => {
    if (error && error.length) {
      setToast({
        title: "Error",
        description: error || "something went wrong",
        open: true,
      });
    }
  }, [error]);

  useEffect(() => {
    (async function () {
      if (!isStreaming && streamedText) {
        const newMessage = { role: IFCRole.ASSISTANT, content: streamedText };
        dispatch({
          type: IFCChatActionType.ADD_MESSAGE,
          payload: newMessage,
        });
        saveMessage(newMessage);
        setStreamingText("");
        setStreamedText("");
        setIsAutoScroll(true);
      }
    })();
  }, [isStreaming, streamedText, setStreamingText, setStreamedText, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = { role: IFCRole.USER, content: input.trim() || "" };
      dispatch({
        type: IFCChatActionType.ADD_MESSAGE,
        payload: newMessage,
      });
      saveMessage(newMessage);
      setInput("");
      setIsAutoScroll(true);
      fetchStream({
        ...state,
        messages: [
          ...state.messages,
          { role: IFCRole.USER, content: input.trim() },
        ],
      });
    }
  };

  const handleScroll = () => {
    setIsAutoScroll(false); // Disable auto-scroll if user manually scrolls
  };

  useEffect(() => {
    // Keep the view at the bottom until streaming ends
    if (virtuosoRef.current && isAutoScroll) {
      virtuosoRef.current.scrollToIndex(messages.length - 1);
    }
  }, [messages, isAutoScroll]);

  useEffect(() => {
    // Auto-scroll while streaming is true
    if (isStreaming) {
      setIsAutoScroll(true); // Re-enable auto-scroll when streaming starts
    }
  }, [isStreaming]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Chat Messages */}
      <Virtuoso
        ref={virtuosoRef} // Assign the ref to Virtuoso
        data={messages}
        className="flex-1 scrollbar-hide"
        onWheel={handleScroll} // Disable auto-scroll on manual scroll
        itemContent={(index, message) => {
          const isLastIdx = index === messages.length - 1;
          return (
            <>
              <ChatMessage role={message.role} content={message.content} />
              {isLastIdx && isStreaming ? (
                <ChatStream
                  streamingText={streamingText}
                  isStreaming={isStreaming}
                  isThinking={isThinking}
                />
              ) : null}
            </>
          );
        }}
        overscan={200}
      />
      {/* Chat Input */}
      <ChatInput
        handleSubmit={handleSubmit}
        input={input}
        setInput={setInput}
      />
      <ThemedToast setOpen={setToast} {...toast} />
    </div>
  );
};

export default ChatWindow;
