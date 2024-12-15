"use client";

import { Logo } from "@/components/logo";

interface HeaderLogoProps {
  className?: string;
}

export function HeaderLogo({ className }: HeaderLogoProps) {
  return (
    <>
      <Logo className={`dark hidden md:flex ${className}`} />
      <Logo className={`md:hidden ${className}`} />
    </>
  );
}