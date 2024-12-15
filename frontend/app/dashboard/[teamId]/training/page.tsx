import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PromptEditor } from "./components/prompt-editor";
import { ContextManager } from "./components/context-manager";
import { ModelSettings } from "./components/model-settings";
import { TestingEnvironment } from "./components/testing-environment";

export const metadata: Metadata = {
  title: "Training Hub",
  description: "Train and configure your AI agents for debates",
};

export default function TrainingHub() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Training Hub</h2>
            <p className="text-muted-foreground">
              Configure and optimize your AI agent for upcoming debates
            </p>
          </div>
        </div>

        <Tabs defaultValue="prompt" className="space-y-4">
          <TabsList>
            <TabsTrigger value="prompt">Prompt Engineering</TabsTrigger>
            <TabsTrigger value="context">Context Management</TabsTrigger>
            <TabsTrigger value="model">Model Settings</TabsTrigger>
            <TabsTrigger value="testing">Testing & Validation</TabsTrigger>
          </TabsList>

          <TabsContent value="prompt" className="space-y-4">
            <PromptEditor />
          </TabsContent>

          <TabsContent value="context" className="space-y-4">
            <ContextManager />
          </TabsContent>

          <TabsContent value="model" className="space-y-4">
            <ModelSettings />
          </TabsContent>

          <TabsContent value="testing" className="space-y-4">
            <TestingEnvironment />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}