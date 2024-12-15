import { Metadata } from "next";
import { MemoryManager } from "./components/memory-manager";

export const metadata: Metadata = {
  title: "Memory Store",
  description: "Manage your agent's key-value memory storage",
};

export default function MemoryPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Memory Store</h2>
          <p className="text-muted-foreground">
            Store and manage simple key-value pairs for your agent's memory
          </p>
        </div>
        <MemoryManager />
      </div>
    </div>
  );
}
