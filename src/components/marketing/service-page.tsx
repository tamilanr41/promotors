"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin, Minus, Plus } from "lucide-react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import PageHeader from "./page-header";
import Eyebrow from "./eyebrow";
import Reveal from "./reveal";
import CtaBand from "./cta-band";
import { useLiveContent, ProjectItem } from "@/lib/content-store";

export type ServicePageData = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  bgImage?: string;
  facts: { value: string; label: string }[];
  introTitle: React.ReactNode;
  introText: string;
  introSecondary: string;
  checklist: string[];
  scope: { title: string; text: string }[];
  process: { title: string; text: string }[];
  projects: { title: string; location: string; image: string }[];
  faqs: { q: string; a: string }[];
  ctaTitle: React.ReactNode;
  ctaDescription: string;
};

export default function ServicePage({ data }: { data: ServicePageData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [liveProjects] = useLiveContent<ProjectItem>("projects", []);
  const activeProjects = liveProjects.filter((p) => p.isActive !== false);

  // Match live projects from Admin Dashboard by category
  const eyebrowStr = typeof data.eyebrow === "string" ? data.eyebrow.toLowerCase() : "";
  const matchedProjects = activeProjects.filter((p) => {
    const cat = (p.category || "").toLowerCase();
    if (eyebrowStr.includes("residential")) {
      return cat.includes("residential") || cat.includes("villa") || cat.includes("layout") || cat.includes("farm");
    }
    if (eyebrowStr.includes("commercial")) {
      return cat.includes("commercial");
    }
    if (eyebrowStr.includes("industrial")) {
      return cat.includes("industrial");
    }
    if (eyebrowStr.includes("infrastructure")) {
      return cat.includes("infrastructure") || cat.includes("gated");
    }
    if (eyebrowStr.includes("renovation")) {
      return cat.includes("renovation") || cat.includes("construct") || cat.includes("building");
    }
    return false;
  });

  const projectsToDisplay =
    matchedProjects.length > 0
      ? matchedProjects.map((p) => ({
          title: p.name,
          location: p.location,
          image: p.image || "/img1.png",
        }))
      : data.projects;

  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow={data.eyebrow}
        title={data.title}
        description={data.description}
        image={data.image}
        imageAlt={data.imageAlt}
        imageCaption={data.imageCaption}
        bgImage={data.bgImage || "/layoutarak1.jpeg"}
        facts={data.facts}
      />

      {/* Intro */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28 xl:px-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <Eyebrow>What we do</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,3.8vw,3.1rem)] font-bold leading-[1.08] text-ink">
                {data.introTitle}
              </h2>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink/60">
                {data.introText}
              </p>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/60">
                {data.introSecondary}
              </p>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
              <div className="border-l border-brass pl-6">
                <p className="text-[10px] uppercase tracking-[0.24em] text-brass-dark">
                  Included as standard
                </p>
                <ul className="mt-5 space-y-3.5">
                  {data.checklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink/65">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass-dark" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="bg-bone">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28 xl:px-16">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>Scope of work</Eyebrow>
                <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.9rem,3.8vw,3.1rem)] font-bold leading-[1.08] text-ink">
                  Everything the <span className="text-brass-dark">brief</span> needs.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-ink/65 md:text-right">
                One team, one written scope — so nothing gets lost between the drawing and the site.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 border-t border-ink/15">
            {data.scope.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i * 50, 200)}>
                <div className="group grid gap-3 border-b border-ink/10 py-6 md:grid-cols-[3.5rem_1fr_1.5fr] md:items-baseline md:gap-8 md:py-7">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-brass-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl text-ink transition-transform duration-500 group-hover:translate-x-1 sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink/65">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28 xl:px-16">
          <Reveal>
            <Eyebrow light>How it runs</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.9rem,3.8vw,3.1rem)] font-bold leading-[1.08]">
              A clear process, from first call to <span className="text-brass-light">handover</span>.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 border-t border-bone/15 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {data.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div>
                  <span className="font-display text-4xl font-bold text-brass/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-bone">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-bone/65">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28 xl:px-16">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>On site</Eyebrow>
                <h2 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,2.9rem)] font-bold leading-[1.08] text-ink">
                  Recent <span className="text-brass-dark">work</span>.
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-3 border-b border-ink/25 pb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/75 transition-colors hover:border-brass-dark hover:text-ink"
              >
                View full portfolio
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {projectsToDisplay.map((project, i) => {
              const anims = ["hover-img-tilt", "hover-img-zoom", "hover-img-glow", "hover-img-vibrant", "hover-img-float"];
              const anim = anims[i % anims.length];
              return (
                <Reveal key={`${project.title}-${i}`} delay={Math.min(i * 80, 160)}>
                  <Link href="/portfolio" className="group block">
                    <div className={`relative aspect-[4/3] overflow-hidden rounded-xl shadow-md ${anim}`}>
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="editorial-img absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-4">
                      <h3 className="font-display text-xl text-ink transition-colors group-hover:text-brass-dark">
                        {project.title}
                      </h3>
                      <span className="flex shrink-0 items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-ink/65">
                        <MapPin className="h-3 w-3" />
                        {project.location}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-ink/10 bg-bone">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28 xl:px-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-bold leading-[1.08] text-ink">
                Straight <span className="text-brass-dark">answers</span>.
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/65">
                Something not covered here? Call us — we would rather explain it than leave it vague.
              </p>
              <a
                href="tel:+919176783332"
                className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brass-dark hover:text-ink"
              >
                +91 91767 83332
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Reveal>

            <div className="lg:col-span-7 lg:col-start-6">
              {data.faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <Reveal key={faq.q} delay={Math.min(i * 40, 160)}>
                    <div className="border-b border-ink/15 first:border-t">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="group flex w-full items-center justify-between gap-5 py-5 text-left"
                      >
                        <span className="font-display text-lg text-ink sm:text-xl">{faq.q}</span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-ink/20 text-ink/65 transition-colors group-hover:border-ink group-hover:text-ink">
                          {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                        </span>
                      </button>
                      <div
                        className={`grid overflow-hidden transition-all duration-500 ease-out ${
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="min-h-0">
                          <p className="max-w-2xl pb-6 text-sm leading-relaxed text-ink/65">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Next step"
        title={data.ctaTitle}
        description={data.ctaDescription}
        image={data.image}
        points={[]}
      />
    </div>
  );
}
