import type React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider';
import { TeamProvider } from '@/lib/context/team-context';
import { ThirdwebProvider } from "thirdweb/react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Degentic Systems',
  description: 'An Experimental Hybrid-Learning Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
          <ThemeProvider>
            <TeamProvider>
            <ThirdwebProvider>
              {children}
            </ThirdwebProvider>
          </TeamProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}