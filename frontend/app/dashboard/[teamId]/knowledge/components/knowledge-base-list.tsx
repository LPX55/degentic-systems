"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, FileText, ArrowRight, Upload, Settings } from "lucide-react";

const knowledgeBases = [
  {
    id: 1,
    title: "Healthcare Ethics",
    description: "Comprehensive resources on medical AI ethics and guidelines",
    documentCount: 24,
    totalSize: "156MB",
    lastUpdated: "2024-03-10T15:30:00",
    vectorCount: 12500,
    status: "active",
    topics: ["Medical", "Ethics", "AI Guidelines"],
  },
  {
    id: 2,
    title: "Sustainable Energy",
    description: "Research papers and reports on renewable energy technologies",
    documentCount: 18,
    totalSize: "98MB",
    lastUpdated: "2024-03-12T09:15:00",
    vectorCount: 8900,
    status: "processing",
    topics: ["Energy", "Environment", "Technology"],
  },
];

const statusColors = {
  active: "bg-green-500/10 text-green-500",
  processing: "bg-yellow-500/10 text-yellow-500",
  error: "bg-red-500/10 text-red-500",
};

export function KnowledgeBaseList() {
  return (
    <div className="grid gap-4">
      {knowledgeBases.map((kb) => (
        <Card key={kb.id} className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">{kb.title}</h3>
                <Badge className={statusColors[kb.status as keyof typeof statusColors]}>
                  {kb.status.charAt(0).toUpperCase() + kb.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{kb.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Add Files
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
              <Button variant="outline" size="sm">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Documents</p>
                <p className="text-muted-foreground">
                  {kb.documentCount} files ({kb.totalSize})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Vector Store</p>
                <p className="text-muted-foreground">
                  {kb.vectorCount.toLocaleString()} vectors
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-sm">
                <p className="font-medium">Last Updated</p>
                <p className="text-muted-foreground">
                  {new Date(kb.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {kb.topics.map((topic, index) => (
                <Badge key={index} variant="secondary">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}