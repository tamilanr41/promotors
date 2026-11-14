"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  ChevronDown,
  ArrowRight,
  X,
  LayoutDashboard,
  LogOut,
  Phone,
  ArrowUpRight,
  User,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import ThemeToggle from "@/components/layout/theme-toggle";
import { useLiveContent, OfferItem } from "@/lib/content-store";

const navigation = [
  { name: "About Us", href: "/team" },
  {
    name: "Services",
    href: "#",
    dropdown: [
      { name: "Residential Layouts", href: "/services/residential" },
      { name: "Commercial Lands", href: "/services/commercial" },
      { name: "Industrial Plots", href: "/services/industrial" },
      { name: "Infrastructure Development", href: "/services/infrastructure" },
      { name: "Renovation & Building", href: "/services/renovation" },
    ],
  },
  { name: "Projects", href: "/portfolio" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "AI Estimator", href: "/estimator" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  // Synchronously uses cached offers; never flashes inactive offers
  const [liveOffers] = useLiveContent<OfferItem>("offers", []);

  const activeOffers = liveOffers.filter((o) => o.active !== false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setMobileDropdown(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const user = session?.user as { name?: string; role?: string; email?: string } | undefined;
  const isDarkHero = !scrolled && pathname === "/";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] transition-all duration-300">
        {/* TOP RUNNING OFFER BANNER (MARQUEE TICKER ABOVE NAVBAR) */}
        {activeOffers.length > 0 && (
          <div
            suppressHydrationWarning
            className="relative bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-black text-[11px] sm:text-xs py-1.5 border-b border-amber-600/40 shadow-sm overflow-hidden select-none"
          >
            <div className="flex items-center">
              {/* Left Tag Badge */}
              <div className="hidden md:flex shrink-0 items-center gap-1.5 px-3 py-0.5 bg-slate-950 text-amber-400 font-mono text-[10px] uppercase font-black tracking-wider rounded-r-md z-10 shadow-sm mr-3">
                <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" />
                <span>SPECIAL OFFERS</span>
              </div>

              {/* Seamless Marquee Scroller */}
              <div className="overflow-hidden whitespace-nowrap w-full">
                <div className="animate-marquee flex items-center gap-8">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-8 tracking-wide">
                      {activeOffers.map((offer) => (
                        <span key={`${i}-${offer.id}`} className="flex items-center gap-1.5">
                          {(offer.badge || offer.tag) && (
                            <span className="inline-block px-1.5 py-0.5 bg-slate-950 text-amber-300 rounded text-[9px] font-black uppercase tracking-wider">
                              {offer.badge || offer.tag}
                            </span>
                          )}
                          <span>{offer.title}</span>
                          <span className="text-slate-900/40 font-bold ml-6">•</span>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MAIN NAVBAR */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-md shadow-slate-900/5"
              : isDarkHero
              ? "bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-none border-b border-white/10"
              : "bg-transparent backdrop-blur-none border-b border-transparent"
          }`}
        >
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 sm:h-[68px] items-center justify-between gap-4">
              {/* BRAND LOGO & COMPACT NAME */}
              <Link href="/" className="group flex shrink-0 items-center gap-2.5">
                <div className="relative h-9 sm:h-10 w-auto flex items-center justify-center transition-transform group-hover:scale-105">
                  <Image
                    src="/logo.png"
                    alt="AAA Promoterz & Builders"
                    width={48}
                    height={36}
                    className="h-8 sm:h-9 w-auto object-contain drop-shadow-sm"
                    priority
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1 leading-tight">
                    <span className={`font-display text-base sm:text-lg font-black tracking-tight transition-colors ${
                      isDarkHero
                        ? "text-white group-hover:text-amber-400"
                        : "text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400"
                    }`}>
                      <span className="text-amber-500">AAA</span> PROMOTERZ
                    </span>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider font-mono -mt-0.5 ${
                    isDarkHero ? "text-slate-300" : "text-slate-600 dark:text-slate-400"
                  }`}>
                    BUILDERS &amp; DEVELOPERS
                  </span>
                </div>
              </Link>

              {/* DESKTOP NAV */}
              <nav className="hidden items-center gap-1 xl:gap-2 lg:flex">
                {navigation.map((item) => (
                  <div key={item.name} className="relative">
                    {item.dropdown ? (
                      <div className="group/menu relative">
                        <button
                          suppressHydrationWarning
                          className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors rounded-md ${
                            isDarkHero
                              ? "text-white/90 hover:text-amber-400"
                              : "text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400"
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover/menu:rotate-180 text-amber-500" />
                        </button>
                        <div className="invisible absolute left-0 top-full mt-2 w-60 translate-y-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 p-1.5 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100 z-50">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="group/sub flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400"
                            >
                              <span>{sub.name}</span>
                              <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover/sub:opacity-100 text-amber-500" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`relative px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors rounded-md ${
                          pathname === item.href
                            ? "text-amber-500 font-extrabold"
                            : isDarkHero
                            ? "text-white/90 hover:text-amber-400"
                            : "text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400"
                        }`}
                      >
                        <span>{item.name}</span>
                        {pathname === item.href && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-500 rounded-full" />
                        )}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* DESKTOP ACTIONS: PHONE, PROFILE ICON ONLY, THEME TOGGLE, ENQUIRE */}
              <div className="hidden items-center gap-3 lg:flex">
                <a
                  href="tel:+919176783332"
                  className={`hidden items-center gap-1.5 text-xs font-mono font-bold transition-colors xl:flex ${
                    isDarkHero
                      ? "text-white/90 hover:text-amber-400"
                      : "text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400"
                  }`}
                >
                  <Phone className="h-3.5 w-3.5 text-amber-500" />
                  <span>+91 91767 83332</span>
                </a>

                {/* PROFILE ICON ONLY (TRANSPARENT-COMPATIBLE) */}
                {session ? (
                  <div className="group/user relative">
                    <button
                      aria-label="Admin Profile"
                      title={user?.name || "Admin"}
                      className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 transition-all shadow-sm"
                    >
                      <User className="h-4 w-4" />
                    </button>

                    <div className="invisible absolute right-0 top-full mt-2 w-52 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-1.5 opacity-0 shadow-2xl transition-all duration-200 group-hover/user:visible group-hover/user:opacity-100 z-50">
                      <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 mb-1">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.name || "Admin"}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-mono">{user?.email}</div>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        <LayoutDashboard className="h-3.5 w-3.5 text-amber-500" />
                        <span>Admin Dashboard</span>
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/admin-login"
                    aria-label="Admin Profile Login"
                    title="Admin Profile Login"
                    className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border transition-all shadow-sm ${
                      isDarkHero
                        ? "border-white/30 bg-white/10 text-white hover:text-amber-400 hover:border-amber-400"
                        : "border-slate-300 dark:border-white/20 bg-white/70 dark:bg-white/5 hover:border-amber-500 hover:bg-amber-500/15 text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400"
                    }`}
                  >
                    <User className="h-4 w-4" />
                  </Link>
                )}

                {/* THEME TOGGLE (AMBER GLOWING, CLEARLY VISIBLE) */}
                <ThemeToggle />

                {/* ENQUIRE NOW BUTTON */}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm shadow-amber-500/20"
                >
                  <span>Enquire</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* MOBILE HAMBURGER & THEME TOGGLE (NO PROFILE ICON HERE) */}
              <div className="flex items-center gap-2 lg:hidden">
                <ThemeToggle />
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDarkHero
                      ? "text-white hover:text-amber-400 hover:bg-white/10"
                      : "text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X className="h-5 w-5" /> : <ChevronDown className="h-5 w-5 -rotate-90" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="fixed inset-0 z-[110] lg:hidden animate-fadeIn">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col p-5 z-10 transition-colors">
            {/* DRAWER TOP BAR WITH BRAND & DISCREET STEALTH ADMIN ICON (NO NAME, SECRET TRIGGER FOR ADMIN ONLY) */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="relative h-7 w-auto flex items-center justify-center">
                  <Image src="/logo.png" alt="Logo" width={36} height={26} className="h-6 w-auto object-contain" />
                </div>
                <span className="font-display text-sm font-bold text-slate-900 dark:text-white">
                  <span className="text-amber-500">AAA</span> PROMOTERZ
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {/* DISCREET STEALTH ADMIN ICON - NO TEXT, REGULAR USERS SEE A TRUST BADGE, ADMIN CLICKS TO ACCESS */}
                <Link
                  href={session ? "/dashboard" : "/admin-login"}
                  onClick={() => setIsOpen(false)}
                  className="relative p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                  aria-label="Verification Seal"
                  title=""
                >
                  <ShieldCheck className="h-4 w-4" />
                  {session && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  )}
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* NAV LINKS (CLEAN, NO ADMIN TEXT BUTTON) */}
            <div className="flex-1 overflow-y-auto py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="border-b border-slate-100 dark:border-slate-900 pb-1">
                      <button
                        onClick={() =>
                          setMobileDropdown(
                            mobileDropdown === item.name ? null : item.name
                          )
                        }
                        className="flex items-center justify-between w-full px-2 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-amber-500 transition-transform duration-200 ${mobileDropdown === item.name ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      {/* DROPDOWN SUBMENU (EXPANDS ON CLICK) */}
                      {mobileDropdown === item.name && (
                        <div className="pl-3 pr-1 pb-1 space-y-0.5 animate-in fade-in slide-in-from-top-1 duration-200">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={() => {
                                setIsOpen(false);
                                setMobileDropdown(null);
                              }}
                              className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                            >
                              <span>{sub.name}</span>
                              <ArrowUpRight className="h-3 w-3 text-amber-500/70" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileDropdown(null);
                      }}
                      className="block px-2 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors border-b border-slate-100 dark:border-slate-900"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold tracking-wide"
              >
                <span>Enquire Now</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href="tel:+919176783332"
                className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400"
              >
                <Phone className="h-3 w-3 text-amber-500" />
                <span>+91 91767 83332</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
