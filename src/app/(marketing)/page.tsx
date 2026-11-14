"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Phone,
  Quote,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  Sparkles,
  Calendar,
  MapPin,
} from "lucide-react";
import { Home, Building2, Factory, Road, Hammer, Sprout, FileCheck, HardHat } from "lucide-react";
import Reveal from "../../components/marketing/reveal";
import ImageWithFallback from "../../components/ui/image-with-fallback";
import HeroSlider from "../../components/marketing/hero-slider";
import { useLiveContent, ProjectItem, UpcomingProjectItem, TestimonialItem } from "@/lib/content-store";

const testimonials = [
  {
    name: "S. Karthik",
    role: "Plot owner · Arakkonam Layout",
    text: "Clear paperwork, transparent pricing and a team that actually answers calls. We got our registered plot exactly on the promised date.",
  },
  {
    name: "Priya & Ramesh",
    role: "Homeowners · Maduranthangam",
    text: "From the first site visit to the final registration, everything was explained in writing. No surprises, no hidden charges.",
  },
  {
    name: "V. Muthu",
    role: "Farmland owner · Chengalpattu belt",
    text: "Their verification of patta, chitta and EC gave us the confidence to buy. The land is exactly as described.",
  },
  {
    name: "Lakshmi Narayanan",
    role: "Plot owner · Thiruthani Layout",
    text: "Roads, drainage and street lights were all in place before we paid. A rare, honest developer in Tamil Nadu.",
  },
];

const processSteps = [
  { n: "01", title: "Enquiry", text: "Share your plot size, budget and preferred location.", image: "/scetch1.webp" },
  { n: "02", title: "Site visit", text: "Walk the land with us and feel the ground.", image: "/img1.webp" },
  { n: "03", title: "Documentation", text: "Title, patta, chitta and EC verified in writing.", image: "/notice.webp" },
  { n: "04", title: "Registration", text: "Smooth, guided registration at the sub-registrar.", image: "/img2.webp" },
  { n: "05", title: "Layout planning", text: "Roads, drainage and plot orientation fixed.", image: "/layoutarak1.webp" },
  { n: "06", title: "Construction", text: "Quality materials and a written contract.", image: "/img3.webp" },
  { n: "07", title: "Handover", text: "Keys, documents and full support.", image: "/formland.webp" },
  { n: "08", title: "Support", text: "After-sales care for as long as you need.", image: "/img4.webp" },
];

const services = [
  { icon: Home, title: "Residential Layouts", desc: "Planned plots with clear titles and wide roads.", href: "/services/residential" },
  { icon: Building2, title: "Commercial Builds", desc: "Spaces designed for business, not just photos.", href: "/services/commercial" },
  { icon: Factory, title: "Industrial Plots", desc: "Built for machines, maintenance and the long run.", href: "/services/industrial" },
  { icon: Road, title: "Infrastructure", desc: "Roads, drainage and utilities done right.", href: "/services/infrastructure" },
  { icon: Hammer, title: "Renovation", desc: "Rework, don't rebuild, when it makes sense.", href: "/services/renovation" },
  { icon: Sprout, title: "Farming Lands", desc: "Fertile agricultural land with dependable water.", href: "/portfolio" },
  { icon: FileCheck, title: "Plot Registration", desc: "End-to-end documentation and registration.", href: "/estimator" },
  { icon: HardHat, title: "Construction", desc: "From foundation to final handover.", href: "/services/commercial" },
];

const projects = [
  { title: "Arakkonam Layout", meta: "Arakkonam · 2024", image: "/layoutarak1.webp", href: "/portfolio" },
  { title: "Thiruthani Layout", meta: "Thiruthani · 2023", image: "/img1.webp", href: "/portfolio" },
  { title: "Maduranthangam Layout", meta: "Maduranthangam · 2024", image: "/layoutmad1.webp", href: "/portfolio" },
  { title: "Farming Lands", meta: "Tamil Nadu · Ongoing", image: "/formland.webp", href: "/portfolio" },
];

