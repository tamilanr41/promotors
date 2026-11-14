import ImageWithFallback from "@/components/ui/image-with-fallback";

type Fact = { value: string; label: string };

export default function PageHeader({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  imageCaption,
  facts,
  children,
  bgImage = "/img7.png",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  facts?: Fact[];
  children?: React.ReactNode;
  bgImage?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Light Background Image with Sunlight Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ImageWithFallback
          src={bgImage}
          alt="Hero background"
          className="h-full w-full object-cover opacity-35 dark:opacity-25 scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/85 to-white/40 dark:from-slate-950/98 dark:via-slate-950/85 dark:to-slate-950/40" />
      </div>

      <div className="container relative z-10 mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
          <div className={image ? "lg:col-span-7" : "lg:col-span-10"}>
            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold tracking-wider uppercase mb-3">
              {eyebrow}
            </div>
            <h1 data-aos="fade-down" className="font-display text-[clamp(2.2rem,4.2vw,3.6rem)] font-black leading-[1.1] tracking-tight text-slate-950 dark:text-white">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-2xl text-[15px] sm:text-[16px] leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                {description}
              </p>
            )}
            {children}
          </div>

          {image && (
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 dark:border-white/20 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-xl hover-img-tilt">
                <ImageWithFallback
                  src={image}
                  alt={imageAlt}
                  className="editorial-img absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              </div>
              {imageCaption && (
                <p className="mt-2 text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold">{imageCaption}</p>
              )}
            </div>
          )}
        </div>

        {facts && facts.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-white/10 pt-6 md:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-white/10 shadow-sm">
                <div className="font-display text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">{fact.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold">{fact.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
