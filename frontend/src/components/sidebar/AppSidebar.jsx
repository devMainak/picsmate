import { Album, Search, Settings, Star, ImageIcon, Image } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { NavUser } from "./NavUser";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "../ui/skeleton";
import { SidebarSkeleton } from "./SidebarSkeleton";

// Menu items.
const items = [
  {
    title: "Photos",
    url: "#",
    icon: Image,
  },
  {
    title: "Albums",
    url: "#",
    icon: Album,
  },
  {
    title: "Favourites",
    url: "#",
    icon: Star,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { user, fetchUserDetails } = useAuth();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Sidebar className="top-[--header-height] !h-[calc(100svh-var(--header-height))]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex items-center gap-2">
                  {/* ✅ Add Picture-in-Picture icon here */}
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <ImageIcon className="size-4" />
                  </div>

                  {/* App name */}
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">picsmate.</span>
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3 border-t">
        {user ? <NavUser user={user} /> : <SidebarSkeleton />}
      </SidebarFooter>
    </Sidebar>
  );
}
