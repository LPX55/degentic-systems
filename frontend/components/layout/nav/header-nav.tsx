"use client";

import { Suspense } from "react";
import { NavList } from "./nav-list";
import { NavLoading } from "./nav-loading";
import type { NavProps } from "../types";

export function HeaderNav(props: NavProps) {
  return (
    <nav className="hidden gap-6 md:flex">
      <Suspense fallback={<NavLoading />}>
        <NavList {...props} />
      </Suspense>
    </nav>
  );
}