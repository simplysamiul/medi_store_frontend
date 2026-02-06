"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { FaBriefcaseMedical, FaCartPlus, FaUserCircle } from "react-icons/fa";

import { cn } from "@/lib/utils";
import Logo from "../modules/Logo";

import {
  Accordion,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";

/* =========================
   TYPES
========================= */

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

type User = {
  id: string;
  name: string;
  role?: string;
  image?: string | null;
};

interface NavbarProps {
  className?: string;

  /**
   * 🔐 USER DATA
   * Pass `null` if user is NOT logged in
   * Pass user object if logged in
   */
  user?: User | null;

  menu?: MenuItem[];

  auth?: {
    login: {
      title: string;
      url: string;
    };
  };
}

/* =========================
   NAVBAR
========================= */

const Navbar = ({
  user = null, // ✅ USER DATA COMES FROM SERVER HERE
  menu = [
    { title: "Home", url: "/" },
    { title: "Medicines", url: "/medicines" },
    { title: "Categories", url: "/categories" },
    { title: "Sellers", url: "/sellers" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
  },
  className,
}: NavbarProps) => {

  const session = authClient.useSession();
  const userInfo = session.data?.user;
  return (
    <section className={cn("py-4", className)}>
      <div className="container">

        {/* ================= DESKTOP MENU ================= */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Logo />

            <NavigationMenu>
              <NavigationMenuList className="text-gray-600">
                {menu.map(renderMenuItem)}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex gap-2 items-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="/cart">
                <FaCartPlus />
              </Link>
            </Button>

            {/* 🔐 AUTH AREA */}
            {!userInfo ? (
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-800">
                <Link href={auth.login.url}>{auth.login.title}</Link>
              </Button>
            ) : (
              <ProfileMenu />
            )}
          </div>
        </nav>

        {/* ================= MOBILE MENU ================= */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Logo />

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-3">
                      <FaBriefcaseMedical className="text-2xl text-blue-600" />
                      <span className="text-lg font-bold">MediStore</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  <Accordion type="single" collapsible>
                    {menu.map(renderMobileMenuItem)}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button variant="outline" asChild>
                      <Link href="/cart">Add To Cart</Link>
                    </Button>

                    {!user ? (
                      <Button asChild>
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                    ) : (
                      <>
                        <Link
                          href="/dashboard"
                          className="text-sm font-semibold"
                        >
                          Dashboard
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="text-left text-sm text-red-500"
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================
   PROFILE MENU
========================= */

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      {/* Profile Icon */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-12 h-12 rounded-full flex items-center justify-center font-semibold cursor-pointer"
      >
        <FaUserCircle className="text-xl" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md border bg-white shadow-md z-50">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-blue-200"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-blue-200"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-blue-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
/* =========================
   HELPERS
========================= */

const handleLogout = async () => {
  await fetch("/auth/logout", { method: "POST" });
  window.location.href = "/login";
};

const renderMenuItem = (item: MenuItem) => (
  <NavigationMenuItem key={item.title}>
    <Link
      href={item.url}
      className="group inline-flex h-10 items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-muted"
    >
      {item.title}
    </Link>
  </NavigationMenuItem>
);

const renderMobileMenuItem = (item: MenuItem) => (
  <Link key={item.title} href={item.url} className="text-md font-semibold">
    {item.title}
  </Link>
);

export { Navbar };
