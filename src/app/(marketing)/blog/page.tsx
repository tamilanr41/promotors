"use client";

import { useState } from "react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import PageHeader from "@/components/marketing/page-header";
import Reveal from "@/components/marketing/reveal";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

const posts = [
  {
    title: "Before you buy a plot in Tamil Nadu, check these seven documents",
    excerpt:
      "A clear title is more than one paper. Here is the short list we verify on every plot before it is offered for sale.",
    image: "/scetch1.jpeg",
    category: "Documentation",
    date: "12 March 2026",
    readTime: "5 min read",
    body: [
      "Start with the parent document — the sale deed that shows how the original owner acquired the land. Every subsequent transfer must connect back to it without gaps.",
      "Then check the patta and chitta to confirm revenue records match the seller's name, the encumbrance certificate for the last 30 years, and the approved layout plan if the land has been subdivided.",
      "Finally, confirm there is no pending litigation, that the survey numbers match the physical boundaries, and that the property tax receipts are up to date. We verify all seven before a plot is listed.",
    ],
  },
  {
    title: "Patta, chitta and the EC — what each one actually proves",
    excerpt:
      "Three documents buyers hear about constantly, and the one question each of them answers at the registrar's office.",
    image: "/notice.jpeg",
    category: "Documentation",
    date: "26 February 2026",
    readTime: "4 min read",
    body: [
      "The patta is the revenue department's record of who holds the land. The chitta describes the land itself — its survey number, extent and classification. Together they tell you what the government thinks the property is and who owns it.",
      "The encumbrance certificate (EC) is the history of registered transactions on that survey number. It is the document that reveals a mortgage, a prior sale or a lien that the seller may not mention.",
      "Read them together, never alone. A patta without a matching EC is a question, not an answer.",
    ],
  },
  {
    title: "Why farmland near Maduranthangam is quietly becoming a smart buy",
    excerpt:
      "Good water, growing connectivity and honest pricing — the case for agricultural land on the Chengalpattu belt.",
    image: "/formland.jpeg",
    category: "Farm Land",
    date: "9 February 2026",
    readTime: "6 min read",
    body: [
      "Farm land is bought for two reasons: cultivation and long-term appreciation. Around Maduranthangam, both are supported by the same thing — water. Wells in the belt are dependable, and the soil holds moisture well through the season.",
      "The second reason is access. The Chengalpattu–Maduranthangam road corridor has improved steadily, which shortens the drive from Chennai and brings the land closer to a weekend-farm lifestyle.",
      "As always, verify the classification and the access road before you fall in love with the view. Good farmland is patient land.",
    ],
  },
  {
    title: "What a well-planned layout looks like on the ground",
    excerpt:
      "Road width, drainage slope, street lighting and plot orientation — four things you can judge in a single site visit.",
    image: "/img7.png",
    category: "Buying Land",
    date: "21 January 2026",
    readTime: "5 min read",
    body: [
      "Walk the internal roads before you look at a single plot. A 30-foot road feels generous; a 20-foot road feels tight the moment two cars meet. Ask for the approved width, then measure it.",
      "Look at the slope. Water should move away from the plots toward a defined drain, not pool at the corner. After rain is the best time to visit.",
      "Finally, check orientation, street lighting and whether the compound wall and entrance arch are actually built or merely promised.",
    ],
  },
  {
    title: "The real cost of a plot — beyond the square-foot price",
    excerpt:
      "Registration, development charges, documentation and the small costs nobody quotes upfront.",
    image: "/img1.png",
    category: "Investment",
    date: "5 January 2026",
    readTime: "4 min read",
    body: [
      "The advertised per-square-foot rate is rarely the amount you pay. Stamp duty and registration charges in Tamil Nadu sit on top, along with document preparation and the sub-registrar's fees.",
      "Development charges — roads, drainage, electricity — may be bundled into the price or billed separately. Ask for a written, itemised total before you pay a token advance.",
      "A fair seller will give you the final number in writing. If the total keeps moving, treat that as information about the seller.",
    ],
  },
  {
    title: "Building on your plot: a practical checklist before you start",
    excerpt:
      "Approvals, soil testing, boundary marking and a written contract — the quiet work that protects your budget.",
    image: "/img3.png",
    category: "Construction",
    date: "18 December 2025",
    readTime: "7 min read",
    body: [
      "Before a single brick is laid, confirm the plot is converted for residential use if required, and obtain the planning permission for your plan from the local authority.",
      "Get a soil test. It is inexpensive and it decides your foundation, which is the single largest line item in most budgets.",
      "Then fix the contract in writing: scope, material specification, payment schedule, timeline and what happens if the timeline slips. A good contractor will welcome the clarity.",
    ],
  },
];

