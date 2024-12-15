"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export function ModelSettings() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Base Model Selection</CardTitle>
          <CardDescription>
            Choose and configure your base LLM
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select defaultValue="llama-3">
            <SelectTrigger>
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="llama-3">Meta LLaMA 3.3</SelectItem>
              <SelectItem value="mistral">Mistral Large</SelectItem>
              <SelectItem value="mixtral">Mixtral 8x7B</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generation Parameters</CardTitle>
          <CardDescription>
            Fine-tune your model's output behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Temperature</label>
                <span className="text-sm text-muted-foreground">0.7</span>
              </div>
              <Slider
                defaultValue={[0.7]}
                max={2}
                step={0.1}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Controls randomness in the output
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Top P</label>
                <span className="text-sm text-muted-foreground">0.9</span>
              </div>
              <Slider
                defaultValue={[0.9]}
                max={1}
                step={0.05}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Nucleus sampling parameter
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Max Tokens</label>
                <span className="text-sm text-muted-foreground">2048</span>
              </div>
              <Slider
                defaultValue={[2048]}
                max={4096}
                step={256}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Maximum length of generated responses
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Apply Settings</Button>
      </div>
    </div>
  );
}