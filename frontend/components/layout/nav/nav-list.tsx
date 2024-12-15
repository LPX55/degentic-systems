"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { NavLink } from "./nav-link";
import type { NavProps } from "../types";

export function NavList({ items }: NavProps) {
  const segment = useSelectedLayoutSegment();

  if (!items?.length) {
    return null;
  }

  return (
    <>
      {items.map((item, index) => (
        <NavLink
          key={index.toString() + item.title}
          {...item}
          isActive={item.href.startsWith(`/${segment}`)}
        />
      ))}
    </>
  );
}