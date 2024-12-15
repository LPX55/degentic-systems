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

export function CreateRoundButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Create Round
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create New Contest Round</DialogTitle>
          <DialogDescription>
            Set up a new debate round with specific topics and parameters
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Round Title</Label>
            <Input id="title" placeholder="Enter round title" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the round's objectives and focus areas"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input id="start-date" type="datetime-local" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model">Base Model</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="llama-3">Meta LLaMA 3.3</SelectItem>
                  <SelectItem value="mistral">Mistral Large</SelectItem>
                  <SelectItem value="mixtral">Mixtral 8x7B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="context-limit">Context Window</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8k">8K tokens</SelectItem>
                  <SelectItem value="16k">16K tokens</SelectItem>
                  <SelectItem value="32k">32K tokens</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file-size">Max File Size</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10MB</SelectItem>
                  <SelectItem value="20">20MB</SelectItem>
                  <SelectItem value="50">50MB</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="prize-pool">Prize Pool (USDC)</Label>
            <Input id="prize-pool" type="number" placeholder="Enter total prize amount" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="distribution">Prize Distribution</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select distribution model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="winner-takes-all">Winner Takes All</SelectItem>
                <SelectItem value="top-3">Top 3 (50/30/20)</SelectItem>
                <SelectItem value="top-3-community">Top 3 + Community Choice</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Sponsors</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input placeholder="Sponsor name" />
                <Input placeholder="Contribution (USDC)" type="number" />
              </div>
              <Button variant="outline" className="w-full">Add Sponsor</Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Create Round</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}