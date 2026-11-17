"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/team" },
  { name: "Projects", href: "/portfolio" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Journal", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Residential Layouts", href: "/services/residential" },
  { name: "Commercial Builds", href: "/services/commercial" },
  { name: "Industrial Projects", href: "/services/industrial" },
  { name: "Infrastructure", href: "/services/infrastructure" },
  { name: "Renovation", href: "/services/renovation" },
  { name: "Cost Estimator", href: "/estimator" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi, please subscribe me to the AAA Promoterz newsletter. Email: ${email}`;
    window.open(
      `https://wa.me/919176783332?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div className="container mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <div className="py-16 lg:py-24">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            {/* Brand + newsletter */}
            <div className="lg:col-span-5">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo.webp"
                  alt="AAA Promoterz & Builders"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain brightness-0 invert"
                />
                <span className="flex flex-col leading-none">
                  <span className="font-display text-xl tracking-tight text-gray-400 dark:text-gray-700">AAA Promoterz</span>
                  <span className="mt-[5px] text-[8px] font-medium uppercase tracking-[0.3em] text-gray-400 dark:text-gray-700">
                    Builders · Tamil Nadu
                  </span>
                </span>
              </Link>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-gray-400/65 dark:text-gray-700/65">
                Stay updated with the latest in land, layouts and construction trends. Sign up for our
                newsletter — no spam, just site updates.
              </p>

              <form onSubmit={handleSubscribe} className="mt-7 flex max-w-md">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  autoComplete="email"
                  aria-label="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[48px] flex-1 border border-bone/15 bg-transparent px-4 text-sm text-gray-400 dark:text-gray-700 placeholder:text-gray-400/40 dark:placeholder:text-gray-600/40 focus:border-brass focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex h-[48px] items-center justify-center gap-2 bg-brass px-6 text-[13px] font-semibold text-black transition-colors hover:bg-brass-light"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="font-display text-[20px] font-semibold tracking-tight text-gray-400 dark:text-gray-700">Quick Links</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="block py-1 text-sm text-gray-400 dark:text-gray-700 transition-colors hover:text-brass"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="lg:col-span-2">
              <h3 className="font-display text-[20px] font-semibold tracking-tight text-gray-400 dark:text-gray-700">Services</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="block py-1 text-sm text-gray-400 dark:text-gray-700 transition-colors hover:text-brass"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h3 className="font-display text-[20px] font-semibold tracking-tight text-gray-400 dark:text-gray-700">Contact</h3>
              <ul className="mt-6 flex flex-col gap-4">
                <li className="text-sm text-gray-400 dark:text-gray-700">
                  <span className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-700">Address</span>
                  Chennai, Tamil Nadu, India
                  <span className="mt-1 block text-xs text-gray-500 dark:text-gray-700">
                    Arakkonam · Thiruthani · Maduranthangam
                  </span>
                </li>
                <li>
                  <a
                    href="tel:+919176783332"
                    className="flex items-center gap-3 py-1 text-sm text-gray-400 dark:text-gray-700 transition-colors hover:text-brass"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-brass" />
                    +91 91767 83332
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:aaapromoterzandbuilders@gmail.com"
                    className="flex items-center gap-3 break-all py-1 text-sm text-gray-400 dark:text-gray-700 transition-colors hover:text-brass"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-brass" />
                    aaapromoterzandbuilders@gmail.com
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="mt-2 inline-flex items-center gap-2 bg-brass px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:bg-brass-light"
                  >
                    Book a site visit
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Wordmark */}
        <div className="overflow-hidden border-t border-bone/10 pt-6">
          <div
            aria-hidden="true"
            className="select-none whitespace-nowrap font-display text-[clamp(2.8rem,10.5vw,9.5rem)] font-bold leading-[0.9] tracking-[-0.02em] text-gray-400/[0.06] dark:text-gray-700/[0.06] before:content-['AAA_Promoterz']"
          />
        </div>

        <div className="border-t border-bone/10">
          <div className="flex flex-col items-start justify-between gap-3 py-6 text-[11px] uppercase tracking-[0.18em] text-gray-500 dark:text-gray-700 sm:flex-row sm:items-center">
            <p suppressHydrationWarning>
              &copy; {new Date().getFullYear()}{" "}
              <a href="https://aaapromoterzandbuilders.com" className="hover:text-brass transition-colors font-medium">
                AAA Promoterz &amp; Builders (aaapromoterzandbuilders.com)
              </a>
              . All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-brass/60" />
              Clear titles · Honest deals
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}