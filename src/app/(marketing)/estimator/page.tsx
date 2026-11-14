"use client";

import { useState } from "react";
import {
  Home,
  Building2,
  Factory,
  Road,
  PaintBucket,
  ArrowUpRight,
  Info,
  Phone,
} from "lucide-react";
import PageHeader from "@/components/marketing/page-header";
import Reveal from "@/components/marketing/reveal";
import Eyebrow from "@/components/marketing/eyebrow";

const projectTypes = [
  { value: "residential", label: "Residential", icon: Home, rate: 1850 },
  { value: "commercial", label: "Commercial", icon: Building2, rate: 2200 },
  { value: "industrial", label: "Industrial", icon: Factory, rate: 1950 },
  { value: "infrastructure", label: "Infrastructure", icon: Road, rate: 1250 },
  { value: "renovation", label: "Renovation", icon: PaintBucket, rate: 980 },
];

const locations = [
  "Arakkonam",
  "Thiruthani",
  "Maduranthangam",
  "Acharapakkam",
  "Kanchipuram",
  "Tiruvallur",
  "Other",
];

const qualityOptions = [
  { value: "economy", label: "Economy", multiplier: 0.85 },
  { value: "standard", label: "Standard", multiplier: 1 },
  { value: "premium", label: "Premium", multiplier: 1.35 },
  { value: "luxury", label: "Luxury", multiplier: 1.7 },
];

const timelineOptions = [
  { value: "relaxed", label: "Relaxed", multiplier: 0.95 },
  { value: "normal", label: "Standard", multiplier: 1 },
  { value: "expedited", label: "Expedited", multiplier: 1.18 },
];

const breakdown = [
  { label: "Foundation & structure", pct: 0.38 },
  { label: "MEP & services", pct: 0.2 },
  { label: "Finishes & fittings", pct: 0.2 },
  { label: "Labour & supervision", pct: 0.17 },
  { label: "Approvals & contingency", pct: 0.05 },
];

const WHATSAPP_NUMBER = "919176783332";

