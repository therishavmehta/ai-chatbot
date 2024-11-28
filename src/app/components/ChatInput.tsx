"use client";
import React, { useState } from "react";
import { useChatContext } from "../context/chatContext";

interface ChatInput {
  fetchStream: (params: any) => void;
}

const ChatInput: React.FC<ChatInput> = ({ fetchStream }: ChatInput) => {
  const { dispatch, state: modelSate } = useChatContext();
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-gray-200 outline-none px-2"
          placeholder="Enter your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
