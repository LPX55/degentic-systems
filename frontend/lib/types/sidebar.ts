import type { LucideIcon } from "lucide-react";

export type SidebarItemType = "item" | "label" | "separator" | "default";

export interface BaseSidebarItem {
  type: SidebarItemType;
  name?: React.ReactNode;
}

export interface SidebarNavItem extends BaseSidebarItem {
  type: "item";
  name: React.ReactNode;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
  tooltip?: string;
}

export interface SidebarLabel extends BaseSidebarItem {
  type: "label";
  name: React.ReactNode;
}

export interface SidebarSeparator extends BaseSidebarItem {
  type: "separator";
}

export interface SidebarDefault extends BaseSidebarItem {
  type: "default";
  name: React.ReactNode;
}

export type SidebarItem = SidebarNavItem | SidebarLabel | SidebarSeparator | SidebarDefault;
