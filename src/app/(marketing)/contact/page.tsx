"use client";

import { useState } from "react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import PageHeader from "@/components/marketing/page-header";
import Reveal from "@/components/marketing/reveal";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowUpRight } from "lucide-react";
import { fetchLiveContent, saveLiveContent } from "@/lib/content-store";

const contactInfo = [
  {
    icon: MapPin,
    title: "Head office",
    details: [{ text: "Chennai, Tamil Nadu", href: null }, { text: "India", href: null }],
  },
  {
    icon: Phone,
    title: "Phone",
    details: [{ text: "+91 91767 83332", href: "tel:+919176783332" }],
  },
  {
    icon: Mail,
    title: "Email",
    details: [
      {
        text: "aaapromoterzandbuilders@gmail.com",
        href: "mailto:aaapromoterzandbuilders@gmail.com",
      },
    ],
  },
  {
    icon: Clock,
    title: "Office hours",
    details: [
      { text: "Mon – Sat: 9:00 AM – 7:00 PM", href: null },
      { text: "Sunday: By appointment", href: null },
    ],
  },
];

const WHATSAPP_NUMBER = "919176783332";

const services = [
  "Residential Layout",
  "Farming Land",
  "Layout Development",
  "Plot Sale & Registration",
  "Investment Advisory",
];

