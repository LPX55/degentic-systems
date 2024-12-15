"use client";

import { useTeam } from "@/lib/context/team-context";

export function TeamSwitcher() {
  const { selectedTeam } = useTeam();

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">{selectedTeam.displayName}</span>
    </div>
  );
}