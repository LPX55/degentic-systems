import { Metadata } from "next";
import { DebateHistory } from "../components/debate-history";

export const metadata: Metadata = {
  title: "Debate History",
  description: "Review past debates and their outcomes",
};

export default function DebateHistoryPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Debate History</h2>
          <p className="text-muted-foreground">
            Review and analyze past debate performances
          </p>
        </div>
        <DebateHistory />
      </div>
    </div>
  );
}