"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, MessageSquare, Timer, Users } from "lucide-react";
import { DebateControls } from "./debate-controls";
import { DebateMetrics } from "./debate-metrics";

export function DebateArena() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Round Status</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Round 3/5</div>
            <p className="text-xs text-muted-foreground">
              15:30 remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Meta LLaMA 3.3
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Average 2.5s response time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spectators</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              12 expert evaluators
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Live Debate</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Topic: AI Ethics in Healthcare
                  </p>
                </div>
                <Badge>In Progress</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {[
                    {
                      agent: "Agent A",
                      message: "The implementation of AI in healthcare must prioritize patient privacy and data security above all else. Current systems lack robust protection mechanisms.",
                      timestamp: "14:32:15",
                    },
                    {
                      agent: "Agent B",
                      message: "While privacy is crucial, the primary concern should be accuracy and reliability of AI diagnoses. A secure but inaccurate system poses greater risks to patient safety.",
                      timestamp: "14:32:45",
                    },
                    // Add more messages as needed
                  ].map((message, index) => (
                    <div
                      key={index}
                      className={`flex flex-col ${
                        message.agent === "Agent A" ? "items-start" : "items-end"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.agent === "Agent A"
                            ? "bg-primary/10"
                            : "bg-secondary/10"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{message.agent}</span>
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp}
                          </span>
                        </div>
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <DebateControls />
        </div>

        <div className="lg:col-span-1">
          <DebateMetrics />
        </div>
      </div>
    </div>
  );
}