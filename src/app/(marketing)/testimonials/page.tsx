"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Quote, Star } from "lucide-react";
import Eyebrow from "@/components/marketing/eyebrow";
import PageHeader from "@/components/marketing/page-header";
import Reveal from "@/components/marketing/reveal";
import CtaBand from "@/components/marketing/cta-band";
import { useLiveContent, TestimonialItem } from "@/lib/content-store";

const defaultTestimonials: TestimonialItem[] = [
  {
    id: "REV-001",
    name: "S. Karthik",
    role: "Plot Owner · Phase 1",
    location: "Arakkonam Layout",
    rating: 5,
    text: "Clear paperwork, transparent pricing and a team that actually answers calls. We got our registered plot exactly on the promised date without any hassle.",
    featured: true,
    active: true,
    date: "2026-04-18",
  },
  {
    id: "REV-002",
    name: "Priya & Ramesh",
    role: "Homeowners",
    location: "Maduranthangam Royal Town",
    rating: 5,
    text: "From the first site visit to the final sub-registrar registration, everything was explained in writing. No surprises, no hidden charges. Highly recommended developer.",
    featured: true,
    active: true,
    date: "2026-04-12",
  },
  {
    id: "REV-003",
    name: "V. Muthu",
    role: "Farmland Owner",
    location: "Chengalpattu belt",
    rating: 5,
    text: "Their verification of patta, chitta and EC gave us the confidence to buy. The land is exactly as described.",
    featured: false,
    active: true,
    date: "2026-03-29",
  },
  {
    id: "REV-004",
    name: "Lakshmi Narayanan",
    role: "Plot Owner",
    location: "Thiruthani Layout",
    rating: 5,
    text: "Roads, drainage and street lights were all in place before we paid. A rare, honest developer in Tamil Nadu.",
    featured: false,
    active: true,
    date: "2026-03-15",
  },
];

const stats = [
  { value: "500+", label: "Happy customers" },
  { value: "10+", label: "Years in land" },
  { value: "100%", label: "Clear titles" },
  { value: "4.9", label: "Average rating" },
];

export default function TestimonialsPage() {
  const [liveTestimonials] = useLiveContent<TestimonialItem>("testimonials", defaultTestimonials);

  const activeReviews = liveTestimonials.filter((t) => t.active !== false);
  const reviewsToUse = activeReviews.length > 0 ? activeReviews : defaultTestimonials;

  const featured = reviewsToUse.find((t) => t.featured) || reviewsToUse[0];
  const rest = reviewsToUse.filter((t) => t.id !== featured?.id);

  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow="Client stories"
        title={
          <>
            Words from the people
            <br />
            who now own <span className="text-amber-400">land</span>.
          </>
        }
        description="Every plot has a family behind it. These are their words, shared after site visits, registrations and handovers across Tamil Nadu."
        image="/layoutmad1.jpeg"
        imageAlt="Maduranthangam layout"
        imageCaption="Maduranthangam · Registered layout"
        bgImage="/img3.png"
        facts={stats}
      />

      {/* Featured testimonial */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28 xl:px-16">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-3">
                <Quote className="h-10 w-10 text-brass" strokeWidth={1.2} />
                <div className="mt-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-brass-dark text-brass-dark" />
                  ))}
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-ink/65">
                  Featured review
                </p>
              </div>
              <div className="lg:col-span-8 lg:col-start-5">
                <blockquote className="font-display text-[clamp(1.7rem,3.4vw,2.9rem)] font-bold leading-[1.2] tracking-[-0.01em] text-ink">
                  &ldquo;{featured.text}&rdquo;
                </blockquote>
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/15 pt-5">
                  <span className="font-display text-xl text-ink">{featured.name}</span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-ink/65">
                    {featured.role}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-brass-dark">
                    <MapPin className="h-3 w-3" />
                    {featured.location}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonial index */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28 xl:px-16">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>More voices</Eyebrow>
                <h2 className="mt-5 max-w-xl font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold leading-[1.1] text-ink">
                  Honest words from across our <span className="text-brass-dark">layouts</span>.
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-3 border-b border-ink/25 pb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/75 transition-colors hover:border-brass-dark hover:text-ink"
              >
                See the projects they bought into
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 border-t border-ink/15">
            {rest.map((item, i) => (
              <Reveal key={item.id || item.name} delay={Math.min(i * 70, 210)}>
                <article className="group grid gap-5 border-b border-ink/10 py-9 md:grid-cols-[3.5rem_1fr_15rem] md:gap-10 md:py-11">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-brass-dark">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <p className="max-w-2xl font-display text-xl leading-relaxed text-ink/85 sm:text-2xl">
                    &ldquo;{item.text}&rdquo;
                  </p>
                  <div className="md:text-right">
                    <div className="font-display text-lg text-ink">{item.name}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ink/65">
                      {item.role}
                    </div>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-brass-dark">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="mt-14 grid gap-8 border border-ink/10 p-8 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <h3 className="font-display text-2xl text-ink">Bought land from us?</h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/65">
                  Share your experience — it helps the next family decide with confidence.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 self-start bg-ink px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-bone transition-colors hover:bg-brass hover:text-black sm:self-auto"
              >
                Share your story
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Next chapter"
        title={
          <>
            Become our next
            <br />
            <span className="text-brass-light">success</span> story.
          </>
        }
        description="Book a free site visit, review the documents with our team, and choose a plot with complete clarity."
      />
    </div>
  );
}
