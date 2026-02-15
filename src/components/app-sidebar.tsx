"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { LogOut } from "lucide-react"
import { adminRoutes } from "@/routes/adminRoutes"
import { sellerRoutes } from "@/routes/sellerRoute"
import { customerRoutes } from "@/routes/customerRoute"
import { Routetype } from "@/types"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import clsx from "clsx"
import { authClient } from "@/lib/auth-client"
import { toast } from "react-toastify"
import Logo from "./modules/Logo"

export function AppSidebar({
  user,
  ...props
}: {
  user: string
} & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const route = useRouter();

  let routes: Routetype[] = []
  switch (user) {
    case "ADMIN":
      routes = adminRoutes
      break
    case "SELLER":
      routes = sellerRoutes
      break
    case "CUSTOMER":
      routes = customerRoutes
      break
  }

  // logout function
  const handleLogOut = async () => {
    const res = await authClient.signOut();
    if (res.data?.success) {
      route.push("/");
      toast.success("Successfully Logout ...!");
    }
  }

  return (
    <Sidebar
      {...props}
      className="
        border-gray-300

      "
    >
      {/* MAIN CONTENT */}
      <SidebarContent className="px-2 py-4">
        <Logo />
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="mb-6">
            <SidebarGroupLabel
              className="
                px-3 py-2 text-sm mb-4 font-bold uppercase tracking-wider
                text-blue-400
              "
            >
              {group.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.url

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className={clsx(
                            `
                            flex items-center gap-3 rounded-xl px-3 py-2
                            transition-all duration-200
                            `,
                            isActive
                              ? `
                                bg-linear-to-r from-blue-500/25 to-blue-400/10
                                text-blue-400
                              `
                              : `
                                hover:bg-slate-800/70 hover:text-white
                              `
                          )}
                        >
                          {/* Indicator dot */}
                          <span
                            className={clsx(
                              "h-2 w-2 rounded-full",
                              isActive ? "bg-blue-400" : "bg-slate-600"
                            )}
                          />

                          <span className="text-sm font-medium">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* FOOTER (LOGOUT) */}
      <SidebarFooter className="p-3">
        <AlertDialog>

          {/* Trigger Button */}
          <AlertDialogTrigger asChild>
            <SidebarMenuButton
              className="
              flex items-center gap-3 rounded-xl px-3 py-2
              border-red-400 border
              text-red-400 hover:bg-red-500/10 hover:text-red-600
            "
            >
              <LogOut className="h-4 w-4" />
              <span className="text-lg font-medium">Logout</span>
            </SidebarMenuButton>
          </AlertDialogTrigger>

          {/* Dialog Content */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to logout?
              </AlertDialogTitle>

              <AlertDialogDescription>
                You will be signed out of your account and need to log in again.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleLogOut}
                className="bg-red-600 hover:bg-red-700"
              >
                Yes, Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>

        </AlertDialog>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
