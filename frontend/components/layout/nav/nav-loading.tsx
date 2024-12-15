"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function NavLoading() {
  return (
    <div className="flex gap-4">
      <Skeleton className="h-4 w-[60px]" />
      <Skeleton className="h-4 w-[60px]" />
      <Skeleton className="h-4 w-[60px]" />
    </div>
  );
}