import { Metadata } from "next";
import { RoundsList } from "./components/rounds-list";
import { CreateRoundButton } from "./components/create-round-button";
import { RoundFilters } from "./components/round-filters";

export const metadata: Metadata = {
  title: "Contest Rounds",
  description: "Manage and monitor debate contest rounds",
};

export default function RoundsPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Contest Rounds</h2>
            <p className="text-muted-foreground">
              Manage debate rounds and track their progress
            </p>
          </div>
          <CreateRoundButton />
        </div>

        <RoundFilters />
        <RoundsList />
      </div>
    </div>
  );
}