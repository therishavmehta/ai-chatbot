"use client";
import ChatParameters from "../components/ChatParameters";
import ChatWindow from "../components/ChatWindow";
import { ChatProvider } from "../context/chatContext";

export default function Home() {

  return (
    <ChatProvider>
      <div className="flex h-screen bg-gray-900 text-white">
        {/* Chat Window */}
        <div className="flex-1 p-4">
          <ChatWindow />
        </div>

        {/* Sidebar for Parameters */}
        <div className="w-1/3 bg-gray-800 p-4 border-l border-gray-700">
          <ChatParameters />
        </div>
      </div>
    </ChatProvider>
  );
}
