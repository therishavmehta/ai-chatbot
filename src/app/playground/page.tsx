"use client";
import ChatParameters from "@/components/ChatParameters";
import ChatWindow from "@/components/ChatWindow";
import { ChatProvider } from "../context/chatContext";
import { useState } from "react";

export default function Playground() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ChatProvider>
      <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 text-gray-400 hover:text-white"
        >
          <span className="text-2xl">☰</span> {/* Hamburger icon */}
        </button>

        {/* Chat Window */}
        <div className="flex-1 p-4 overflow-y-auto">
          <ChatWindow />
        </div>

        {/* Sidebar for Parameters */}
        <div
          className={`w-full md:w-1/4 bg-gray-800 p-4 border-l border-gray-700 md:block ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <h2 className="text-lg font-bold mb-4">Model Configuration</h2>
          <ChatParameters />
        </div>
      </div>
    </ChatProvider>
  );
}
