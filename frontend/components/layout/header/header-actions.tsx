"use client";

import { ColorModeSwitcher } from "@/components/color-mode-switcher";
import { TW } from "@/components/connect/connect-btn";

export function HeaderActions() {
  return (
    <div className="flex gap-4 items-center">
      <div className="transform scale-75"><TW /></div>
      <ColorModeSwitcher />
    </div>
  );
}