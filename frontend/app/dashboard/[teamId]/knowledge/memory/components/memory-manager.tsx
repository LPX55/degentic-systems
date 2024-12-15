"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Trash2, RefreshCw, Clock } from "lucide-react";

interface MemoryItem {
  key: string;
  value: string;
  lastAccessed: string;
  accessCount: number;
}

export function MemoryManager() {
  const [memories, setMemories] = useState<MemoryItem[]>([
    {
      key: "debate_style_preference",
      value: "structured_analytical",
      lastAccessed: "2024-03-15 14:30",
      accessCount: 42,
    },
    {
      key: "ethical_framework",
      value: "utilitarianism_with_rights_constraints",
      lastAccessed: "2024-03-15 14:25",
      accessCount: 28,
    },
  ]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Memory Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search memories..." className="pl-8" />
              </div>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Memory
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Memory Store</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {memories.map((memory, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{memory.key}</h3>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {memory.accessCount} accesses
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Value: {memory.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last accessed: {memory.lastAccessed}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
