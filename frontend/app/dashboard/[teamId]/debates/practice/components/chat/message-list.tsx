"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "./message";

interface MessageListProps {
  messages: Array<{
    agent: string;
    message: string;
    timestamp: string;
  }>;
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <Message
            key={index}
            {...message}
            isCurrentAgent={message.agent === "Your Agent"}
          />
        ))}
      </div>
    </ScrollArea>
  );
}