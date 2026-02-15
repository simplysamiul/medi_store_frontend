"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client";

export default function DashboardLayout({ customer, seller, admin }:
  {
    customer: React.ReactNode,
    seller: React.ReactNode,
    admin: React.ReactNode,
  }) {
  // get userinfo
  const data = authClient.useSession();
  const role = (data?.data?.user as any)?.role;
  return (
    <SidebarProvider>
      <AppSidebar user={role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {role === "CUSTOMER" && customer}
          {role === "SELLER" && seller}
          {role === "ADMIN" && admin}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
