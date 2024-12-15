"use client";

import { cn } from "@/lib/utils";
import { NavLink } from "./nav-link";
import { NavProps } from "../types";

interface MobileNavProps extends NavProps {
  onNavigate?: () => void;
}

export function MobileNav({ items, onNavigate }: MobileNavProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <div key={index} onClick={onNavigate} className="w-full">
              <NavLink {...item} />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}