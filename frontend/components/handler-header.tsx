'use client';

import { useTheme } from "next-themes";
import { Logo } from "./logo";
import { TW } from "@/components/connect/connect-btn"
export default function HandlerHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <header className="fixed w-full z-50 p-4 h-14 flex items-center py-4 border-b justify-between bg-background">
        <Logo link={"/"}/>

        <div className="flex items-center justify-end gap-5">
          <TW />
          {/* <UserButton colorModeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} /> */}
        </div>
      </header>
      <div className="min-h-14"/> {/* Placeholder for fixed header */}
    </>
  );
}