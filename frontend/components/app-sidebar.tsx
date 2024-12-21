"use client"

import * as React from "react"
import { Home } from "lucide-react"
import { TW } from '@/components/connect/connect-btn';
import { client } from '@/lib/client';
import { NavMain } from "@/components/nav-main"
import { NavTop } from "@/components/nav-top"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarSeparator,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarGroup,
} from "@/components/ui/sidebar"
import { useActiveAccount, useSocialProfiles } from "thirdweb/react";
// This is sample data.
import { data } from '@/lib/utils/nav-data'; 

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const activeAccount = useActiveAccount();
console.log("address", activeAccount?.address);
  const { data: profiles } = useSocialProfiles({
    client,
    address: activeAccount?.address || "",
  });
  console.log("profiles", profiles);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="group-data-[collapsible=icon]:hidden h-10 flex items-center justify-center px-2 shrink-0 mr-10 md:mr-0 border-b">
          <h2 className="font-mono font-medium tracking-widest"><span className="font-black ">DE</span>|GENTIC SYS.</h2>
        </div>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <NavTop items={data.navTop} />
        <SidebarSeparator />
        <NavMain size="sm" items={data.navMain} />
        <SidebarSeparator />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <TW />
        
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
