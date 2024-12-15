'use client';

import { ThirdwebProvider } from "thirdweb/react";

interface ProviderProps {
  children?: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
}