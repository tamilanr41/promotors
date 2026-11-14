"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  FolderKanban,
  Tag,
  Users2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut,
  ExternalLink,
  Building,
  Home,
  MessageSquareQuote,
} from "lucide-react";
import Image from "next/image";
import ThemeToggle from "@/components/layout/theme-toggle";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Project Management",
    items: [
      { label: "Overview Console", href: "/dashboard", icon: LayoutDashboard },
      { label: "Current Projects", href: "/dashboard/projects", icon: FolderKanban, badge: "Active", badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
      { label: "Upcoming Projects", href: "/dashboard/upcoming-projects", icon: Building, badge: "New", badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
      { label: "Special Offers & Deals", href: "/dashboard/offers", icon: Tag, badge: "Promo", badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
    ],
  },
  {
    title: "Customer & Inquiries",
    items: [
      { label: "Booking Enquiries", href: "/dashboard/leads", icon: Users2, badge: "Leads" },
      { label: "Customer Reviews", href: "/dashboard/testimonials", icon: MessageSquareQuote, badge: "Reviews", badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
      { label: "Admin Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  } | null;
}

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  const sidebarContent = (
    <div className="flex h-full flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-r border-slate-200 dark:border-slate-800 transition-colors">
      {/* BRAND HEADER */}
      <div className={cn("flex items-center gap-3 border-b border-slate-200 dark:border-slate-800/80 px-4 py-4 sm:py-5", collapsed && "justify-center")}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 p-1">
          <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-black tracking-tight text-slate-900 dark:text-white font-display">
                <span className="text-amber-500">AAA</span> PROMOTERZ
              </h2>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                ADMIN
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Real Estate &amp; Project Controls</p>
          </div>
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-1">
            {!collapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                {section.title}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={`${section.title}-${item.label}`}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-150",
                      active
                        ? "bg-amber-500 text-slate-950 shadow-sm font-extrabold"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100",
                      collapsed && "justify-center px-2"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", active ? "text-slate-950 stroke-[2.5]" : "text-amber-500")} />
                    {!collapsed && (
                      <>
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className={cn(
                              "ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full border",
                              active
                                ? "bg-slate-950 text-amber-400 border-amber-400"
                                : item.badgeColor || "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* QUICK WEBSITE RETURN LINK */}
      <div className={cn("border-t border-slate-200 dark:border-slate-800/80 p-3", collapsed ? "text-center" : "")}>
        {!collapsed ? (
          <Link
            href="/"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Home className="h-4 w-4 text-amber-500" />
              <span>Public Website</span>
            </span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </Link>
        ) : (
          <Link href="/" title="Public Website" className="p-2 inline-block text-amber-500 hover:text-slate-900 dark:hover:text-white">
            <Home className="h-5 w-5" />
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-amber-500 selection:text-slate-950 transition-colors">
      {/* DESKTOP SIDEBAR */}
      <aside
        className={cn(
          "hidden lg:flex flex-col transition-all duration-300 z-30",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="relative flex h-full flex-col">
          {sidebarContent}
          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
            className="absolute -right-3 top-5 z-40 flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </button>
        </div>
      </aside>

      {/* MOBILE SIDEBAR OVERLAY */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* TOP HEADER */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md px-4 lg:px-6 z-20 transition-colors">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AAA Promoterz Admin Center</span>
              <span className="text-slate-400 hidden sm:inline">• Live Projects Active</span>
            </div>
          </div>

          {/* ACTIONS, THEME TOGGLE & USER PROFILE */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Home className="h-3.5 w-3.5 text-amber-500" />
              <span>View Site</span>
            </Link>

            <ThemeToggle className="h-8 w-8" />

            {/* USER PROFILE DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors outline-none cursor-pointer">
                <Avatar size="sm">
                  {user?.image && <AvatarImage src={user.image} alt={user.name || ""} />}
                  <AvatarFallback className="bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 font-bold text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden text-left md:block">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{user?.name || "Admin User"}</p>
                  <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 block leading-tight">
                    Super Administrator
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-1.5 text-slate-900 dark:text-white">
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{user?.name || "Admin User"}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-mono">{user?.email || "admin@aaapromoterz.com"}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
                <DropdownMenuItem>
                  <Link href="/dashboard/projects" className="flex items-center w-full px-2 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400">
                    <FolderKanban className="mr-2 h-4 w-4 text-amber-500" />
                    Current Projects
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/upcoming-projects" className="flex items-center w-full px-2 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400">
                    <Building className="mr-2 h-4 w-4 text-blue-500" />
                    Upcoming Projects
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/offers" className="flex items-center w-full px-2 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400">
                    <Tag className="mr-2 h-4 w-4 text-amber-500" />
                    Special Offers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-900/60 transition-colors">
          {children}
        </main>
      </div>
    </div>
  );
}
