"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SidebarContent } from "./sidebar-content";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ColorModeSwitcher } from "@/components/color-mode-switcher";
import { HeaderBreadcrumb } from "./header-breadcrumb";
import type { SidebarItem } from "@/lib/types";
import { TW } from "@/components/connect/connect-btn";

interface HeaderBreadcrumbItem {
  title: string;
  href: string;
}

interface SidebarLayoutProps {
  children?: React.ReactNode;
  baseBreadcrumb?: HeaderBreadcrumbItem[];
  items: SidebarItem[];
  sidebarTop?: React.ReactNode;
  basePath: string;
}

export default function SidebarLayout({
  children,
  baseBreadcrumb,
  items,
  sidebarTop,
  basePath,
}: SidebarLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full flex">
      <div className="flex-col border-r w-[240px] h-screen sticky top-0 hidden md:flex">
        <SidebarContent items={items} sidebarTop={sidebarTop} basePath={basePath} />
      </div>
      <div className="flex flex-col flex-grow w-0">
        <div className="h-14 border-b flex items-center justify-between sticky top-0 bg-background z-10 px-4 md:px-6">
          <div className="hidden md:flex">
            <HeaderBreadcrumb baseBreadcrumb={baseBreadcrumb} basePath={basePath} items={items} />
          </div>

          <div className="flex md:hidden items-center">
            <Sheet
              onOpenChange={(open) => setSidebarOpen(open)}
              open={sidebarOpen}
            >
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] p-0">
                <SidebarContent
                  onNavigate={() => setSidebarOpen(false)}
                  items={items}
                  sidebarTop={sidebarTop}
                  basePath={basePath}
                />
              </SheetContent>
            </Sheet>

            <div className="ml-4 flex md:hidden">
              <HeaderBreadcrumb baseBreadcrumb={baseBreadcrumb} basePath={basePath} items={items} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TW />
            <ColorModeSwitcher />
          </div>
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}