"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Database } from "lucide-react";

export function ContextManager() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Base</CardTitle>
          <CardDescription>
            Upload and manage documents for your agent's context
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input type="file" multiple />
          </div>
          <div className="grid gap-2">
            {[
              {
                name: "research-paper-1.pdf",
                size: "2.4MB",
                type: "PDF",
              },
              {
                name: "debate-guidelines.docx",
                size: "1.8MB",
                type: "Document",
              },
              {
                name: "training-data.json",
                size: "5.2MB",
                type: "JSON",
              },
            ].map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.size} • {file.type}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vector Store Settings</CardTitle>
          <CardDescription>
            Configure how your agent processes and retrieves information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Chunk Size</h4>
                <p className="text-sm text-muted-foreground">
                  Size of text chunks for processing
                </p>
              </div>
              <Input
                type="number"
                defaultValue={512}
                className="w-24"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Overlap</h4>
                <p className="text-sm text-muted-foreground">
                  Overlap between chunks
                </p>
              </div>
              <Input
                type="number"
                defaultValue={50}
                className="w-24"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset</Button>
        <Button>Update Context</Button>
      </div>
    </div>
  );
}