const posts = [
  { title: "Before you buy a plot in Tamil Nadu, check these seven documents", excerpt: "A clear title is more than one paper. Here is the short list we verify on every plot.", date: "12 March 2026", image: "/scetch1.jpeg", href: "/blog" },
  { title: "Patta, chitta and the EC — what each one actually proves", excerpt: "Three documents buyers hear about constantly, and what each one answers.", date: "26 February 2026", image: "/notice.jpeg", href: "/blog" },
  { title: "Why farmland near Maduranthangam is quietly becoming a smart buy", excerpt: "Good water, growing connectivity and honest pricing on the Chengalpattu belt.", date: "9 February 2026", image: "/formland.jpeg", href: "/blog" },
];

const faqs = [
  { q: "What is your approach to clear titles?", a: "We verify the parent deed, patta, chitta, EC for 30 years, approved layout plan and litigation status before any plot is listed." },
  { q: "How do you ensure projects are delivered on time?", a: "Detailed timelines, weekly progress tracking and proactive communication with every stakeholder." },
  { q: "Can you handle both small and large-scale projects?", a: "Yes — from a single plot to multi-phase layouts and construction projects." },
  { q: "Do you offer farmland as well?", a: "Yes, fertile agricultural lands with dependable water across the Chengalpattu belt." },
  { q: "How do I start the process?", a: "Share your plot size, budget and location on WhatsApp or the contact form and we will arrange a site visit." },
];

const dockedFeatures = [
  {
    num: "01",
    title: "100% Clear Legal Titles",
    desc: "Parent deeds, patta, chitta & 30-year EC legally verified before every project launch.",
  },
  {
    num: "02",
    title: "Prime Strategic Locations",
    desc: "Arakkonam, Thiruthani, Maduranthangam, Acharapakkam & GST Industrial Corridor.",
  },
  {
    num: "03",
    title: "Bank Loans & Instant Handover",
    desc: "Pre-approved housing loans up to 80% with transparent written pricing and no hidden costs.",
  },
];

