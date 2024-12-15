"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

interface MobileNavProps {
  items?: NavItem[];
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
            <Link
              key={index.toString() + item.title}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                item.disabled && 'cursor-not-allowed opacity-60'
              )}
              onClick={onNavigate}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}