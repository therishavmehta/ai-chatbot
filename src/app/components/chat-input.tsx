"use client";

import React, { useRef, useEffect, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "./ui/button";

interface ChatInput {
  handleSubmit: (e: React.FormEvent) => void;
  input: string;
  setInput: (value: string) => void;
}

const ChatInput: React.FC<ChatInput> = ({
  handleSubmit,
  input,
  setInput,
}: ChatInput) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      // Adjust the height of the textarea dynamically
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200 // Maximum height in pixels
      )}px`;
    }
  }, [input]);

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex h-auto items-center bg-background-secondary border border-border hover:border-border-hover rounded-lg p-2">
        <textarea
          ref={textareaRef}
          value={input}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value.slice(0, 1000))}
          className="flex-1 bg-transparent text-foreground-primary outline-none px-2 resize-none overflow-auto"
          placeholder="Enter your message..."
          rows={1} // Start with a single row
        />
        <Button
          type="submit"
          disabled={!input.trim()} // Disable Button if input is empty
          variant="ghost"
        >
          <Send />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
