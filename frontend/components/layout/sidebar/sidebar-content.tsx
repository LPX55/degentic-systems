import type { SidebarItem } from "@/lib/types";
import { NavItem } from "./nav-item";
import { Separator } from "@/components/ui/separator";
import { useSegment } from "@/lib/hooks/use-segment";
import Link from "next/link";

interface SidebarContentProps {
  onNavigate?: () => void;
  items: SidebarItem[];
  sidebarTop?: React.ReactNode;
  basePath: string;
}

export function SidebarContent({ onNavigate, items, sidebarTop, basePath }: SidebarContentProps) {
  const segment = useSegment(basePath);

  return (
    <div className="sidebar flex flex-col h-full items-stretch">
      <div className="h-14 flex items-center justify-center px-2 shrink-0 mr-10 md:mr-0 border-b">
        <Link href="/">
          <h2 className="font-mono font-medium tracking-widest"><span className="font-black ">DE</span>|GENTIC SYS.</h2>
        </Link>
      </div>
      <div className="flex flex-grow flex-col gap-2 pt-4 overflow-y-auto">
        {items.map((item, index) => {
          switch (item.type) {
            case "separator":
              return <Separator key={index.toString() + item.type} className="my-2" />;
            case "item":
              return (
                <div key={index.toString() + item.name} className="flex px-4">
                  <NavItem
                    item={item}
                    onClick={onNavigate}
                    basePath={basePath}
                    selected={segment === item.href}
                  />
                </div>
              );
            case "label":
              return (
                <div key={index.toString() + item.name} className="flex my-1 p-2">
                  <div className="flex-grow justify-start text-sm font-medium text-neutral-400 px-2">
                    {item.name}
                  </div>
                </div>
              );
            default:
              return (
                <div key={index.toString() + item.name} className="flex my-1 p-2">
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
