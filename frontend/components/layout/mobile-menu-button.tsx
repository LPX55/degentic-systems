'use client';

import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <Button
      className="space-x-2 md:hidden"
      variant="ghost"
      size="icon"
      onClick={onClick}
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <Menu className="h-6 w-6" />
      )}
    </Button>
  );
}