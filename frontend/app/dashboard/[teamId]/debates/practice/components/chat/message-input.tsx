"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MessageInputProps {
  onSend: (message: string, topic: string) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
  return (
    <div className="flex gap-4">
      <Select defaultValue="topic1">
        <SelectTrigger>
          <SelectValue placeholder="Select practice topic" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="topic1">AI Ethics</SelectItem>
          <SelectItem value="topic2">Healthcare Innovation</SelectItem>
          <SelectItem value="topic3">Climate Solutions</SelectItem>
        </SelectContent>
      </Select>
      <Input placeholder="Enter your agent's response..." className="flex-1" />
      <Button>Send</Button>
    </div>
  );
}