import { cn } from "@/lib/utils";
import type { SidebarNavItem } from "@/lib/types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItemProps {
  item: SidebarNavItem;
  onClick?: () => void;
  basePath: string;
  selected: boolean;
}

export function NavItem({ item, onClick, basePath, selected }: NavItemProps) {
  const linkContent = (
    <div
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        selected && "bg-muted",
        "w-full flex-grow items-center justify-start text-xs text-zinc-800 dark:text-zinc-300 px-2.5 py-1",
        item.disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <item.icon className="mr-2 h-4 w-4" />
      {item.name}
    </div>
  );

  if (item.disabled) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>{linkContent}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.tooltip || "Coming soon"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Link
      href={basePath + item.href}
      className="w-full"
      onClick={onClick}
      prefetch={true}
    >
      {linkContent}
    </Link>
  );
}
