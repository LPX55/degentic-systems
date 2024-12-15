"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { NavLoading } from "./nav-loading";
import { Suspense } from "react";

interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

interface HeaderNavProps {
  items?: NavItem[];
}

function HeaderNavContent({ items }: HeaderNavProps) {
  const segment = useSelectedLayoutSegment();

  if (!items?.length) {
    return null;
  }

  return (
    <>
      {items.map((item, index) => (
        <Link
          key={index.toString() + item.title}
          href={item.disabled ? '#' : item.href}
          className={cn(
            'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
            item.href.startsWith(`/${segment}`)
              ? 'text-foreground'
              : 'text-foreground/60',
            item.disabled && 'cursor-not-allowed opacity-80'
          )}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noreferrer' : undefined}
        >
          {item.title}
        </Link>
      ))}
    </>
  );
}

export function HeaderNav(props: HeaderNavProps) {
  return (
    <nav className="hidden gap-6 md:flex">
      <Suspense fallback={<NavLoading />}>
        <HeaderNavContent {...props} />
      </Suspense>
    </nav>
  );
}