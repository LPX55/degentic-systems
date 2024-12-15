"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ColorModeSwitcher } from "./color-mode-switcher";
import type { SidebarItem } from "@/lib/types";
import { useSegment } from "@/lib/hooks/use-segment";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { NavItem } from "@/components/layout/sidebar/nav-item";
import { Separator } from "./ui/separator";

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

function HeaderBreadcrumb({ items, baseBreadcrumb, basePath }: {
  items: SidebarItem[];
  baseBreadcrumb?: HeaderBreadcrumbItem[];
  basePath: string;
}) {
  const segment = useSegment(basePath);
  const item = items.find((item) => item.type === 'item' && item.href === segment);
  const title = item?.type === 'item' ? item.name : undefined;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {baseBreadcrumb?.map((item, index) => (
          <React.Fragment key={index.toString() + item.title}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function SidebarContent({ 
  onNavigate, 
  items, 
  sidebarTop, 
  basePath 
}: {
  onNavigate?: () => void;
  items: SidebarItem[];
  sidebarTop?: React.ReactNode;
  basePath: string;
}) {
  const segment = useSegment(basePath);

  return (
    <div className="flex flex-col h-full items-stretch">
      <div className="h-14 flex items-center px-2 shrink-0 mr-10 md:mr-0 border-b">
        {sidebarTop}
      </div>
      <div className="flex flex-grow flex-col gap-2 pt-4 overflow-y-auto">
        {items.map((item, index) => {
          switch (item.type) {
            case "separator":
              return <Separator key={index.toString() + item.type} className="my-2" />;
            case "item":
              return (
                <div key={index.toString() + item.name} className="flex px-2">
                  <NavItem
                    item={item}
                    onClick={onNavigate}
                    basePath={basePath}
                    selected={segment === item.href}
                  />
                </div>
              );
            default:
              return (
                <div key={index.toString() + item.name} className="flex my-2">
                  <div className="flex-grow justify-start text-sm font-medium text-zinc-500 px-2">
                    {item.name}
                  </div>
                </div>
              );
          }
        })}
        <div className="flex-grow" />
      </div>
    </div>
  );
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
            <ColorModeSwitcher />
          </div>
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
