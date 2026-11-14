"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type SlideItem = {
  image: string;
  eyebrow: string;
  title: string;
  badge?: string;
  primaryHref?: string;
  primaryLabel?: string;
  videoHref?: string;
  videoLabelTop?: string;
  videoLabelBottom?: string;
};

const defaultSlides: SlideItem[] = [
  {
    image: "/img7.png",
    eyebrow: "10+ Years of Trusted Landmarks & Quality Plots",
    title: "We Construct Landmarks & Develop Quality Plots",
    badge: "10+ YEARS EXCELLENCE",
    primaryHref: "/portfolio",
    primaryLabel: "Explore Projects",
    videoHref: "/portfolio",
    videoLabelTop: "Completed Sites",
    videoLabelBottom: "View Projects",
  },
  {
    image: "/layoutarak1.jpeg",
    eyebrow: "DTCP & CMDA Approved Residential Gated Layouts",
    title: "Planned Villa Plots Ready for Registration",
    badge: "DTCP & CMDA APPROVED",
    primaryHref: "/services/residential",
    primaryLabel: "View Layout Plans",
    videoHref: "/portfolio",
    videoLabelTop: "Gated Layouts",
    videoLabelBottom: "View Projects",
  },
  {
    image: "/img3.png",
    eyebrow: "Turnkey Construction & Vastu-Compliant Architecture",
    title: "Construction Solutions For Tomorrow's Living",
    badge: "FIXED WRITTEN CONTRACTS",
    primaryHref: "/estimator",
    primaryLabel: "Calculate Estimate",
    videoHref: "/portfolio",
    videoLabelTop: "Construction",
    videoLabelBottom: "View Projects",
  },
  {
    image: "/formland.jpeg",
    eyebrow: "Fertile Agricultural Farmlands Across Tamil Nadu",
    title: "Scenic Organic Plots With Dependable Water",
    badge: "100% CLEAR TITLES",
    primaryHref: "/contact",
    primaryLabel: "Book Site Visit",
    videoHref: "/portfolio",
    videoLabelTop: "Farmland Agro",
    videoLabelBottom: "View Projects",
  },
  {
    image: "/img2.png",
    eyebrow: "Prime Strategic Locations In Arakkonam & Maduranthangam",
    title: "Approved Plots Ready For Instant Registration",
    badge: "BANK LOANS UP TO 80%",
    primaryHref: "/portfolio",
    primaryLabel: "Discover Sites",
    videoHref: "/portfolio",
    videoLabelTop: "Prime Layouts",
    videoLabelBottom: "View Projects",
  },
];

export default function HeroSlider({
  slides = defaultSlides,
  eyebrow,
  title,
  primaryHref,
}: {
  slides?: SlideItem[];
  eyebrow?: string;
  title?: string;
  primaryHref?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(id);
  }, [slides.length]);

  const current = slides[active] || slides[0];

  return (
    <section className="hero">
      {/* Background Slides with Lumbert Ken Burns & Cross-fade */}
      {slides.map((slide, i) => (
        <div
          key={slide.image + i}
          className={`hero__slide ${i === active ? "is-active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
          aria-hidden={i !== active}
        />
      ))}

      {/* Playwood Dark Vignette Overlay */}
      <div className="hero__overlay" />

      {/* Slide Content with key-triggered smooth re-animation */}
      <div key={active} className="container mx-auto max-w-[1320px] px-6 sm:px-10 hero__inner">
        <p className="hero__sub">
          {eyebrow ?? current.eyebrow}
        </p>

        <h1 className="hero__title">
          {title ?? current.title}
        </h1>

        <div className="hero__actions">
          <Link
            href={primaryHref ?? current.primaryHref ?? "/portfolio"}
            className="hero__btn"
          >
            {current.primaryLabel ?? "Explore Projects"}
          </Link>

          <Link
            href={current.videoHref ?? "/portfolio"}
            className="video-link"
            aria-label="View Projects"
          >
            <span className="video-link__play" />
            <span>
              {current.videoLabelTop ?? "Completed Sites"}
              <br />
              {current.videoLabelBottom ?? "View Projects"}
            </span>
          </Link>
        </div>
      </div>

      {/* Right-side Vertical Bullet Pagination */}
      <div className="hero__bullets">
        {slides.map((slide, i) => (
          <button
            key={slide.image + i}
            type="button"
            className={i === active ? "is-active" : ""}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
