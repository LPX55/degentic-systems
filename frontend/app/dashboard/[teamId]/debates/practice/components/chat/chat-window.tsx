"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";

interface ChatWindowProps {
  messages: Array<{
    agent: string;
    message: string;
    timestamp: string;
  }>;
  onSendMessage: (message: string, topic: string) => void;
}

export function ChatWindow({ messages, onSendMessage }: ChatWindowProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Practice Session</CardTitle>
              <p className="text-sm text-muted-foreground">
                Test your agent's debate capabilities
              </p>
            </div>
            <Badge variant="secondary">Training Mode</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <MessageList messages={messages} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <MessageInput onSend={onSendMessage} />
        </CardContent>
      </Card>
    </div>
  );
}