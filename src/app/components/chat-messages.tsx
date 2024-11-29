"use client";
import { Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";
import { useChatContext } from "@/context/chatContext";
import { ChatMessage } from "./chat-message";
import { useStreamedText } from "@/hooks/useStreamedText";
import { useEffect } from "react";
interface ChatMessageProps {
  role: "system" | "user" | "assistant";
  content: string;
}

export function ChatMessages() {
  const {
    state: { messages },
  } = useChatContext();
  const { streamedText, isStreaming } = useStreamedText();
  console.log(isStreaming, streamedText);

  return (
    <>
      {messages.map((message, idx) => (
        <ChatMessage key={idx} {...message} />
      ))}
      {isStreaming && (
        <ChatMessage key={"streamed"} role="assistant" content={streamedText} />
      )}
    </>
  );
}
