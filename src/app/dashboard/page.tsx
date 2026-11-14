import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FolderKanban,
  Sparkles,
  Tag,
  Users2,
  Plus,
  ArrowUpRight,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const metrics = [
    {
      label: "Current Ongoing Projects",
      value: "5",
      detail: "DTCP / CMDA Approved Sites",
      icon: FolderKanban,
      color: "from-amber-500 to-amber-700",
      href: "/dashboard/projects",
    },
    {
      label: "Upcoming Projects / Launches",
      value: "4",
      detail: "Pre-booking open in 3 locations",
      icon: Clock,
      color: "from-blue-600 to-indigo-700",
      href: "/dashboard/upcoming-projects",
    },
    {
      label: "Active Offers & Deals",
      value: "4",
      detail: "Gold Coin & Free Registration active",
      icon: Tag,
      color: "from-emerald-500 to-teal-700",
      href: "/dashboard/offers",
    },
    {
      label: "Site Visit Enquiries",
      value: "18",
      detail: "7 new booking requests today",
      icon: Users2,
      color: "from-purple-600 to-pink-600",
      href: "/dashboard/leads",
    },
  ];

  const recentProjects = [
    { name: "Arakkonam Green City", location: "Arakkonam Junction", plots: "120 Plots", status: "Active Selling", price: "₹850 / sq.ft", badge: "Fast Moving" },
    { name: "Thiruthani Temple View", location: "Near Murugan Temple", plots: "85 Plots", status: "Active Selling", price: "₹720 / sq.ft", badge: "DTCP Approved" },
    { name: "Maduranthangam Royal Town", location: "GST Road", plots: "150 Plots", status: "Phase 1 Open", price: "₹950 / sq.ft", badge: "CMDA Approved" },
    { name: "Acharapakkam Agro Farm", location: "NH-45 Highway", plots: "40 Farm Units", status: "Active Selling", price: "₹450 / sq.ft", badge: "Gated Farm" },
  ];

  const activeOffers = [
    { title: "Free Registration & Patta Transfer", code: "AAA-REG2026", validTill: "May 31, 2026", discount: "Save ₹35,000" },
    { title: "1 Sovereign Gold Coin on Spot Booking", code: "AAA-GOLD8G", validTill: "April 30, 2026", discount: "8g Pure Gold" },
    { title: "Early Bird Discount (₹100/sq.ft OFF)", code: "AAA-EARLY100", validTill: "May 15, 2026", discount: "₹100/sq.ft OFF" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 p-6 sm:p-8 border border-amber-500/20 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> AAA PROMOTERZ Admin Console
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {session?.user?.name || "Admin"}
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Manage your current projects, upcoming launches, promotional festival offers, and customer site visit inquiries all in one place.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dashboard/projects">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold shadow-md shadow-amber-500/20">
                <Plus className="w-4 h-4 mr-1.5" /> Add New Project
              </Button>
            </Link>
            <Link href="/dashboard/offers">
              <Button variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10">
                <Tag className="w-4 h-4 mr-1.5" /> Create Offer
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Link key={metric.label} href={metric.href} className="group">
              <Card className="border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-amber-400/50">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{metric.label}</p>
                      <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{metric.value}</p>
                      <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1 flex items-center gap-1">
                        {metric.detail}
                      </p>
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${metric.color} shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Core CRUD Quick Links & Current Projects */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Current Projects Overview */}
        <Card className="lg:col-span-2 border border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-amber-500" />
                Current Active Projects
              </CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">Live layouts currently available for customer booking</p>
            </div>
            <Link href="/dashboard/projects">
              <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 flex items-center gap-1 text-xs font-semibold">
                Manage All <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentProjects.map((p, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 gap-3 hover:border-amber-400/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{p.name}</h3>
                    <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30">
                      {p.badge}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {p.location}
                    </span>
                    <span>•</span>
                    <span>{p.plots}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-200/60">
                  <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">{p.price}</span>
                  <Link href="/dashboard/projects">
                    <Button size="sm" variant="outline" className="h-7 text-xs border-slate-300 hover:border-amber-500 hover:text-amber-600">
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Promotional Offers */}
        <Card className="border border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-emerald-500" />
                Live Special Offers
              </CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">Discounts displayed on client website</p>
            </div>
            <Link href="/dashboard/offers">
              <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 text-xs font-semibold">
                Manage
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeOffers.map((offer, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-50/50 to-teal-50/30 dark:from-emerald-950/20 dark:to-teal-950/10 border border-emerald-200/60 dark:border-emerald-800/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-snug">{offer.title}</h4>
                  <Badge className="bg-emerald-600 text-white text-[10px] shrink-0">{offer.discount}</Badge>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-emerald-100 dark:border-emerald-800/30">
                  <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">{offer.code}</span>
                  <span>Expires: {offer.validTill}</span>
                </div>
              </div>
            ))}
            <Link href="/dashboard/offers" className="block pt-2">
              <Button variant="outline" className="w-full text-xs border-dashed border-emerald-400/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10">
                <Plus className="w-3.5 h-3.5 mr-1" /> Add New Special Offer
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Action Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          {
            title: "Current Projects",
            desc: "Add, edit, change pricing & plot layouts",
            href: "/dashboard/projects",
            icon: FolderKanban,
            badge: "5 Active",
            gradient: "from-amber-500/10 to-amber-600/5 border-amber-500/30 text-amber-500",
          },
          {
            title: "Upcoming Projects",
            desc: "Post upcoming launches & pre-booking status",
            href: "/dashboard/upcoming-projects",
            icon: Clock,
            badge: "4 Upcoming",
            gradient: "from-blue-500/10 to-blue-600/5 border-blue-500/30 text-blue-500",
          },
          {
            title: "Special Offers & Deals",
            desc: "Festival offers, gold coin gifts & discounts",
            href: "/dashboard/offers",
            icon: Tag,
            badge: "4 Live",
            gradient: "from-emerald-500/10 to-emerald-600/5 border-emerald-500/30 text-emerald-500",
          },
          {
            title: "Customer Leads",
            desc: "Site visit requests & phone inquiries",
            href: "/dashboard/leads",
            icon: Users2,
            badge: "18 Requests",
            gradient: "from-purple-500/10 to-purple-600/5 border-purple-500/30 text-purple-500",
          },
          {
            title: "Client Testimonials",
            desc: "Add & manage customer reviews & star ratings",
            href: "/dashboard/testimonials",
            icon: Sparkles,
            badge: "5 Published",
            gradient: "from-amber-500/10 to-amber-600/5 border-amber-500/30 text-amber-500",
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link key={idx} href={item.href} className="group">
              <Card className="h-full border border-slate-200 dark:border-slate-800 transition-all hover:border-amber-400 hover:shadow-md">
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl border ${item.gradient}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-medium">{item.badge}</Badge>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-600">
                    <span>Manage Module</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
