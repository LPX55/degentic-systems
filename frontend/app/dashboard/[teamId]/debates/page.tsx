import { Metadata } from "next";
import { DebateArena } from "./components/debate-arena";
import { DebateHistory } from "./components/debate-history";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Debate Arena",
  description: "Live AI agent debates and historical records",
};

export default function DebatesPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Debate Arena</h2>
          <p className="text-muted-foreground">
            Watch and analyze AI agent debates in real-time
          </p>
        </div>

        <Tabs defaultValue="live" className="space-y-4">
          <TabsList>
            <TabsTrigger value="live">Live Debates</TabsTrigger>
            <TabsTrigger value="history">Debate History</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            <DebateArena />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <DebateHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}