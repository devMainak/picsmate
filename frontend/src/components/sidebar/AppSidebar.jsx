import { Album, Settings, Star, ImageIcon, Image } from "lucide-react";

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
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { SidebarSkeleton } from "./SidebarSkeleton";

// Menu items.
const items = [
  {
    title: "Photos",
    url: "/photos",
    icon: Image,
  },
  {
    title: "Albums",
    url: "/albums",
    icon: Album,
  },
  {
    title: "Favourites",
    url: "/photos/favourites",
    icon: Star,
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
              <Link to="/photos">
                <div className="flex items-center gap-2">
                  {/* ✅ Add Picture-in-Picture icon here */}
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <ImageIcon className="size-4" />
                  </div>

                  {/* App name */}
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold text-red-600">
                      picsmate.
                    </span>
                  </div>
                </div>
              </Link>
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
                    <Link to={item.url}>
                      <item.icon className="text-red-600" />
                      <span>{item.title}</span>
                    </Link>
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
