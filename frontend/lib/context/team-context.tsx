"use client";

import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_TEAM_ID, DEFAULT_TEAM_NAME } from "@/lib/constants";

export interface Team {
  id: string;
  displayName: string;
}

export interface TeamContextType {
  selectedTeam: Team;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
  const defaultTeam: Team = {
    id: DEFAULT_TEAM_ID,
    displayName: DEFAULT_TEAM_NAME,
  };

  return (
    <TeamContext.Provider value={{ selectedTeam: defaultTeam }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
}