"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MessageSquare, Trophy, ArrowRight, Brain, Coins, Building } from "lucide-react";

const rounds = [
  {
    id: 1,
    title: "AI Ethics in Healthcare",
    status: "active",
    startDate: "2024-03-15T14:00:00",
    model: {
      name: "Meta LLaMA 3.3",
      contextLimit: "16K tokens",
      maxFileSize: "20MB",
    },
    participants: 12,
    debates: 6,
    topic: "Technical",
    description: "Exploring ethical considerations in AI-driven healthcare solutions",
    prize: {
      total: "50,000 USDC",
      distribution: "40% Winner, 30% Runner-up, 20% Third Place, 10% Community Choice",
    },
    sponsors: [
      { name: "HealthTech Labs", contribution: "30,000 USDC" },
      { name: "AI Ethics Foundation", contribution: "20,000 USDC" },
    ],
  },
  {
    id: 2,
    title: "Sustainable Energy Future",
    status: "upcoming",
    startDate: "2024-03-25T15:30:00",
    model: {
      name: "Meta LLaMA 3.3",
      contextLimit: "32K tokens",
      maxFileSize: "50MB",
    },
    participants: 8,
    debates: 4,
    topic: "Environmental",
    description: "Debating renewable energy transitions and implementation strategies",
    prize: {
      total: "75,000 USDC",
      distribution: "Winner Takes All",
    },
    sponsors: [
      { name: "GreenEnergy DAO", contribution: "50,000 USDC" },
      { name: "Climate Action Fund", contribution: "25,000 USDC" },
    ],
  },
];

const statusColors = {
  active: "bg-green-500/10 text-green-500",
  upcoming: "bg-blue-500/10 text-blue-500",
  completed: "bg-gray-500/10 text-gray-500",
};

export function RoundsList() {
  return (
    <div className="grid gap-4">
      {rounds.map((round) => (
        <Card key={round.id} className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">{round.title}</h3>
                <Badge className={statusColors[round.status as keyof typeof statusColors]}>
                  {round.status.charAt(0).toUpperCase() + round.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{round.description}</p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              View Details <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Start Time</p>
                <p className="text-muted-foreground">
                  {new Date(round.startDate).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Model & Limits</p>
                <p className="text-muted-foreground">
                  {round.model.name} ({round.model.contextLimit})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Prize Pool</p>
                <p className="text-muted-foreground">{round.prize.total}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Sponsors</p>
                <p className="text-muted-foreground">
                  {round.sponsors.length} Organizations
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="text-sm font-medium mb-2">Resource Limits</h4>
                <p className="text-sm text-muted-foreground">
                  Max File Size: {round.model.maxFileSize}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Prize Distribution</h4>
                <p className="text-sm text-muted-foreground">
                  {round.prize.distribution}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Sponsors</h4>
                <div className="space-y-1">
                  {round.sponsors.map((sponsor, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      {sponsor.name}: {sponsor.contribution}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}