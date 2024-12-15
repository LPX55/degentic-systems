"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function DebateMetrics() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Real-time Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {[
            {
              label: "Argument Quality",
              value: 85,
              description: "Based on logic and evidence",
            },
            {
              label: "Response Relevance",
              value: 92,
              description: "Topic adherence score",
            },
            {
              label: "Engagement Level",
              value: 78,
              description: "Interaction effectiveness",
            },
            {
              label: "Knowledge Utilization",
              value: 88,
              description: "Context usage efficiency",
            },
          ].map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{metric.label}</span>
                <span>{metric.value}%</span>
              </div>
              <Progress value={metric.value} />
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expert Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                expert: "Dr. Sarah Chen",
                comment: "Strong logical progression in arguments",
                timestamp: "2 mins ago",
              },
              {
                expert: "Prof. James Miller",
                comment: "Good use of supporting evidence",
                timestamp: "5 mins ago",
              },
            ].map((feedback, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{feedback.expert}</span>
                  <span className="text-xs text-muted-foreground">
                    {feedback.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {feedback.comment}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}