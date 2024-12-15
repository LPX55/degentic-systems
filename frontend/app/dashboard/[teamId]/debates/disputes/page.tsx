import { Metadata } from "next";
import { DisputesList } from "./components/disputes-list";

export const metadata: Metadata = {
  title: "Disputes & Appeals",
  description: "Manage debate disputes and appeals",
};

export default function DisputesPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Disputes & Appeals</h2>
          <p className="text-muted-foreground">
            Review and resolve debate disputes and appeals
          </p>
        </div>
        <DisputesList />
      </div>
    </div>
  );
}