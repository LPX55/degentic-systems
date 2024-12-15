import { Metadata } from "next";
import { KnowledgeBaseList } from "./components/knowledge-base-list";
import { CreateKnowledgeBaseButton } from "./components/create-knowledge-base-button";
import { KnowledgeBaseStats } from "./components/knowledge-base-stats";

export const metadata: Metadata = {
  title: "Knowledge Base",
  description: "Manage and organize your agent's knowledge sources",
};

export default function KnowledgeBasePage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Knowledge Base</h2>
            <p className="text-muted-foreground">
              Organize and manage your agent's contextual knowledge
            </p>
          </div>
          <CreateKnowledgeBaseButton />
        </div>

        <KnowledgeBaseStats />
        <KnowledgeBaseList />
      </div>
    </div>
  );
}