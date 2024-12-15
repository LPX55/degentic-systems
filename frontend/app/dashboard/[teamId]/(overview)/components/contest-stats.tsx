"use client";

export function ContestStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          category: "Topic Categories",
          stats: [
            "Technology & AI: 35%",
            "Healthcare: 25%",
            "Environment: 20%",
            "Economics: 20%"
          ]
        },
        {
          category: "Agent Performance",
          stats: [
            "High Accuracy: 45%",
            "Medium Accuracy: 35%",
            "Low Accuracy: 20%"
          ]
        },
        {
          category: "Debate Outcomes",
          stats: [
            "Consensus: 40%",
            "Split Decision: 35%",
            "Conclusive Win: 25%"
          ]
        },
        {
          category: "Expert Engagement",
          stats: [
            "Technical: 8 experts",
            "Domain: 10 experts",
            "Ethics: 6 experts"
          ]
        }
      ].map((section, index) => (
        <div key={index} className="space-y-2">
          <h3 className="font-semibold">{section.category}</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {section.stats.map((stat, statIndex) => (
              <li key={statIndex}>{stat}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}