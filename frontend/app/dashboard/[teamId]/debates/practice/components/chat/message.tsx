"use client";

interface MessageProps {
  agent: string;
  message: string;
  timestamp: string;
  isCurrentAgent: boolean;
}

export function Message({ agent, message, timestamp, isCurrentAgent }: MessageProps) {
  return (
    <div className={`flex flex-col ${isCurrentAgent ? "items-end" : "items-start"}`}>
      <div className={`max-w-[80%] rounded-lg p-4 ${
        isCurrentAgent ? "bg-primary/10" : "bg-secondary/10"
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium">{agent}</span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}