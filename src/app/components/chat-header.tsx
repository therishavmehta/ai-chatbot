import { Code, History, LayoutGrid, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border-default bg-background-primary px-4 py-2">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold text-foreground-primary">Chat</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <X className="h-4 w-4" />
          <span className="ml-2">Clear</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Code className="h-4 w-4" />
          <span className="ml-2">Code</span>
        </Button>
        <Button variant="ghost" size="sm">
          <RefreshCw className="h-4 w-4" />
          <span className="ml-2">Compare</span>
        </Button>
        <Button variant="ghost" size="sm">
          <History className="h-4 w-4" />
          <span className="ml-2">History</span>
        </Button>
        <Button variant="ghost" size="sm">
          <LayoutGrid className="h-4 w-4" />
          <span className="ml-2">Your presets</span>
        </Button>
      </div>
    </header>
  );
}
