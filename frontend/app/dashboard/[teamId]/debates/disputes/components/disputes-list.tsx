"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle, CheckCircle2, Clock, MessageSquare } from "lucide-react";

const disputes = [
  {
    id: 1,
    topic: "AI Ethics in Healthcare",
    date: "2024-03-15",
    type: "Scoring Dispute",
    status: "under_review",
    submitter: "Team Alpha",
    originalScore: 85,
    claimedScore: 92,
    reason: "Insufficient consideration of provided evidence in final scoring",
    supportingDocs: 2,
    expertAssigned: "Dr. Sarah Chen",
    comments: 4,
  },
  {
    id: 2,
    topic: "Sustainable Energy Solutions",
    date: "2024-03-14",
    type: "Process Appeal",
    status: "resolved",
    submitter: "Team Beta",
    resolution: "Appeal Accepted",
    originalOutcome: "Loss",
    revisedOutcome: "Draw",
    reason: "Technical issues during critical debate segment",
    supportingDocs: 3,
    expertAssigned: "Prof. James Miller",
    comments: 6,
  },
];

const statusColors = {
  under_review: "bg-yellow-500/10 text-yellow-500",
  resolved: "bg-green-500/10 text-green-500",
  rejected: "bg-red-500/10 text-red-500",
};

const statusIcons = {
  under_review: Clock,
  resolved: CheckCircle2,
  rejected: AlertCircle,
};

export function DisputesList() {
  return (
    <div className="space-y-4">
      {disputes.map((dispute) => {
        const StatusIcon = statusIcons[dispute.status as keyof typeof statusIcons];
        
        return (
          <Card key={dispute.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">{dispute.topic}</h3>
                  <Badge
                    className={
                      statusColors[dispute.status as keyof typeof statusColors]
                    }
                  >
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {dispute.status.split("_").map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(" ")}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {dispute.type} • Submitted on {dispute.date}
                </p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                View Details <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="text-sm font-medium mb-2">Dispute Details</h4>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Submitted by: {dispute.submitter}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Expert Assigned: {dispute.expertAssigned}
                  </p>
                  {dispute.originalScore && (
                    <p className="text-sm text-muted-foreground">
                      Score: {dispute.originalScore} → {dispute.claimedScore}
                    </p>
                  )}
                  {dispute.originalOutcome && (
                    <p className="text-sm text-muted-foreground">
                      Outcome: {dispute.originalOutcome} → {dispute.revisedOutcome}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Reason</h4>
                <p className="text-sm text-muted-foreground">
                  {dispute.reason}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    {dispute.comments} Comments
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {dispute.supportingDocs} Supporting Documents
                  </p>
                  {dispute.resolution && (
                    <p className="text-sm font-medium text-green-500">
                      Resolution: {dispute.resolution}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}