import Link from "next/link";
import { ArrowRight, Phone, Check } from "lucide-react";
import Eyebrow from "./eyebrow";
import Reveal from "./reveal";

export default function CtaBand({
  eyebrow = "Begin here",
  title,
  description,
  image = "/img7.png",
  points = ["Free site visit", "Clear titles", "Registered layouts"],
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  image?: string;
  points?: string[];
}) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,#070f0c_0%,rgba(7,15,12,0.92)_45%,rgba(7,15,12,0.45)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-20 text-bone lg:px-12 lg:py-28 xl:px-16">
        <Reveal>
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h2
            className="mt-6 max-w-3xl font-display font-bold leading-[1.02] tracking-[-0.01em]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}
          >
            {title}
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-bone/65">{description}</p>
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-5">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-brass px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition-colors duration-500 hover:bg-brass-light"
            >
              Request a free consultation
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+919176783332"
              className="group inline-flex items-center gap-3 border border-bone/25 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-bone/85 transition-colors duration-500 hover:border-brass hover:text-bone"
            >
              <Phone className="h-4 w-4 text-brass-light" />
              +91 91767 83332
            </a>
          </div>
          {points.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-bone/15 pt-7">
              {points.map((point) => (
                <span
                  key={point}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-bone/65"
                >
                  <Check className="h-3.5 w-3.5 text-brass" />
                  {point}
                </span>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
