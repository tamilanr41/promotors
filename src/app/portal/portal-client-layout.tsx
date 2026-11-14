"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  FileText,
  MessageSquare,
  Bell,
  HelpCircle,
  LogOut,
  User,
  Settings,
  HardHat,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Building,
  Home
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { label: "Projects", href: "/portal/projects", icon: FolderKanban },
  { label: "Documents", href: "/portal/documents", icon: FileText },
  { label: "Invoices", href: "/portal/invoices", icon: FileText },
  { label: "Messages", href: "/portal/messages", icon: MessageSquare },
];

export default function PortalClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user as { name?: string; role?: string; email?: string } | undefined;
  const userName = user?.name || "Amit Sharma";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isStaff = user?.role && user.role !== "CLIENT";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 selection:bg-orange-500 selection:text-white">
      {/* TOP NOTIFICATION / LIVE FEED BAR */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white">Client Project Portal</span>
            <span className="text-slate-400">• Live CCTV & Engineer Logs Synced</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
              <Home className="w-3 h-3" /> Website
            </Link>
            {isStaff && (
              <Link href="/dashboard" className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors">
                <ExternalLink className="w-3 h-3" /> Switch to Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="flex h-16 items-center justify-between px-4 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-1.5 text-slate-600 rounded-lg hover:bg-slate-100">
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/portal" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/20">
                <HardHat className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">COS</h2>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-100 text-orange-800">
                    Client Portal
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Construction Operating System</p>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all",
                    isActive
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                2
              </span>
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-slate-100 transition-colors outline-none">
                <Avatar size="sm">
                  <AvatarFallback className="bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-bold text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden text-left md:block">
                  <span className="text-xs font-bold text-slate-800 block leading-tight">{userName}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold leading-tight">Verified Owner</span>
                </div>
                <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 md:block" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5">
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="text-xs font-bold text-slate-900">{userName}</div>
                  <div className="text-[11px] text-slate-500 truncate">{user?.email || "client@cos.com"}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isStaff && (
                  <DropdownMenuItem>
                    <Link href="/dashboard" className="flex items-center w-full px-1 py-1 text-xs font-semibold text-amber-700 hover:text-amber-800">
                      <ExternalLink className="mr-2 h-4 w-4 text-amber-600" />
                      Switch to Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Link href="/portal/projects" className="flex items-center w-full px-1 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900">
                    <Building className="mr-2 h-4 w-4 text-slate-500" />
                    My Active Projects
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex items-center px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white lg:hidden px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all",
                    isActive ? "bg-orange-500 text-white" : "text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8">{children}</main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 COS Construction Operating System. Client Portal Protected.</span>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
