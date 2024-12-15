import { SidebarItem } from "@/lib/types";
import { useSegment } from "@/lib/hooks/use-segment";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface HeaderBreadcrumbItem {
  title: string;
  href: string;
}

interface HeaderBreadcrumbProps {
  items: SidebarItem[];
  baseBreadcrumb?: HeaderBreadcrumbItem[];
  basePath: string;
}

export function HeaderBreadcrumb({ items, baseBreadcrumb, basePath }: HeaderBreadcrumbProps) {
  const segment = useSegment(basePath);
  const item = items.find((item) => item.type === 'item' && item.href === segment);
  const title = item?.type === 'item' ? item.name : undefined;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {baseBreadcrumb?.map((item, index) => (
          <React.Fragment key={index}>
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
