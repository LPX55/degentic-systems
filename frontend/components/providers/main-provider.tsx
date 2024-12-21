// frontend/components/Providers.tsx

"use client";

import { type ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TeamProvider } from "@/lib/context/team-context";
import { ThirdwebProvider } from "thirdweb/react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [persist, setPersist] = useState<boolean>(false);

  useEffect(() => {
    const authState = localStorage.getItem("web3AuthState");
    if (authState) {
      setPersist(JSON.parse(authState));
    }
  }, []);

  const handlePersist = (state: any) => {
    localStorage.setItem("web3AuthState", JSON.stringify(state));
  };

  return (
    <ThemeProvider>
      <TeamProvider>
        {/* <ThirdwebProvider onAuthStateChange={handlePersist} persist={persist}> */}
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </TeamProvider>
    </ThemeProvider>
  );
}