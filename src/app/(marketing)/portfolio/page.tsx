"use client";

import { useEffect, useState, useMemo } from "react";
import ImageWithFallback from "../../../components/ui/image-with-fallback";
import PageHeader from "../../../components/marketing/page-header";
import Reveal from "../../../components/marketing/reveal";
import CtaBand from "../../../components/marketing/cta-band";
import { X, ChevronLeft, ChevronRight, MapPin, ArrowUpRight } from "lucide-react";
import { useLiveContent, ProjectItem, UpcomingProjectItem } from "@/lib/content-store";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "layout", label: "Residential Layouts" },
  { id: "upcoming", label: "Upcoming Launches" },
  { id: "farm", label: "Farming Lands" },
];

const fallbackProjects = [
  { title: "Maduranthakam Layout", category: "layout", image: "/layoutmad1.jpeg", location: "Maduranthakam", description: "Residential layout with 5 phases" },
  { title: "Thiruthani Layout", category: "layout", image: "/img2.png", location: "Thiruthani", description: "Residential layout with 3 phases" },
  { title: "Maduranthangam Royal Town", category: "layout", image: "/img1.png", location: "Maduranthangam", description: "Residential layout with 2 phases" },
  { title: "Acharapakkam Agro Farm Lands", category: "farm", image: "/formland.jpeg", location: "Acharapakkam", description: "Fertile agricultural farming plots with borewell water" },
  { title: "Tiruvallur Metro City Layout", category: "upcoming", image: "/img4.png", location: "Tiruvallur", description: "14 Acres mega gated layout close to metro corridor" },
  { title: "Kanchipuram Silk City Enclave", category: "upcoming", image: "/img5.png", location: "Kanchipuram", description: "8 Acres residential layout with direct highway frontage" },
  { title: "Layout Site View", category: "layout", image: "/img7.png", location: "Maduranthakam", description: "Well-planned plots with roads & drainage" },
  { title: "Farmland", category: "farm", image: "/formland.jpeg", location: "Tamil Nadu", description: "Fertile agricultural farming land" },
  { title: "Arakkonam Site", category: "layout", image: "/layoutarak1.jpeg", location: "Arakkonam", description: "Well-planned residential layout" },
  { title: "Registered Voucher", category: "layout", image: "/notice.jpeg", location: "Arakkonam", description: "Registered sale voucher" },
  { title: "JP Avenue Plots", category: "layout", image: "/scetch1.jpeg", location: "Arakkonam", description: "JP Avenue plot sketch" },
  { title: "Mullai Avenue Plots", category: "layout", image: "/scetch2.jpeg", location: "Arakkonam", description: "Mullai Avenue plot sketch" },
];

