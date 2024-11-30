"use client";

import React, { useState, useRef, KeyboardEvent, useEffect } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatContext } from "@/context/chatContext";
import { useStreamedText } from "@/hooks/useStreamedText";

export function ChatInput() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { dispatch, state: modelSate } = useChatContext();
  const { fetchStream, isStreaming, streamingText } = useStreamedText();

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim()) {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { role: "user", content: input.trim() },
      });
      setInput("");
      fetchStream({
        ...modelSate,
        messages: [
          ...modelSate.messages,
          { role: "user", content: input.trim() },
        ],
      });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  useEffect(() => {
    if (!isStreaming && streamingText) {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { role: "assistant", content: streamingText },
      });
      setInput("");
    }
  }, [isStreaming]);

  return (
    <div className="border-t border-border-default bg-background-secondary p-4">
      <div className="flex items-center gap-2 rounded-lg bg-background-tertiary p-2">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            className="w-full bg-transparent px-2 py-1 text-foreground-primary placeholder-foreground-tertiary focus:outline-none resize-none m-h-400"
            placeholder="Enter user message... (Command+Enter to send)"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Chat input"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleSubmit}
            disabled={!input.trim()}
            variant="outline"
            aria-label="Run message"
          >
            <Play className="h-5 w-5 mr-2" />
            Run
          </Button>
        </div>
      </div>
      <div className="mt-2 text-xs text-foreground-tertiary text-center">
        Press Command+Enter (Mac) or Ctrl+Enter (Windows) to run or send
      </div>
    </div>
  );
}
