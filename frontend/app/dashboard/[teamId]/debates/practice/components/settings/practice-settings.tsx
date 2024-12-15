"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PracticeSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Practice Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Opponent Model</label>
          <Select defaultValue="llama">
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="llama">Meta LLaMA 3.3</SelectItem>
              <SelectItem value="mistral">Mistral Large</SelectItem>
              <SelectItem value="mixtral">Mixtral 8x7B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Difficulty Level</label>
          <Select defaultValue="medium">
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Debate Style</label>
          <Select defaultValue="structured">
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="structured">Structured</SelectItem>
              <SelectItem value="freestyle">Freestyle</SelectItem>
              <SelectItem value="socratic">Socratic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4">
          <Button className="w-full">Start New Session</Button>
        </div>
      </CardContent>
    </Card>
  );
}