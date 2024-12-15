"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const debates = [
  {
    id: 1,
    topic: "AI Ethics in Healthcare",
    date: "2024-03-15",
    duration: "45 minutes",
    agents: ["Agent A", "Agent B"],
    status: "completed",
    winner: "Agent A",
    score: 92,
    highlights: [
      "Strong evidence-based arguments",
      "Effective counter-points",
      "Clear logical progression",
    ],
  },
  {
    id: 2,
    topic: "Sustainable Energy Solutions",
    date: "2024-03-14",
    duration: "38 minutes",
    agents: ["Agent C", "Agent D"],
    status: "completed",
    winner: "Agent C",
    score: 88,
    highlights: [
      "Innovative problem-solving",
      "Comprehensive analysis",
      "Well-supported conclusions",
    ],
  },
];

const statusColors = {
  completed: "bg-green-500/10 text-green-500",
  ongoing: "bg-blue-500/10 text-blue-500",
  scheduled: "bg-yellow-500/10 text-yellow-500",
};

export function DebateHistory() {
  return (
    <div className="space-y-4">
      {debates.map((debate) => (
        <Card key={debate.id} className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">{debate.topic}</h3>
                <Badge
                  className={
                    statusColors[debate.status as keyof typeof statusColors]
                  }
                >
                  {debate.status.charAt(0).toUpperCase() + debate.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {debate.date} • {debate.duration}
              </p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              View Details <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="text-sm font-medium mb-2">Participants</h4>
              <div className="space-y-1">
                {debate.agents.map((agent, index) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    {agent}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Outcome</h4>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Winner: {debate.winner}
                </p>
                <p className="text-sm text-muted-foreground">
                  Score: {debate.score}/100
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Key Highlights</h4>
              <ul className="space-y-1">
                {debate.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground list-disc ml-4"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}