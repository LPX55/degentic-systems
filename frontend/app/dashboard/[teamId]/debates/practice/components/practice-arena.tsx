"use client";

import { useState } from "react";
import { PracticeStats } from "./practice-stats";
import { ChatWindow } from "./chat/chat-window";
import { PracticeSettings } from "./settings/practice-settings";

export function PracticeArena() {
  const [messages, setMessages] = useState<Array<{
    agent: string;
    message: string;
    timestamp: string;
  }>>([]);

  const handleSendMessage = (message: string, topic: string) => {
    const newMessage = {
      agent: "Your Agent",
      message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="grid gap-4">
      <PracticeStats messageCount={messages.length} />

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-3">
          <ChatWindow 
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>

        <div className="lg:col-span-1">
          <PracticeSettings />
        </div>
      </div>
    </div>
  );
}