const facts = [
  { value: "10+", label: "Completed layouts" },
  { value: "6", label: "Locations" },
  { value: "500+", label: "Plots handed over" },
  { value: "100%", label: "Clear titles" },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // REAL LIVE DATA FROM ADMIN DASHBOARD
  const [liveProjects] = useLiveContent<ProjectItem>("projects", []);
  const [liveUpcoming] = useLiveContent<UpcomingProjectItem>("upcoming", []);

  // Merge only ACTIVE items into the public portfolio showcase
  const allDisplayProjects = useMemo(() => {
    const list: Array<{ title: string; category: string; image: string; location: string; description: string; price?: string }> = [];

    // 1. Live Current Projects (Active Only)
    if (liveProjects && liveProjects.length > 0) {
      liveProjects.forEach((p) => {
        if (p.isActive !== false) {
          const isFarm = p.category?.toLowerCase().includes("farm") || p.name?.toLowerCase().includes("farm");
          list.push({
            title: p.name,
            category: isFarm ? "farm" : "layout",
            image: p.image || "/img1.png",
            location: p.location,
            description: `${p.description} • ${p.plotsCount} Plots Available • ${p.priceRange}`,
            price: p.priceRange,
          });
        }
      });
    }

    // 2. Live Upcoming Projects (Active Only)
    if (liveUpcoming && liveUpcoming.length > 0) {
      liveUpcoming.forEach((u) => {
        if (u.isActive !== false) {
          const isFarm = u.category?.toLowerCase().includes("farm");
          list.push({
            title: u.name,
            category: "upcoming",
            image: u.image || "/img4.png",
            location: u.location,
            description: `${u.highlights} • Launching: ${u.expectedLaunch} • ${u.totalAcres}`,
          });
        }
      });
    }

    // If both empty or first render, use fallback
    return list.length > 0 ? list : fallbackProjects;
  }, [liveProjects, liveUpcoming]);

  const filteredProjects =
    activeCategory === "all"
      ? allDisplayProjects
      : allDisplayProjects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i === null ? null : (i + 1) % filteredProjects.length));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i === null ? null : (i - 1 + filteredProjects.length) % filteredProjects.length
        );
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, filteredProjects.length]);

  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow="Selected work"
        title={
          <>
            Land, laid out
            <br />
            with <span className="text-amber-400">care</span>.
          </>
        }
        description="Completed layouts, farmland projects and site documentation across Tamil Nadu — every one verified, planned and registered the right way."
        image="/img1.png"
        imageAlt="Maduranthakam residential layout"
        imageCaption="Maduranthakam · Phase layout"
        bgImage="/img7.png"
        facts={facts}
      />

      {/* Filters */}
      <section className="border-b border-ink/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-12 xl:px-16">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative pb-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  activeCategory === cat.id ? "text-ink" : "text-ink/65 hover:text-ink/60"
                }`}
              >
                <span className="mr-2 font-mono text-[9px] text-brass-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {cat.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-brass-dark transition-all duration-300 ${
                    activeCategory === cat.id ? "w-full" : "w-0"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/65">
            {String(filteredProjects.length).padStart(2, "0")} projects
          </span>
        </div>
      </section>

      {/* Project mosaic */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12 lg:py-20 xl:px-16">
          <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, i) => {
              const wide = i === 0 || i === 7;
              const hoverEffects = ["hover-img-tilt", "hover-img-zoom", "hover-img-glow", "hover-img-vibrant", "hover-img-float"];
              const hoverClass = hoverEffects[i % hoverEffects.length];
              return (
                <Reveal
                  key={`${project.title}-${i}`}
                  delay={Math.min((i % 3) * 80, 160)}
                  className={wide ? "sm:col-span-2" : ""}
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="group block w-full text-left"
                  >
                    <div
                      className={`relative overflow-hidden bg-ink-800 rounded-2xl shadow-md ${hoverClass} shimmer-card ${
                        wide ? "aspect-[16/10]" : i % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/3]"
                      }`}
                    >
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="editorial-img absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                      <span className="absolute left-4 top-4 border border-bone/25 bg-ink/25 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-bone/85 backdrop-blur-sm rounded">
                        {project.category === "farm" ? "Farming Land" : "Residential Layout"}
                      </span>
                      <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center border border-bone/30 text-bone/80 opacity-0 transition-all duration-500 group-hover:opacity-100 rounded-full bg-black/40 backdrop-blur-sm">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-4">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[9px] text-brass-dark">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-xl text-ink transition-colors group-hover:text-brass-dark sm:text-2xl">
                          {project.title}
                        </h3>
                      </div>
                      <span className="shrink-0 text-[9px] uppercase tracking-[0.2em] text-ink/65">
                        {project.location}
                      </span>
                    </div>
                    <p className="mt-2 max-w-md text-xs leading-relaxed text-ink/65">
                      {project.description}
                    </p>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-32 text-center">
              <p className="font-display text-2xl text-ink/65">No projects in this category.</p>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        eyebrow="Plan a visit"
        title={
          <>
            Walk a layout in person
            <br />
            <span className="text-brass-light">before</span> you decide.
          </>
        }
        description="Tell us what you are looking for — plot size, budget and location — and we will arrange a site visit at your convenience."
      />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border border-bone/25 text-bone/80 transition-colors hover:border-brass hover:text-brass sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(
                (lightboxIndex - 1 + filteredProjects.length) % filteredProjects.length
              );
            }}
            className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center border border-bone/25 text-bone/80 transition-colors hover:border-brass hover:text-brass sm:left-6 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % filteredProjects.length);
            }}
            className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center border border-bone/25 text-bone/80 transition-colors hover:border-brass hover:text-brass sm:right-6 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative flex h-[70vh] max-h-[80vh] w-full items-center justify-center sm:h-[78vh]">
              <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${filteredProjects[lightboxIndex].image})` }}
              />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-bone/15 pt-4">
              <div>
                <p className="font-display text-xl text-bone">
                  {filteredProjects[lightboxIndex].title}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.22em] text-bone/65">
                  <MapPin className="h-3 w-3 text-brass" />
                  {filteredProjects[lightboxIndex].location}
                </p>
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-bone/65">
                {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                {String(filteredProjects.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
