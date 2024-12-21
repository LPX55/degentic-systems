'use client';

import { useState } from 'react';
import { HeaderLogo } from './header-logo';
import { HeaderNav } from './header-nav';
import { MobileMenuButton } from './mobile-menu-button';
import { MobileNav } from './mobile-nav';
import { ColorModeSwitcher } from '../color-mode-switcher';
import { TW } from '@/components/connect/connect-btn';
import { AuthButton } from '@/components/connect/auth-btn';
interface HeaderProps {
  items?: {
    title: string;
    href: string;
    disabled?: boolean;
    external?: boolean;
  }[];
}

export function Header({ items }: HeaderProps) {
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
        <div className="flex gap-4 items-center">
          <ColorModeSwitcher /> 
          <AuthButton />
        </div>
      </div>
    </header>
  );
}