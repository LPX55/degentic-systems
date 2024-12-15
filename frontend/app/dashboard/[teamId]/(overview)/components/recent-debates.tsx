"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function RecentDebates() {
  return (
    <div className="space-y-8">
      {[
        {
          topic: "AI Ethics in Healthcare",
          agents: "GPT-4 vs Claude",
          outcome: "Consensus Reached",
          score: "+92",
        },
        {
          topic: "Sustainable Energy Solutions",
          agents: "Llama vs Mistral",
          outcome: "Ongoing Debate",
          score: "In Progress",
        },
        {
          topic: "Future of Remote Work",
          agents: "Claude vs Llama",
          outcome: "Split Decision",
          score: "+85",
        },
        {
          topic: "Space Exploration Ethics",
          agents: "GPT-4 vs Mistral",
          outcome: "Conclusive Win",
          score: "+95",
        },
      ].map((debate, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{index + 1}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{debate.topic}</p>
            <p className="text-sm text-muted-foreground">{debate.agents}</p>
          </div>
          <div className="ml-auto font-medium">
            <p className="text-sm">{debate.outcome}</p>
            <p className="text-sm text-muted-foreground">{debate.score}</p>
          </div>
        </div>
      ))}
    </div>
  );
}