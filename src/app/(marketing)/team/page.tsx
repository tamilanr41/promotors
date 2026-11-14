import ImageWithFallback from "@/components/ui/image-with-fallback";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import Eyebrow from "@/components/marketing/eyebrow";
import PageHeader from "@/components/marketing/page-header";
import Reveal from "@/components/marketing/reveal";
import CtaBand from "@/components/marketing/cta-band";

const facts = [
  { value: "10+", label: "Years of experience" },
  { value: "500+", label: "Happy customers" },
  { value: "100%", label: "Clear titles" },
  { value: "6", label: "Upcoming locations" },
];

const principles = [
  {
    title: "Clear titles, always",
    text: "Every plot is verified and registered before it reaches you. No encumbrances, no surprises at the sub-registrar office.",
  },
  {
    title: "Transparent pricing",
    text: "One written price for the land, the development and the registration. You will never discover a hidden charge later.",
  },
  {
    title: "Written contracts",
    text: "Construction and development work is agreed on paper — cost, material specification and timeline, signed by both sides.",
  },
  {
    title: "End-to-end support",
    text: "From the first site visit to the final handover, one accountable team stays with you through paperwork and follow-up.",
  },
];

const projects = [
  { title: "Maduranthangam Layout", image: "/layoutmad1.jpeg", location: "Maduranthangam" },
  { title: "Arakkonam Layout", image: "/layoutarak1.jpeg", location: "Arakkonam" },
  { title: "Farmland", image: "/formland.jpeg", location: "Tamil Nadu" },
  { title: "JP Avenue Plots", image: "/scetch1.jpeg", location: "Arakkonam" },
  { title: "Mullai Avenue Plots", image: "/scetch2.jpeg", location: "Arakkonam" },
  { title: "Farm Lands", image: "/img6.png", location: "Tamil Nadu" },
];

export default function TeamPage() {
  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow="About AAA Promoterz"
        title={
          <>
            A decade of land,
            <br />
            built on <span className="text-amber-400">trust</span>.
          </>
        }
        description="AAA Promoterz & Builders is a Chennai-based land and construction company, led by founder V Kirubanidhi and a responsive local team."
        image="/img7.png"
        imageAlt="AAA Promoterz layout site"
        imageCaption="Arakkonam · Site development"
        bgImage="/img6.png"
        facts={facts}
      />

      {/* Story */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28 xl:px-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <Eyebrow>Our story</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.08] text-ink">
                Trusted layouts &amp; farm lands for over a <span className="text-brass-dark">decade</span>.
              </h2>
              <div className="mt-8 hidden border border-ink/10 p-6 lg:block">
                <ImageWithFallback
                  src="/logo.png"
                  alt="AAA Promoterz & Builders"
                  className="h-20 w-full object-contain"
                />
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
              <p className="text-[15px] leading-relaxed text-ink/65">
                AAA Promoterz &amp; Builders is a trusted real-estate and construction company based in
                Chennai, Tamil Nadu. For 10+ years we have helped families and investors find
                clear-titled, well-planned residential layouts and fertile farming lands across
                Maduranthangam, Arakkonam, Thiruthani, Acharapakkam and Kanchipuram — with 100% clear
                titles on every plot.
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-ink/65">
                Beyond layouts and farm lands, we take on scheduled construction works, supply quality
                building materials, and execute honest, transparent construction contracts. Every
                project is handled end-to-end by our founder V Kirubanidhi and a responsive local team, so
                you always know exactly what you are paying for.
              </p>

              <div className="mt-10 border-l border-brass pl-6">
                <p className="font-display text-xl leading-relaxed text-ink sm:text-2xl">
                  &ldquo;Land is the one purchase a family remembers for a lifetime. It deserves
                  patience, paperwork and honesty.&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center border border-ink/20 font-display text-sm text-brass-dark font-bold bg-amber-500/10">
                    VK
                  </span>
                  <div>
                    <div className="font-display text-lg font-bold text-ink">V Kirubanidhi</div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-ink/65 font-mono">
                      Founder &amp; Managing Director, AAA Promoterz &amp; Builders
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-bone">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28 xl:px-16">
          <Reveal>
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.9rem,3.8vw,3.1rem)] font-bold leading-[1.08] text-ink">
              Four principles behind every <span className="text-brass-dark">plot</span>.
            </h2>
          </Reveal>

          <div className="mt-14 border-t border-ink/15">
            {principles.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i * 60, 180)}>
                <div className="grid gap-3 border-b border-ink/10 py-7 md:grid-cols-[3.5rem_1fr_1.4fr] md:items-baseline md:gap-8 md:py-9">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-brass-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flex items-center gap-3 font-display text-2xl text-ink">
                    <Check className="h-4 w-4 shrink-0 text-brass-dark" strokeWidth={2} />
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink/65">{item.text}</p>
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
                <Eyebrow>On the ground</Eyebrow>
                <h2 className="mt-5 font-display text-[clamp(1.9rem,3.8vw,3.1rem)] font-bold leading-[1.08] text-ink">
                  Projects we have <span className="text-brass-dark">shaped</span>.
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
            {projects.map((project, i) => {
              const anims = ["hover-img-tilt", "hover-img-zoom", "hover-img-glow", "hover-img-vibrant", "hover-img-float"];
              const anim = anims[i % anims.length];
              return (
                <Reveal key={project.title} delay={Math.min((i % 3) * 80, 160)}>
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

      <CtaBand
        eyebrow="Looking to invest?"
        title={
          <>
            Talk to the team
            <br />
            that <span className="text-brass-light">knows</span> the land.
          </>
        }
        description="Whether it is a first plot or a large farm land investment, we will walk you through the options and the paperwork — without pressure."
      />
    </div>
  );
}
