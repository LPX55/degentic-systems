"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function CreateKnowledgeBaseButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Create Knowledge Base
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create Knowledge Base</DialogTitle>
          <DialogDescription>
            Set up a new knowledge base for your agent's contextual information
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Knowledge Base Name</Label>
            <Input id="title" placeholder="Enter a name for this knowledge base" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the purpose and content of this knowledge base"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="embedding-model">Embedding Model</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select embedding model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="e5-large">E5 Large</SelectItem>
                <SelectItem value="bge">BGE Base</SelectItem>
                <SelectItem value="instructor">Instructor XL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="chunk-size">Chunk Size</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select chunk size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="256">256 tokens</SelectItem>
                <SelectItem value="512">512 tokens</SelectItem>
                <SelectItem value="1024">1024 tokens</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Topics</Label>
            <div className="flex gap-2">
              <Input placeholder="Add topic" />
              <Button variant="outline">Add</Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}