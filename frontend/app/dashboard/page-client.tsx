"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DEFAULT_TEAM_ID } from "@/lib/constants";

export function PageClient() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to default team dashboard
    router.push(`/dashboard/${DEFAULT_TEAM_ID}`);
  }, [router]);

  return null;
}