const categories = ["All", "Documentation", "Farm Land", "Buying Land", "Investment", "Construction"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const featuredPost = posts[0];
  const remaining =
    activeCategory === "All"
      ? posts.slice(1)
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow="Journal"
        title={
          <>
            Notes from
            <br />
            the <span className="text-brass-light">land</span>.
          </>
        }
        description="Practical guidance on buying plots, reading documents and investing in Tamil Nadu land — written from what we see on site every week."
        image="/scetch1.jpeg"
        imageAlt="JP Avenue plot sketch"
        imageCaption="JP Avenue · Plot sketch"
      />

      {/* Featured */}
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-20 xl:px-16">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-800">
                  <ImageWithFallback
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="editorial-img absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center lg:col-span-5">
                <div className="flex items-center gap-4">
                  <span className="text-[9px] uppercase tracking-[0.24em] text-brass-dark">
                    Cover note
                  </span>
                  <span className="h-px flex-1 bg-ink/10" />
                  <span className="text-[10px] uppercase tracking-[0.18em] text-ink/65">
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-bold leading-[1.12] text-ink">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink/65">{featuredPost.excerpt}</p>
                <div className="mt-7 flex items-center gap-4 border-t border-ink/15 pt-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-ink/65">
                    {featuredPost.date}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brass-dark">
                    {featuredPost.category}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-ink/10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-8 gap-y-3 px-6 py-6 lg:px-12 xl:px-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`relative pb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                activeCategory === cat ? "text-ink" : "text-ink/65 hover:text-ink/60"
              }`}
            >
              {cat}
              <span
                className={`absolute bottom-0 left-0 h-px bg-brass-dark transition-all duration-300 ${
                  activeCategory === cat ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>
      </section>

      {/* Article index */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12 lg:py-20 xl:px-16">
          <div className="border-t border-ink/15">
            {remaining.map((post, i) => {
              const isOpen = openIndex === i;
              return (
                <Reveal key={post.title} delay={Math.min(i * 50, 150)}>
                  <article className="border-b border-ink/10">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="group grid w-full grid-cols-[2.5rem_1fr] items-start gap-4 py-7 text-left md:grid-cols-[3rem_1fr_10rem_auto] md:items-center md:gap-8 md:py-8"
                    >
                      <span className="pt-1 font-mono text-[10px] tracking-[0.2em] text-brass-dark md:pt-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                          <span className="text-[9px] uppercase tracking-[0.22em] text-brass-dark">
                            {post.category}
                          </span>
                          <span className="text-[9px] uppercase tracking-[0.18em] text-ink/65">
                            {post.date}
                          </span>
                        </div>
                        <h3 className="mt-2 font-display text-xl leading-snug text-ink transition-colors group-hover:text-brass-dark sm:text-2xl">
                          {post.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/65">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="relative hidden aspect-[4/3] w-40 overflow-hidden bg-ink-800 md:block">
                        <ImageWithFallback
                          src={post.image}
                          alt={post.title}
                          className="editorial-img absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      <span className="hidden h-9 w-9 items-center justify-center border border-ink/20 text-ink/65 transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bone md:flex">
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>

                    <div
                      className={`grid overflow-hidden transition-all duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0">
                        <div className="pb-8 pl-0 md:pl-[4.75rem] md:pr-24">
                          <div className="max-w-2xl space-y-4 border-l border-brass pl-5">
                            {post.body.map((paragraph, idx) => (
                              <p key={idx} className="text-sm leading-relaxed text-ink/60">
                                {paragraph}
                              </p>
                            ))}
                            <p className="pt-1 text-[10px] uppercase tracking-[0.2em] text-ink/65">
                              {post.readTime} · AAA Promoterz Editorial
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {remaining.length === 0 && (
            <div className="py-24 text-center">
              <p className="font-display text-2xl text-ink/65">
                No notes in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Buyer checklist band */}
      <section className="border-t border-ink/10 bg-bone">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-16 lg:grid-cols-12 lg:items-center lg:px-12 xl:px-16">
          <div className="lg:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.24em] text-brass-dark">
              For serious buyers
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-bold leading-[1.1] text-ink">
              Our document checklist, <span className="text-brass-dark">free</span>.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/65">
              The same seven-point verification we run on every plot — written down so you can use it
              anywhere in Tamil Nadu.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <a
              href="https://wa.me/919176783332?text=Hi%2C%20please%20send%20me%20the%20AAA%20Promoterz%20land%20document%20checklist."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-between gap-4 bg-ink px-7 py-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-bone transition-colors hover:bg-brass hover:text-black"
            >
              Request the checklist
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="mt-3 text-[11px] leading-relaxed text-ink/65">
              Sent on WhatsApp. No calls unless you ask for one.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