export default function HomePage() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const [liveProjects] = useLiveContent<ProjectItem>("projects", [
    {
      id: "PRJ-001",
      name: "Maduranthakam Green City Phase 1",
      location: "Maduranthakam",
      category: "Residential Layout",
      plotsCount: 48,
      priceRange: "₹650 - ₹850 / sq.ft",
      status: "Ready to Construct",
      image: "/layoutmad1.jpeg",
      description: "Prime residential layout with clear DTCP titles",
      isActive: true,
    },
    {
      id: "PRJ-002",
      name: "Thiruthani Temple View Layout",
      location: "Thiruthani",
      category: "Residential Layout",
      plotsCount: 36,
      priceRange: "₹750 - ₹950 / sq.ft",
      status: "Fast Selling",
      image: "/img2.png",
      description: "Serene residential layout just 5 mins from the temple",
      isActive: true,
    },
    {
      id: "PRJ-003",
      name: "Maduranthangam Royal Town",
      location: "Maduranthangam",
      category: "Residential Layout",
      plotsCount: 62,
      priceRange: "₹550 - ₹750 / sq.ft",
      status: "Ongoing Development",
      image: "/img1.png",
      description: "Rapidly appreciating residential layout",
      isActive: true,
    },
    {
      id: "PRJ-004",
      name: "Acharapakkam Agro Farm Lands",
      location: "Acharapakkam",
      category: "Farming Land",
      plotsCount: 18,
      priceRange: "₹35 Lakhs / Acre",
      status: "Ready to Construct",
      image: "/formland.jpeg",
      description: "Fertile agricultural farming plots",
      isActive: true,
    },
  ]);

  const [liveUpcoming] = useLiveContent<UpcomingProjectItem>("upcoming", [
    {
      id: "UP-001",
      name: "Tiruvallur Metro City Layout",
      location: "Tiruvallur (Near Collectorate)",
      expectedLaunch: "April 2027",
      category: "Mega Gated Layout",
      totalAcres: "14 Acres",
      estimatedPlots: 120,
      preBookingStatus: "Pre-Booking Open",
      image: "/img4.png",
      highlights: "Close to the upcoming metro corridor, wide 40ft blacktop roads, landscaped parks and clubhouse.",
      isActive: true,
    },
    {
      id: "UP-002",
      name: "Kanchipuram Silk City Enclave",
      location: "Kanchipuram Outer Ring Road",
      expectedLaunch: "June 2027",
      category: "Residential Layout",
      totalAcres: "8 Acres",
      estimatedPlots: 75,
      preBookingStatus: "Early Bird Available",
      image: "/img5.png",
      highlights: "Direct highway frontage, 100% vaastu compliant plots with DTCP & RERA pending final clearance.",
      isActive: true,
    },
    {
      id: "UP-003",
      name: "Maduranthangam Lakeside Agro Plots",
      location: "Maduranthangam Lake Road",
      expectedLaunch: "August 2027",
      category: "Farm Lands",
      totalAcres: "25 Acres",
      estimatedPlots: 35,
      preBookingStatus: "Coming Soon",
      image: "/img6.png",
      highlights: "Scenic organic farming plots with drip irrigation, fruit orchards and secure 24/7 boundary watch.",
      isActive: true,
    },
  ]);

  const [liveTestimonials] = useLiveContent<TestimonialItem>("testimonials", [
    {
      id: "REV-001",
      name: "S. Karthik",
      role: "Plot owner · Maduranthakam Layout",
      location: "Maduranthakam",
      rating: 5,
      text: "Clear paperwork, transparent pricing and a team that actually answers calls. We got our registered plot exactly on the promised date.",
      featured: true,
      active: true,
      date: "2026-04-18"
    },
    {
      id: "REV-002",
      name: "Priya & Ramesh",
      role: "Homeowners · Maduranthangam",
      location: "Maduranthangam",
      rating: 5,
      text: "From the first site visit to the final registration, everything was explained in writing. No surprises, no hidden charges.",
      featured: true,
      active: true,
      date: "2026-04-12"
    },
  ]);

  const activeProjects = liveProjects.filter((p) => p.isActive !== false);
  const activeUpcoming = liveUpcoming.filter((u) => u.isActive !== false);
  const activeTestimonials = liveTestimonials.filter((t) => t.active !== false);

  const displayProjects = activeProjects.length > 0
    ? activeProjects.slice(0, 4).map((p) => ({
        title: p.name,
        meta: p.location,
        image: p.image || "/img1.png",
        href: "/portfolio",
      }))
    : projects;

  const displayReviews = activeTestimonials.length > 0
    ? activeTestimonials.map((t) => ({
        name: t.name,
        role: `${t.role || "Client"} · ${t.location || "Tamil Nadu"}`,
        text: t.text,
      }))
    : testimonials;

  const currentReviewIndex = testimonialIndex < displayReviews.length ? testimonialIndex : 0;
  const currentReview = displayReviews[currentReviewIndex] || displayReviews[0];

  return (
    <div className="bg-paper">
      {/* ==================== PLAYWOOD / LUMBERT HERO SLIDER ==================== */}
      <HeroSlider />

      {/* DOCKED 3-FEATURE PROOF BAR */}
      <div className="relative z-10 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
            {dockedFeatures.map((f) => (
              <div key={f.num} className="p-5 sm:p-6 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                <span className="font-display text-3xl font-black text-[#b34325] shrink-0">
                  {f.num}
                </span>
                <div>
                  <h3 className="font-display text-sm sm:text-base font-extrabold uppercase tracking-tight text-slate-950 dark:text-white">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== FEATURED PROJECT ==================== */}
      <section>
        <div className="py-20 lg:py-28">
          <div className="container mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <Reveal>
                <h2 data-aos="fade-down" className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] text-ink">
                  Featured projects
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <Link
                  href="/portfolio"
                  aria-label="See all projects in our portfolio"
                  className="inline-flex items-center gap-3 bg-brass px-7 py-4 text-[14px] font-semibold text-black transition-colors hover:bg-brass-light"
                >
                  See all projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>

            <Reveal>
              <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-amber-500/20 shadow-xl hover-img-tilt shimmer-card">
                <ImageWithFallback
                  src="/layoutmad1.jpeg"
                  alt="Maduranthangam layout"
                  className="editorial-img absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 text-[13px] text-bone/90">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z" />
                        <path d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75V9.75Z" />
                      </svg>
                      Maduranthangam, 2024
                    </span>
                    <span className="bg-brass px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-black">
                      Residential
                    </span>
                  </div>
                  <h3 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-bone">
                    <Link href="/portfolio" className="hover:text-brass">
                      Maduranthangam Layout
                    </Link>
                  </h3>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-bone/85">
                    A planned residential layout with wide roads, drainage and clear titles — built for
                    families who want certainty, not surprises.
                  </p>
                  <Link
                    href="/portfolio"
                    aria-label="Read more about Maduranthangam Layout"
                    className="mt-6 inline-flex items-center gap-3 border border-bone/40 px-6 py-3 text-[13px] font-semibold text-bone transition-colors hover:bg-bone hover:text-ink"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================== PARTNERS ==================== */}
      <section className="bg-bone">
        <div className="py-16 lg:py-20">
          <div className="container mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
            <Reveal>
              <h2 className="text-center font-display text-[clamp(1.4rem,3vw,2.2rem)] font-bold text-ink">
                500+ happy plot owners
              </h2>
            </Reveal>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-[15px] font-semibold text-ink/65">
              {["Arakkonam", "Thiruthani", "Maduranthangam", "Acharapakkam", "Kanchipuram"].map((name) => (
                <span key={name} className="uppercase tracking-[0.18em] text-ink/65">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section>
        <div className="py-20 lg:py-28">
          <div className="container mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                <Reveal>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="overflow-hidden rounded-xl border border-bone-300 shadow-sm hover-img-glow">
                      <ImageWithFallback src="/img5.webp" alt="Builders at work" className="editorial-img h-full w-full object-cover" />
                    </div>
                    <div className="overflow-hidden rounded-xl border border-bone-300 shadow-sm hover-img-float">
                      <ImageWithFallback src="/img6.webp" alt="Site engineers" className="editorial-img h-full w-full object-cover" />
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={120}>
                  <div className="mt-6 flex flex-wrap gap-6 bg-bone p-6">
                    {[
                      { n: "500+", l: "Plots handed over" },
                      { n: "6", l: "Locations" },
                      { n: "100%", l: "Clear titles" },
                    ].map((c) => (
                      <div key={c.l} className="flex-1 min-w-[120px] text-center">
                        <div className="font-display text-[28px] font-bold text-ink">{c.n}</div>
                        <div className="mt-1 text-[12px] uppercase tracking-[0.18em] text-ink/60">{c.l}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-6">
                <Reveal>
                  <h2 data-aos="fade-down" className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] text-ink">
                    Building trust from the ground up
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-6 text-[18px] leading-relaxed text-gray-400">
                    AAA Promoterz &amp; Builders has spent over a decade developing trusted layouts, farm
                    lands and construction projects across Tamil Nadu — with verified titles, quality
                    materials and written contracts at every step.
                  </p>
                </Reveal>
                <Reveal delay={240}>
                  <Link
                    href="/team"
                    aria-label="Read more about our team"
                    className="mt-8 inline-flex items-center gap-3 bg-brass px-7 py-4 text-[14px] font-semibold text-black transition-colors hover:bg-brass-light"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="bg-bone">
        <div className="py-20 lg:py-28">
          <div className="container mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                <Reveal>
                  <h2 data-aos="fade-down" className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] text-ink">
                    Crafting dreams from the ground
                  </h2>
                </Reveal>
                <div className="mt-10 flex flex-col gap-6">
                  {[
                    { t: "Quality", d: "Commitment to delivering the highest standards in every project." },
                    { t: "Transparency", d: "Honest pricing and written contracts at every step." },
                    { t: "Sustainability", d: "Eco-friendly layouts that protect the land and the future." },
                    { t: "Reliability", d: "On-time registration and handover, every time." },
                  ].map((item, i) => (
                    <Reveal key={item.t} delay={i * 80}>
                      <div className="flex gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-brass text-black">
                          <Check className="h-6 w-6" strokeWidth={2.5} />
                        </div>
                        <div>
                          <h3 className="font-display text-[20px] font-semibold text-ink">{item.t}</h3>
                          <p className="mt-1 text-[15px] leading-relaxed text-ink/60">{item.d}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <Reveal delay={120}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl shadow-sm hover-img-zoom">
                      <ImageWithFallback src="/img7.webp" alt="Layout site" className="editorial-img h-full w-full object-cover" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-sm hover-img-tilt">
                      <ImageWithFallback src="/img1.webp" alt="Plots" className="editorial-img h-full w-full object-cover" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-sm hover-img-float">
                      <ImageWithFallback src="/img2.webp" alt="Site" className="editorial-img h-full w-full object-cover" />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-sm hover-img-vibrant">
                      <ImageWithFallback src="/img3.webp" alt="Construction" className="editorial-img h-full w-full object-cover" />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PROCESS ==================== */}
      <section>
        <div className="py-20 lg:py-28">
          <div className="container mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
            <Reveal>
              <h2 data-aos="fade-down" className="text-center font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] text-ink">
                How we bring your vision to life
              </h2>
            </Reveal>
            <p className="mb-4 text-center text-[12px] uppercase tracking-[0.2em] text-ink/50">
              Swipe to explore &rarr;
            </p>
            <div className="mt-4 -mx-5 overflow-x-auto px-5 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10 snap-x snap-mandatory touch-pan-x no-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
              <div className="flex gap-5 pb-4">
                {processSteps.map((s, i) => {
                  const anims = ["hover-img-tilt", "hover-img-zoom", "hover-img-vibrant", "hover-img-glow", "hover-img-float"];
                  const animClass = anims[i % anims.length];
                  return (
                    <div key={s.n} className={`relative aspect-[4/5] w-[78%] shrink-0 snap-start overflow-hidden sm:w-[46%] md:w-[32%] lg:w-[22%] rounded-xl shadow-md ${animClass}`}>
                      <ImageWithFallback
                        src={s.image}
                        alt={s.title}
                        className="editorial-img absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-bone">
                        <div className="font-display text-[13px] font-semibold tracking-[0.18em] text-brass">{s.n}</div>
                        <h3 className="mt-1 font-display text-[18px] font-semibold">{s.title}</h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-bone/80">{s.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section className="bg-bone">
        <div className="py-20 lg:py-28">
          <div className="container mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
            <Reveal>
              <h2 data-aos="fade-down" className="text-center font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] text-ink">
                Specialized services
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.title} delay={Math.min(i * 60, 240)}>
                    <div className="h-full border border-bone-300 bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-15px_rgba(34,34,34,0.15)]">
                      <div className="mb-5 inline-flex bg-brass p-4 text-black">
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display text-[18px] font-semibold text-ink">
                        <Link href={s.href} className="hover:text-brass-dark">
                          {s.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-ink/60">{s.desc}</p>
                      <Link
                        href={s.href}
                        aria-label={`Learn more about ${s.title}`}
                        className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-ink transition-colors hover:text-brass-dark"
                      >
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== RECENT PROJECTS ==================== */}
      <section>
        <div className="py-20 lg:py-28">
          <div className="container mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
            <Reveal>
              <h2 data-aos="fade-down" className="text-center font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] text-ink">
                Recent completed projects
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {displayProjects.map((p, i) => {
                const anims = ["hover-img-tilt", "hover-img-zoom", "hover-img-glow", "hover-img-vibrant"];
                const animClass = anims[i % anims.length];
                return (
                  <Reveal key={`${p.title}-${i}`} delay={Math.min(i * 80, 240)}>
                    <Link href={p.href} className="group block">
                      <div className={`relative aspect-[4/5] overflow-hidden rounded-xl shadow-md ${animClass}`}>
                        <ImageWithFallback
                          src={p.image}
                          alt={p.title}
                          className="editorial-img absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5 text-bone">
                          <h3 className="font-display text-[18px] font-semibold">{p.title}</h3>
                          <p className="mt-1 text-[13px] text-bone/80">{p.meta}</p>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
            <Reveal delay={200}>
              <div className="mt-12 flex justify-center">
                <Link
                  href="/portfolio"
                  aria-label="Explore more completed projects"
                  className="inline-flex items-center gap-3 bg-brass px-7 py-4 text-[14px] font-semibold text-black transition-colors hover:bg-brass-light"
                >
                  Explore more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================== UPCOMING PROJECTS (HOME REFLECTION) ==================== */}
      {activeUpcoming.length > 0 && (
        <section className="bg-paper border-y border-bone-300/80">
          <div className="py-20 lg:py-28">
            <div className="container mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
              <Reveal>
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono text-[11px] font-bold tracking-wider uppercase mb-3 border border-amber-500/20">
                    <Sparkles className="h-3.5 w-3.5" />
                    PRE-BOOKINGS &amp; EARLY BIRD LAUNCHES
                  </span>
                  <h2 data-aos="fade-down" className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] text-ink">
                    Upcoming Mega Layouts
                  </h2>
                  <p className="mt-3 max-w-xl mx-auto text-[15px] text-ink/70">
                    Reserve your plots before public launch with verified legal clearances and prime highway connectivity.
                  </p>
                </div>
              </Reveal>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {activeUpcoming.slice(0, 3).map((item, idx) => (
                  <Reveal key={item.id} delay={Math.min(idx * 90, 270)}>
                    <div className="group relative overflow-hidden rounded-2xl border border-bone-300 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-amber-400/50 flex flex-col h-full">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        
                        {/* Status Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="inline-block px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30 shadow-sm">
                            {item.preBookingStatus}
                          </span>
                        </div>

                        {/* Launch Date */}
                        <div className="absolute bottom-3 left-3 text-bone text-xs font-semibold flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
                          <Calendar className="h-3.5 w-3.5 text-amber-400" />
                          <span>Launch: {item.expectedLaunch}</span>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-ink/60 mb-1.5 font-medium">
                            <MapPin className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                            <span>{item.location}</span>
                          </div>
                          <h3 className="font-display text-lg font-bold text-ink group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            {item.name}
                          </h3>
                          <p className="mt-2 text-xs leading-relaxed text-ink/65 line-clamp-2">
                            {item.highlights}
                          </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-bone-200 dark:border-white/10 flex items-center justify-between">
                          <div className="text-[11px] font-mono text-ink/70">
                            <span className="font-bold text-ink">{item.totalAcres}</span> · {item.estimatedPlots} Plots
                          </div>
                          <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline"
                          >
                            <span>Pre-Book</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink/80 hover:text-amber-600 border-b border-ink/20 pb-1"
                >
                  <span>View All Upcoming Projects on Portfolio</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="bg-bone">
        <div className="py-20 lg:py-28">
          <div className="container mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
            <Reveal>
              <h2 data-aos="fade-down" className="text-center font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] text-ink">
                What our customers say
              </h2>
            </Reveal>
            <div className="mt-12">
              <Reveal>
                <div className="mx-auto max-w-[760px] text-center">
                  <Quote className="mx-auto h-10 w-10 text-brass" strokeWidth={1.2} />
                  <h3 className="mt-6 font-display text-[22px] font-semibold text-ink">
                    &ldquo;{currentReview.text}&rdquo;
                  </h3>
                  <div className="mt-8">
                    <div className="font-display text-[18px] font-semibold text-ink">
                      {currentReview.name}
                    </div>
                    <div className="mt-1 text-[15px] text-ink/60">{currentReview.role}</div>
                  </div>
                </div>
              </Reveal>
              <div className="mt-10 flex justify-center gap-3">
                {displayReviews.map((_, i) => (
                  <button
                    suppressHydrationWarning
                    key={i}
                    aria-label={`Testimonial ${i + 1}`}
                    onClick={() => setTestimonialIndex(i)}
                    className="flex h-6 w-6 items-center justify-center"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full transition-colors ${
                        i === currentReviewIndex ? "bg-brass" : "bg-ink/20"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section
        className="relative overflow-hidden bg-cover bg-center py-24 lg:py-32"
        style={{ backgroundImage: "url('/img7.webp')" }}
      >
        <div className="absolute inset-0 bg-ink/75" />
        <div className="relative container mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
          <Reveal>
            <h2 data-aos="fade-down" className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-[-0.02em] text-bone">
              Ready to own your plot?
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 max-w-2xl text-[18px] text-bone/80">
              Contact us today to start your project. Clear titles, honest pricing, no obligation.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <a
              href="tel:+919176783332"
              className="mt-8 inline-flex items-center gap-3 bg-brass px-7 py-4 text-[14px] font-semibold text-black transition-colors hover:bg-brass-light"
            >
              <Phone className="h-4 w-4" />
              Call now
            </a>
          </Reveal>
        </div>
      </section>

      {/* ==================== BLOG ==================== */}
      <section>
        <div className="py-20 lg:py-28">
          <div className="container mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
            <Reveal>
              <h2 data-aos="fade-down" className="text-center font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] text-ink">
                Explore our insights
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {posts.map((p, i) => {
                const anims = ["hover-img-tilt", "hover-img-zoom", "hover-img-vibrant"];
                const animClass = anims[i % anims.length];
                return (
                  <Reveal key={p.title} delay={Math.min(i * 100, 240)}>
                    <article className="group">
                      <Link href={p.href} className={`block overflow-hidden rounded-xl shadow-md ${animClass}`} aria-label={`Read more: ${p.title}`}>
                        <ImageWithFallback
                          src={p.image}
                          alt={p.title}
                          className="editorial-img aspect-[16/10] w-full object-cover"
                        />
                      </Link>
                    <div className="mt-5">
                      <ul className="flex flex-wrap items-center gap-3 text-[13px] text-ink/50">
                        <li>AAA Promoterz</li>
                        <li className="relative pl-3 before:absolute before:left-0 before:top-1/2 before:h-4 before:w-px before:-translate-y-1/2 before:bg-bone-300">
                          {p.date}
                        </li>
                      </ul>
                      <h3 className="mt-3 font-display text-[18px] font-semibold text-ink">
                        <Link href={p.href} className="hover:text-brass-dark">
                          {p.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-ink/60">{p.excerpt}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
            </div>
            <Reveal delay={200}>
              <div className="mt-12 flex justify-center">
                <Link
                  href="/blog"
                  aria-label="See more journal posts"
                  className="inline-flex items-center gap-3 bg-brass px-7 py-4 text-[14px] font-semibold text-black transition-colors hover:bg-brass-light"
                >
                  See more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="bg-bone">
        <div className="py-20 lg:py-28">
          <div className="container mx-auto max-w-[900px] px-5 sm:px-6 lg:px-10">
            <Reveal>
              <h2 data-aos="fade-down" className="text-center font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] text-ink">
                Frequently asked questions
              </h2>
            </Reveal>
            <div className="mt-12 flex flex-col gap-4">
              {faqs.map((f, i) => (
                <div key={f.q} className="border border-bone-300 bg-paper">
                  <button
                    suppressHydrationWarning
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-[18px] font-semibold text-ink">{f.q}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-brass text-black">
                      {faqOpen === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      faqOpen === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink/70">{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
