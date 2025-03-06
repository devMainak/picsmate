import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "./SiteHeader";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";

export default function SidebarLayout() {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
