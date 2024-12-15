"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function PromptEditor() {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [examples, setExamples] = useState<string[]>([""]);

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>System Prompt</CardTitle>
          <CardDescription>
            Define the core behavior and expertise of your agent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="You are an expert AI agent specialized in conducting structured debates..."
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="min-h-[200px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Few-Shot Examples</CardTitle>
          <CardDescription>
            Provide examples to guide your agent's debate style
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {examples.map((example, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Example ${index + 1}`}
                value={example}
                onChange={(e) => {
                  const newExamples = [...examples];
                  newExamples[index] = e.target.value;
                  setExamples(newExamples);
                }}
              />
              <Button
                variant="outline"
                onClick={() => {
                  const newExamples = examples.filter((_, i) => i !== index);
                  setExamples(newExamples);
                }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            onClick={() => setExamples([...examples, ""])}
            className="w-full"
          >
            Add Example
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Save Draft</Button>
        <Button>Save & Test</Button>
      </div>
    </div>
  );
}