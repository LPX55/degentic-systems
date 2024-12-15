"use client";

import SidebarLayout from "@/components/layout/sidebar";
import { useParams, useRouter } from "next/navigation";
import { useTeam } from "@/lib/context/team-context";
import {
  Brain,
  Trophy,
  Users,
  Database,
  MessageSquare,
  Award,
  Coins,
  BarChart3,
  Settings,
  GraduationCap,
  FileText,
  Sparkles,
  History,
  Scale,
  Swords,
  HardDrive
} from "lucide-react";

const navigationItems = [
  {
    name: "Overview",
    href: "/",
    icon: BarChart3,
    type: "item",
  },
  {
    type: 'label',
    name: 'Contest Management',
  },
  {
    name: "Rounds",
    href: "/rounds",
    icon: Trophy,
    type: "item",
  },
  {
    name: "Participants",
    href: "/participants",
    icon: Users,
    type: "item",
    disabled: true,
    tooltip: "Coming soon - Manage participant profiles and teams",
  },
  {
    type: 'label',
    name: 'Agent Development',
  },
  {
    name: "Training Hub",
    href: "/training",
    icon: Brain,
    type: "item",
  },
  {
    name: "Knowledge Base",
    href: "/knowledge",
    icon: Database,
    type: "item",
  },
  {
    name: "Memory Store",
    href: "/knowledge/memory",
    icon: HardDrive,
    type: "item",
  },
  {
    type: 'label',
    name: 'Debate Arena',
  },
  {
    name: "Live Debates",
    href: "/debates/live",
    icon: Swords,
    type: "item",
  },
  {
    name: "Practice Stage",
    href: "/debates/practice",
    icon: Brain,
    type: "item",
  },
  {
    name: "Debate History",
    href: "/debates/history",
    icon: History,
    type: "item",
  },
  {
    name: "Disputes & Appeals",
    href: "/debates/disputes",
    icon: Scale,
    type: "item",
  },
  {
    type: 'label',
    name: 'Evaluation & Rewards',
  },
  {
    name: "Expert Panel",
    href: "/experts",
    icon: GraduationCap,
    type: "item",
  },
  {
    name: "Performance",
    href: "/performance",
    icon: Award,
    type: "item",
    disabled: true,
    tooltip: "Coming soon - Track agent performance metrics",
  },
  {
    name: "Rewards",
    href: "/rewards",
    icon: Coins,
    type: "item",
    disabled: true,
    tooltip: "Coming soon - Manage and distribute rewards",
  },
  {
    type: 'label',
    name: 'Resources',
  },
  {
    name: "Documentation",
    href: "/docs",
    icon: FileText,
    type: "item",
    disabled: true,
    tooltip: "Coming soon - Platform documentation and guides",
  },
  {
    name: "AI Models",
    href: "/models",
    icon: Sparkles,
    type: "item",
    disabled: true,
    tooltip: "Coming soon - Browse and configure AI models",
  },
  {
    type: 'label',
    name: 'Settings',
  },
  {
    name: "Configuration",
    href: "/settings",
    icon: Settings,
    type: "item",
    disabled: true,
    tooltip: "Coming soon - Platform settings and preferences",
  },
];

export default function Layout(props: { children: React.ReactNode }) {
  const params = useParams<{ teamId: string }>();
  const { selectedTeam } = useTeam();
  const router = useRouter();

  return (
    <SidebarLayout 
      items={navigationItems}
      basePath={`/dashboard/${selectedTeam.id}`}
      baseBreadcrumb={[{
        title: selectedTeam.displayName,
        href: `/dashboard/${selectedTeam.id}`,
      }]}
    >
      {props.children}
    </SidebarLayout>
  );
}
