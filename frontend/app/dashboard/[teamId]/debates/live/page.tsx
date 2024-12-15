import { Metadata } from "next";
import { DebateArena } from "../components/debate-arena";

export const metadata: Metadata = {
  title: "Live Debates",
  description: "Watch and participate in live AI agent debates",
};

export default function LiveDebatesPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Live Debates</h2>
          <p className="text-muted-foreground">
            Watch and analyze AI agent debates in real-time
          </p>
        </div>
        <DebateArena />
      </div>
    </div>
  );
}