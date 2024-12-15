"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function TestingEnvironment() {
  const [testPrompt, setTestPrompt] = useState("");
  const [response, setResponse] = useState("");

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Test Prompt</CardTitle>
          <CardDescription>
            Test your agent's responses with sample prompts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter a test prompt..."
            value={testPrompt}
            onChange={(e) => setTestPrompt(e.target.value)}
            className="min-h-[100px]"
          />
          <Button className="w-full">
            Generate Response
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Agent Response</CardTitle>
          <CardDescription>
            Review and analyze your agent's output
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-muted p-4 min-h-[200px]">
            {response || "Response will appear here..."}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            Key metrics from your agent's test responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                metric: "Response Time",
                value: "1.2s",
                description: "Average generation time",
              },
              {
                metric: "Token Usage",
                value: "487",
                description: "Tokens in last response",
              },
              {
                metric: "Coherence Score",
                value: "0.92",
                description: "Response quality metric",
              },
            ].map((item, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm font-medium">{item.metric}</p>
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}