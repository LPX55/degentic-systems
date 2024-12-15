"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pause, Play, SkipForward, Flag } from "lucide-react";

export function DebateControls() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Pause className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              Flag for Review
            </Button>
            <Button>End Round</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}