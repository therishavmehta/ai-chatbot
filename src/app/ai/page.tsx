import { ChatHeader } from "@/components/chat-header";
import { ChatInput } from "@/components/chat-input";
import { ChatMessages } from "@/components/chat-messages";
import { SidebarControls } from "@/components/sidebar-controls";
import { ChatProvider, useChatContext } from "@/context/chatContext";

export default function Ai() {
  return (
    <ChatProvider>
      <div className="flex h-screen flex-col bg-background-primary text-foreground-primary">
        <ChatHeader />
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto">
            <ChatMessages />
          </div>
          <div className="w-80">
            <SidebarControls />
          </div>
        </div>
        <ChatInput />
      </div>
    </ChatProvider>
  );
}
