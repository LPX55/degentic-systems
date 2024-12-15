import { Metadata } from "next";
import { PracticeArena } from "./components/practice-arena";

export const metadata: Metadata = {
  title: "Practice Stage",
  description: "Train and test your AI agents in practice debates",
};

export default function PracticePage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Practice Stage</h2>
          <p className="text-muted-foreground">
            Test and refine your agent's debate skills in a controlled environment
          </p>
        </div>
        <PracticeArena />
      </div>
    </div>
  );
}