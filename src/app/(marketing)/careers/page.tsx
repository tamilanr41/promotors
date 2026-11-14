import { ArrowUpRight, Check, Mail, MapPin } from "lucide-react";
import Eyebrow from "@/components/marketing/eyebrow";
import PageHeader from "@/components/marketing/page-header";
import Reveal from "@/components/marketing/reveal";
import CtaBand from "@/components/marketing/cta-band";

const reasons = [
  {
    title: "Small team, real ownership",
    text: "You will not be a number in a large system. Every person here owns a piece of the work and sees the result on the ground.",
  },
  {
    title: "Learn land from the land",
    text: "Site visits, surveys, registration and construction — the work happens in the field, not just in slides.",
  },
  {
    title: "Honest dealing, by default",
    text: "We work the way we ask our team to work: clear prices, written commitments and no shortcuts on documents.",
  },
  {
    title: "Grow with the company",
    text: "As our locations expand across Tamil Nadu, the people who build the systems grow with them.",
  },
];

const roles = [
  {
    title: "Sales Executive",
    type: "Field · Full-time",
    location: "Chennai / Arakkonam",
    text: "Guide buyers through plot options, site visits and documentation. Prior land or real-estate experience is welcome, but honesty matters more.",
  },
  {
    title: "Site Supervisor",
    type: "Field · Full-time",
    location: "Arakkonam / Maduranthangam",
    text: "Supervise layout development and construction works — roads, drainage, compound walls and services. Civil background preferred.",
  },
  {
    title: "Civil Engineer",
    type: "Full-time",
    location: "Chennai",
    text: "Plan and check layout and construction works, coordinate contractors, and keep quality and timelines on track.",
  },
  {
    title: "Marketing & Content",
    type: "Hybrid",
    location: "Chennai",
    text: "Photograph sites, write clear project notes and manage our listings and social presence in Tamil and English.",
  },
];

const steps = [
  {
    n: "01",
    title: "Send your profile",
    text: "Email your CV or a short note about your experience to our team. A WhatsApp message with your CV works too.",
  },
  {
    n: "02",
    title: "A conversation",
    text: "We will call you to understand what you have done and what you want to do next. No tests, no puzzles.",
  },
  {
    n: "03",
    title: "Meet the team",
    text: "Visit the office or a site, meet the people you would work with, and decide together whether it fits.",
  },
];

export default function CareersPage() {
  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow="Careers"
        title={
          <>
            Build your career
            <br />
            on solid <span className="text-brass-light">ground</span>.
          </>
        }
        description="We are a small land and construction team in Tamil Nadu. If you like real work, clear paperwork and seeing a layout come together, we would like to meet you."
        image="/img7.png"
        imageAlt="AAA Promoterz site"
        imageCaption="Site development · Arakkonam"
      />

      {/* Why join */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28 xl:px-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <Eyebrow>Why join us</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.08] text-ink">
                Work that stands on the <span className="text-brass-dark">ground</span>.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/65">
                We are not a large corporate. We are people who develop land, sell it honestly and
                build on it well. That shapes everything about working here.
              </p>
            </Reveal>

            <div className="lg:col-span-7 lg:col-start-6">
              {reasons.map((reason, i) => (
                <Reveal key={reason.title} delay={Math.min(i * 60, 180)}>
                  <div className="border-b border-ink/10 py-6 first:pt-0">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-brass-dark">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-xl text-ink sm:text-2xl">{reason.title}</h3>
                    </div>
                    <p className="mt-2 pl-9 text-sm leading-relaxed text-ink/65">{reason.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="bg-bone">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28 xl:px-16">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>Roles we hire for</Eyebrow>
                <h2 className="mt-5 font-display text-[clamp(1.9rem,3.8vw,3.1rem)] font-bold leading-[1.08] text-ink">
                  Where you might <span className="text-brass-dark">fit</span>.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-ink/65 md:text-right">
                We keep profiles on file and reach out when a role opens. Send yours even if nothing
                is listed as open today.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 border-t border-ink/15">
            {roles.map((role, i) => (
              <Reveal key={role.title} delay={Math.min(i * 60, 180)}>
                <div className="group grid gap-4 border-b border-ink/10 py-7 md:grid-cols-[3rem_1.1fr_1.6fr_auto] md:items-center md:gap-8 md:py-8">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-brass-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-ink sm:text-2xl">{role.title}</h3>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ink/65">
                      {role.type}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-ink/65">{role.text}</p>
                  <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                    <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-ink/65">
                      <MapPin className="h-3 w-3" />
                      {role.location}
                    </span>
                    <a
                      href={`mailto:aaapromoterzandbuilders@gmail.com?subject=${encodeURIComponent(
                        `Application — ${role.title}`
                      )}`}
                      className="group/link inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-brass-dark transition-colors hover:text-ink"
                    >
                      Apply
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28 xl:px-16">
          <Reveal>
            <Eyebrow>How to apply</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.9rem,3.8vw,3.1rem)] font-bold leading-[1.08] text-ink">
              Three simple <span className="text-brass-dark">steps</span>.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 80}>
                <div className="border-t border-ink/20 pt-6">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-brass-dark">
                    {step.n}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-ink">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/65">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-14 flex flex-col gap-6 border border-ink/10 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-2xl text-ink">Ready to introduce yourself?</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-ink/65">
                  <Mail className="h-4 w-4 text-brass-dark" />
                  aaapromoterzandbuilders@gmail.com
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:aaapromoterzandbuilders@gmail.com?subject=Career%20enquiry%20—%20AAA%20Promoterz"
                  className="inline-flex items-center gap-3 bg-ink px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-bone transition-colors hover:bg-brass hover:text-black"
                >
                  Email your CV
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="https://wa.me/919176783332?text=Hi%2C%20I%20would%20like%20to%20share%20my%20profile%20for%20a%20role%20at%20AAA%20Promoterz."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border border-ink/25 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/75 transition-colors hover:border-ink hover:text-ink"
                >
                  Send on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {["Chennai office", "Site roles across Tamil Nadu", "Applications kept confidential"].map(
                (item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-ink/65"
                  >
                    <Check className="h-3.5 w-3.5 text-brass-dark" />
                    {item}
                  </span>
                )
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Not a job enquiry?"
        title={
          <>
            Looking for land
            <br />
            instead? <span className="text-brass-light">Start here.</span>
          </>
        }
        description="Our team is always happy to walk you through available plots, farm lands and upcoming locations."
        points={[]}
      />
    </div>
  );
}
