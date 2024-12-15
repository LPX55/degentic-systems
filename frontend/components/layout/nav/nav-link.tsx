"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import type { NavItem } from "../types";

interface NavLinkProps extends NavItem {
  isActive?: boolean;
}

export function NavLink({ title, href, disabled, external, isActive }: NavLinkProps) {
  return (
    <Link
      href={disabled ? '#' : href}
      className={cn(
        'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
        isActive ? 'text-foreground' : 'text-foreground/60',
        disabled && 'cursor-not-allowed opacity-80'
      )}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {title}
    </Link>
  );
}