const officePhotos = [
  { src: "/layoutmad1.jpeg", label: "Maduranthangam Layout" },
  { src: "/layoutarak1.jpeg", label: "Arakkonam Layout" },
  { src: "/formland.jpeg", label: "Farmland" },
  { src: "/scetch1.jpeg", label: "JP Avenue Plots" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "New Enquiry - AAA Promoterz & Builders",
      "",
      `Name: ${formData.firstName} ${formData.lastName}`.trim(),
      `Phone: ${formData.phone}`,
      `Email: ${formData.email}`,
      `Service: ${formData.service || "General"}`,
      `Message: ${formData.message}`,
    ];

    // Record to live Admin Dashboard Leads & Enquiries
    const newLead = {
      id: `LD-${Math.floor(100 + Math.random() * 900)}`,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      phone: formData.phone,
      email: formData.email,
      project: formData.service || "General Inquiry",
      plotSize: "Standard",
      budget: "On Request",
      status: "new" as const,
      source: "Website Contact Form",
      date: new Date().toISOString().split("T")[0],
      notes: formData.message || "Submitted via website contact form.",
    };

    fetchLiveContent().then((content) => {
      const existing = (content && content.leads) || [];
      saveLiveContent("leads", [newLead, ...existing]);
    });

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const inputClass =
    "peer w-full border-b border-ink/20 bg-transparent pb-2 pt-6 text-base text-ink transition-colors placeholder-transparent focus:border-brass-dark focus:outline-none";
  const labelClass =
    "pointer-events-none absolute left-0 top-0 text-[10px] uppercase tracking-[0.18em] text-ink/65 transition-all duration-200 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-brass-dark";

  return (
    <div className="bg-paper">
      {showToast && (
        <div className="fixed right-6 top-24 z-[130] flex max-w-[calc(100vw-3rem)] items-center gap-3 border border-ink/10 bg-ink px-5 py-3 text-xs text-bone shadow-2xl">
          <CheckCircle className="h-4 w-4 text-brass" />
          Redirecting to WhatsApp to send your message…
        </div>
      )}

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-[110] flex items-center gap-2 bg-[#1f8a4c] pl-4 pr-5 py-3.5 text-white shadow-2xl transition-transform duration-300 hover:-translate-y-0.5"
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M16.004 3C8.832 3 3 8.832 3 16.003c0 2.293.6 4.531 1.744 6.502L3 29l6.63-1.707A12.96 12.96 0 0 0 16.004 29C23.176 29 29 23.168 29 16.003S23.176 3 16.004 3zm0 23.66a10.63 10.63 0 0 1-5.427-1.486l-.389-.23-3.6.927.96-3.5-.25-.4a10.62 10.62 0 0 1-1.63-5.655C5.667 9.584 10.311 4.94 16.004 4.94c5.692 0 10.33 4.644 10.33 10.35 0 5.706-4.638 10.353-10.33 10.353zm5.67-7.75c-.31-.155-1.835-.905-2.12-1.008-.284-.103-.49-.155-.697.155s-.802.99-.983 1.193c-.18.19-.36.212-.67.067-.31-.146-1.31-.483-2.495-1.54-.922-.823-1.545-1.838-1.726-2.148-.18-.31-.02-.477.136-.631.14-.14.31-.365.466-.547.155-.19.207-.31.31-.517.104-.207.052-.388-.026-.543-.078-.155-.697-1.68-.956-2.3-.252-.603-.507-.522-.697-.532l-.597-.011c-.18 0-.466.067-.71.335-.244.267-.932.91-.932 2.22 0 1.31.953 2.575 1.086 2.753.134.18 1.875 2.862 4.52 4.014.632.274 1.125.439 1.51.562.635.203 1.212.174 1.67.106.51-.076 1.57-.64 1.79-1.26.22-.62.22-1.153.156-1.264-.065-.103-.24-.164-.5-.31z" />
        </svg>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">WhatsApp</span>
      </a>

      <PageHeader
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s talk about
            <br />
            <span className="text-amber-400">your</span> plot.
          </>
        }
        description="Tell us what you are looking for — a residential plot, farm land or a construction project. We usually respond within 24 hours."
        image="/img7.png"
        imageAlt="AAA Promoterz layout"
        imageCaption="Site visit · Arakkonam"
        bgImage="/img2.png"
      />

      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-24 xl:px-16">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Form */}
            <Reveal className="lg:col-span-7">
              <div className="flex items-baseline justify-between border-b border-ink/15 pb-4">
                <h2 className="font-display text-3xl text-ink">Start an enquiry</h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/65">
                  01 / Form
                </span>
              </div>

              {submitted ? (
                <div className="mt-12 border border-ink/10 p-8">
                  <p className="font-display text-2xl text-ink">Thank you.</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    Your message has been prepared in WhatsApp. If the window did not open, call us
                    directly on{" "}
                    <a href="tel:+919176783332" className="text-brass-dark underline underline-offset-4">
                      +91 91767 83332
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/60 hover:text-ink"
                  >
                    Send another message
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-9 space-y-8">
                  <div className="grid gap-8 sm:grid-cols-2">
                    {[
                      { field: "firstName", label: "First name" },
                      { field: "lastName", label: "Last name" },
                    ].map(({ field, label }) => (
                      <div key={field} className="relative">
                        <input
                          id={field}
                          type="text"
                          required
                          value={formData[field as keyof typeof formData]}
                          onChange={(e) =>
                            setFormData({ ...formData, [field]: e.target.value })
                          }
                          placeholder={label}
                          className={inputClass}
                        />
                        <label htmlFor={field} className={labelClass}>
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {[
                    { field: "email", label: "Email address", type: "email" },
                    { field: "phone", label: "Phone number", type: "tel" },
                  ].map(({ field, label, type }) => (
                    <div key={field} className="relative">
                      <input
                        id={field}
                        type={type}
                        required
                        value={formData[field as keyof typeof formData]}
                        onChange={(e) =>
                          setFormData({ ...formData, [field]: e.target.value })
                        }
                        placeholder={label}
                        className={inputClass}
                      />
                      <label htmlFor={field} className={labelClass}>
                        {label}
                      </label>
                    </div>
                  ))}

                  <div className="relative">
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="peer w-full appearance-none border-b border-ink/20 bg-transparent pb-2 pt-6 text-base text-ink transition-colors focus:border-brass-dark focus:outline-none"
                    >
                      <option value="" disabled></option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="service"
                      className="pointer-events-none absolute left-0 top-0 text-[10px] uppercase tracking-[0.18em] text-ink/65 transition-colors peer-focus:text-brass-dark"
                    >
                      Service interested in
                    </label>
                  </div>

                  <div className="relative">
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Message"
                      className={`${inputClass} resize-none`}
                    />
                    <label htmlFor="message" className={labelClass}>
                      Message
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 bg-ink px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-bone transition-colors duration-300 hover:bg-brass hover:text-black"
                  >
                    <Send className="h-4 w-4" />
                    Send message
                  </button>
                  <p className="text-[11px] leading-relaxed text-ink/65">
                    Your message opens in WhatsApp so you can review it before sending.
                  </p>
                </form>
              )}
            </Reveal>

            {/* Contact index */}
            <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
              <div className="flex items-baseline justify-between border-b border-ink/15 pb-4">
                <h2 className="font-display text-3xl text-ink">Reach us</h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/65">
                  02 / Direct
                </span>
              </div>

              <div className="mt-8">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="border-b border-ink/10 py-5 first:pt-0">
                      <div className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-brass-dark" />
                        <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/65">
                          {item.title}
                        </h3>
                      </div>
                      <div className="mt-2 pl-5">
                        {item.details.map((detail, i) =>
                          detail.href ? (
                            <a
                              key={i}
                              href={detail.href}
                              className="block break-all text-sm text-ink/70 underline-offset-4 transition-colors hover:text-brass-dark hover:underline"
                            >
                              {detail.text}
                            </a>
                          ) : (
                            <p key={i} className="text-sm text-ink/70">
                              {detail.text}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3">
                {officePhotos.map((photo, idx) => {
                  const anims = ["hover-img-tilt", "hover-img-zoom", "hover-img-glow", "hover-img-vibrant"];
                  const anim = anims[idx % anims.length];
                  return (
                    <div key={photo.label} className={`relative aspect-[4/3] overflow-hidden rounded-xl shadow-md ${anim} shimmer-card`}>
                      <ImageWithFallback
                        src={photo.src}
                        alt={photo.label}
                        className="editorial-img absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-2.5">
                        <p className="text-[9px] uppercase tracking-[0.16em] text-bone/90 font-semibold">
                          {photo.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