function formatINR(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export default function EstimatorPage() {
  const [formData, setFormData] = useState({
    projectType: "residential",
    area: "",
    location: "Arakkonam",
    quality: "standard",
    timeline: "normal",
    notes: "",
  });

  const projectType = projectTypes.find((t) => t.value === formData.projectType) ?? projectTypes[0];
  const quality = qualityOptions.find((q) => q.value === formData.quality) ?? qualityOptions[1];
  const timeline = timelineOptions.find((t) => t.value === formData.timeline) ?? timelineOptions[1];

  const area = Number(formData.area) || 0;
  const rate = projectType.rate * quality.multiplier * timeline.multiplier;
  const total = area * rate;
  const hasEstimate = area > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Quote request - AAA Promoterz & Builders",
      "",
      `Project type: ${projectType.label}`,
      `Built-up area: ${area.toLocaleString("en-IN")} sq ft`,
      `Location: ${formData.location}`,
      `Quality: ${quality.label}`,
      `Timeline: ${timeline.label}`,
      hasEstimate ? `Indicative estimate: ${formatINR(total)}` : "Indicative estimate: not calculated",
      "",
      formData.notes ? `Notes: ${formData.notes}` : "",
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full border-b border-ink/20 bg-transparent py-3 text-base text-ink transition-colors focus:border-brass-dark focus:outline-none";
  const labelClass = "mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/65";

  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow="Cost calculator"
        title={
          <>
            Know the cost
            <br />
            before you <span className="text-amber-400">commit</span>.
          </>
        }
        description="An indicative construction estimate for Tamil Nadu rates. Adjust the type, area and finish to see a realistic range — then ask us for an itemised quote."
        image="/img3.png"
        imageAlt="Construction site"
        imageCaption="Estimate · Indicative rates"
        bgImage="/img1.png"
      />

      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-24 xl:px-16">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            {/* Form */}
            <Reveal className="lg:col-span-7">
              <form onSubmit={handleSubmit}>
                <div className="flex items-baseline justify-between border-b border-ink/15 pb-4">
                  <h2 className="font-display text-3xl text-ink">Project details</h2>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/65">
                    01 / Input
                  </span>
                </div>

                <div className="mt-8">
                  <span className={labelClass}>Project type</span>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {projectTypes.map((type) => {
                      const Icon = type.icon;
                      const active = formData.projectType === type.value;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: type.value })}
                          className={`flex items-center gap-2.5 border px-4 py-3 text-left text-xs font-medium transition-colors duration-300 ${
                            active
                              ? "border-ink bg-ink text-bone"
                              : "border-ink/15 text-ink/60 hover:border-ink/40 hover:text-ink"
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 ${active ? "text-brass-light" : "text-ink/65"}`}
                            strokeWidth={1.6}
                          />
                          {type.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="area" className={labelClass}>
                      Built-up area (sq ft)
                    </label>
                    <input
                      id="area"
                      type="number"
                      min={100}
                      max={100000}
                      step={50}
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="e.g. 1800"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className={labelClass}>
                      Location
                    </label>
                    <select
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className={`${inputClass} appearance-none`}
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="quality" className={labelClass}>
                      Finish quality
                    </label>
                    <select
                      id="quality"
                      value={formData.quality}
                      onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                      className={`${inputClass} appearance-none`}
                    >
                      {qualityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className={labelClass}>
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className={`${inputClass} appearance-none`}
                    >
                      {timelineOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-8">
                  <label htmlFor="notes" className={labelClass}>
                    Anything else we should know?
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Plot size, number of floors, compound wall, timeline constraints…"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-3 bg-ink px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-bone transition-colors hover:bg-brass hover:text-black"
                  >
                    Request an itemised quote
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <a
                    href="tel:+919176783332"
                    className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/65 transition-colors hover:text-ink"
                  >
                    <Phone className="h-3.5 w-3.5 text-brass-dark" />
                    Or call +91 91767 83332
                  </a>
                </div>

                <div className="mt-8 flex items-start gap-2 border-t border-ink/10 pt-5 text-[11px] leading-relaxed text-ink/65">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass-dark" />
                  <p>
                    This is an indicative calculator based on typical Tamil Nadu rates. Final pricing
                    depends on soil, design, approvals and site conditions, and is confirmed only
                    after an inspection.
                  </p>
                </div>
              </form>
            </Reveal>

            {/* Summary */}
            <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28">
                <div className="flex items-baseline justify-between border-b border-ink/15 pb-4">
                  <h2 className="font-display text-3xl text-ink">Your estimate</h2>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/65">
                    02 / Summary
                  </span>
                </div>

                <div className="border border-ink/10 p-7">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-ink/65">
                    Indicative project cost
                  </p>
                  <div className="mt-3 font-display text-[clamp(2rem,4vw,2.9rem)] leading-none text-ink">
                    {hasEstimate ? formatINR(total) : "₹ —"}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-ink/65">
                    {hasEstimate
                      ? `${area.toLocaleString("en-IN")} sq ft · ${formatINR(rate)} / sq ft`
                      : "Enter a built-up area to calculate."}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-ink/65">
                    <span>{projectType.label}</span>
                    <span className="text-brass-dark">/</span>
                    <span>{quality.label}</span>
                    <span className="text-brass-dark">/</span>
                    <span>{timeline.label}</span>
                  </div>

                  <div className="mt-7 border-t border-ink/10 pt-5">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-ink/65">
                      <span>Breakdown</span>
                      <span>Share</span>
                    </div>
                    <div className="mt-3 space-y-2.5">
                      {breakdown.map((row) => (
                        <div key={row.label} className="flex items-baseline justify-between gap-3">
                          <span className="text-xs text-ink/60">{row.label}</span>
                          <span className="font-mono text-[11px] text-ink/70">
                            {hasEstimate
                              ? formatINR(total * row.pct)
                              : `${Math.round(row.pct * 100)}%`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 border-t border-ink/10 pt-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-ink/65">Rates used</p>
                    <p className="mt-2 text-xs leading-relaxed text-ink/65">
                      {formatINR(projectType.rate)} base · {quality.label} finish ({quality.multiplier}
                      ×) · {timeline.label} timeline ({timeline.multiplier}×)
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-[11px] leading-relaxed text-ink/65">
                  Estimates exclude land cost, statutory deposits and any bespoke design fees.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we include */}
      <section className="border-t border-ink/10 bg-bone">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-20 xl:px-16">
          <Reveal>
            <Eyebrow>What the number covers</Eyebrow>
            <div className="mt-8 grid gap-8 md:grid-cols-4">
              {[
                { title: "Materials", text: "Cement, steel, bricks, sand, aggregate and finishing materials at current market rates." },
                { title: "Labour", text: "Skilled and unskilled labour, supervision and site management through completion." },
                { title: "Services", text: "Electrical, plumbing and sanitary installations, tested before handover." },
                { title: "Approvals", text: "Standard plan approvals and statutory filings, excluding government deposits." },
              ].map((item, i) => (
                <div key={item.title} className="border-t border-ink/20 pt-5">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-brass-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-xl text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
