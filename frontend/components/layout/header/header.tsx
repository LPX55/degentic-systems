"use client";

import { useState } from "react";
import { HeaderLogo, HeaderNav, MobileNav } from "../nav";
import { MobileMenuButton } from "./mobile-menu-button";
import { HeaderActions } from "./header-actions";
import { NavProps } from "../types";

export function Header({ items }: NavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-background/80 px-4 md:px-6 backdrop-blur">
      <div className="flex h-16 items-center justify-between pt-6">
        <div className="flex items-center gap-4 md:gap-10">
          <HeaderLogo />
          <HeaderNav items={items} />
          <MobileMenuButton 
            isOpen={showMobileMenu}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          />
          {showMobileMenu && (
            <MobileNav 
              items={items}
              onNavigate={() => setShowMobileMenu(false)}
            />
          )}
        </div>
        <HeaderActions />
      </div>
    </header>
  );
}