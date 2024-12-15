'use client';

import { useState } from 'react';
import { HeaderLogo } from './layout/header-logo';
import { HeaderNav } from './layout/header-nav';
import { MobileMenuButton } from './layout/mobile-menu-button';
import { MobileNav } from './layout/mobile-nav';
import { AuthNav } from './auth/auth-nav';

interface LandingPageHeaderProps {
  items?: {
    title: string;
    href: string;
    disabled?: boolean;
    external?: boolean;
  }[];
}

export function LandingPageHeader({ items }: LandingPageHeaderProps) {
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
        <AuthNav />
      </div>
    </header>
  );
}