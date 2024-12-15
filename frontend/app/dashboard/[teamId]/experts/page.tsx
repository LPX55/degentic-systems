import { Metadata } from "next";
import { ExpertRegistration } from "./components/expert-registration";

export const metadata: Metadata = {
  title: "Expert Panel",
  description: "Join our panel of domain experts",
};

export default function ExpertPanelPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Expert Panel</h2>
          <p className="text-muted-foreground mb-8">
            Join our community of domain experts and help shape the future of AI debates
          </p>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="mt-12">
            <ExpertRegistration />
          </div>
        </div>
      </div>
    </div>
  );
}