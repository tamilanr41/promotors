import { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import {
  PaintBucket,
  ArrowRight,
  Clock,
  Users,
  Shield,
  Hammer,
  Scissors,
  Ruler,
  ChevronDown,
  Droplets,
  Zap,
  Sparkles,
  Palette,
  RefreshCw,
  RotateCcw,
  Layers,
} from "lucide-react";

const scopeItems = [
  {
    icon: Hammer,
    title: "Full Renovations",
    description: "Complete interior and exterior property transformations",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  },
  {
    icon: Scissors,
    title: "Kitchen & Bath",
    description: "Premium kitchen and bathroom remodels with modern fixtures",
    img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
  },
  {
    icon: Ruler,
    title: "Structural Changes",
    description: "Wall removal, additions, and structural modifications",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
  },
  {
    icon: Droplets,
    title: "Plumbing Updates",
    description: "Complete plumbing system upgrades and fixture installation",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
  },
  {
    icon: Zap,
    title: "Electrical Upgrades",
    description: "Panel upgrades, rewiring, and smart home integration",
    img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80",
  },
  {
    icon: PaintBucket,
    title: "Interior Finishing",
    description: "Painting, flooring, drywall, and custom millwork",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  },
];

const steps = [
  {
    number: "01",
    title: "Assessment",
    description: "Detailed property inspection and structural assessment.",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
  },
  {
    number: "02",
    title: "Design",
    description: "Space planning, material selection, and 3D visualization.",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&q=80",
  },
  {
    number: "03",
    title: "Permitting",
    description: "Building permits and code compliance approvals.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
  },
  {
    number: "04",
    title: "Renovation",
    description: "Construction with minimal disruption to your daily life.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80",
  },
  {
    number: "05",
    title: "Final Reveal",
    description: "Quality inspection, cleanup, and your new space revealed.",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
  },
];

const portfolioProjects = [
  { title: "Victorian Home Restore", location: "Kolkata", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80" },
  { title: "Modern Loft Conversion", location: "Mumbai", image: "https://images.unsplash.com/photo-1600586162220-73cbb7a2f3f8?w=600&q=80" },
  { title: "Heritage Bungalow Reno", location: "Pondicherry", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
  { title: "Kitchen Makeover", location: "Bangalore", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80" },
  { title: "Bathroom Renovation", location: "Chennai", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80" },
  { title: "Office Fit-Out", location: "Hyderabad", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80" },
];

const techPartners = ["Kohler", "Jaquar", "Asian Paints", "Saint-Gobain", "Somany", "Hafele"];

const faqs = [
  {
    q: "Do I need to vacate during renovation?",
    a: "It depends on the scope. We work to minimize disruption and can often complete renovations while you remain on-site. Major structural work may require temporary relocation.",
  },
  {
    q: "How long does a typical renovation take?",
    a: "Kitchen remodels take 4-8 weeks, bathroom remodels 2-4 weeks, and full home renovations 3-6 months depending on scope.",
  },
  {
    q: "Do you handle permit applications?",
    a: "Yes, we manage all permit applications and ensure your renovation meets all local building codes and regulations.",
  },
  {
    q: "What is the cost range for renovations?",
    a: "Costs vary widely based on scope and materials. Use our AI Estimator for a personalized quote, or contact us for a consultation.",
  },
];

const swatches = [
  { name: "Teal", class: "bg-teal-500" },
  { name: "Coral", class: "bg-rose-400" },
  { name: "Gold", class: "bg-yellow-500" },
  { name: "Purple", class: "bg-violet-500" },
  { name: "Sage", class: "bg-emerald-300" },
  { name: "Blush", class: "bg-pink-300" },
];

export default function Renovation() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSwatch, setActiveSwatch] = useState<number | null>(null);

  return (
    <div className="pt-20 font-sans">
      <section className="relative min-h-screen bg-gradient-to-br from-[#fef6f3] to-[#f0fdfa] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#0d9488]/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur rounded-full border border-[#0d9488]/20 text-[#0d9488] text-sm font-bold w-fit shadow-sm">
                <PaintBucket className="w-4 h-4" />
                Renovation
              </div>
              <h1 className="text-5xl sm:text-7xl font-black leading-[1]">
                <span className="text-[#0d9488]">Transform</span>
                <br />
                <span className="text-[#e11d48]">Your</span>
                <br />
                <span className="text-[#0d9488]">Space</span>
              </h1>
              <div className="flex gap-2">
                <div className="w-12 h-12 rounded-full bg-[#0d9488] border-4 border-white shadow-md" />
                <div className="w-12 h-12 rounded-full bg-[#e11d48] border-4 border-white shadow-md -ml-4" />
                <div className="w-12 h-12 rounded-full bg-[#fbbf24] border-4 border-white shadow-md -ml-4" />
              </div>
              <p className="text-lg text-[#64748b] max-w-lg leading-relaxed">
                Breathe new life into your property with COS premium renovation services, powered by AI precision.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0d9488] to-[#e11d48] text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-[#0d9488]/25 transition-all group text-lg"
                >
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/estimator"
                  className="inline-flex items-center gap-2 border-2 border-[#0d9488]/30 text-[#0d9488] px-8 py-4 rounded-full font-bold hover:bg-[#0d9488]/5 transition-all group text-lg"
                >
                  <Sparkles className="w-5 h-5" />
                  Design Preview
                </Link>
              </div>
              <div className="flex gap-6 pt-4 border-t border-[#e2e8f0]">
                {[
                  { value: "2,500+", label: "Projects Transformed" },
                  { value: "4.9", label: "Client Rating" },
                  { value: "98%", label: "On Budget" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-[#0d9488]">{s.value}</div>
                    <div className="text-sm text-[#64748b] font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="flex">
                <div className="w-1/2 overflow-hidden rounded-l-3xl border-2 border-[#0d9488]/30 border-r-0">
                  <div className="relative aspect-[3/4]">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80"
                      alt="Before renovation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                      Before
                    </div>
                  </div>
                </div>
                <div className="w-1/2 overflow-hidden rounded-r-3xl border-2 border-[#e11d48]/30 border-l-0">
                  <div className="relative aspect-[3/4]">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"
                      alt="After renovation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 bg-[#e11d48]/80 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                      After
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-xl px-6 py-3 border-2 border-[#fbbf24]">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-[#fbbf24]" />
                  <span className="font-bold text-[#0f172a] text-sm">Before & After</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0d9488]/10 to-[#e11d48]/10 rounded-full text-[#0d9488] text-sm font-bold mb-4">
              <Layers className="w-4 h-4" />
              Scope of Work
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0f172a]">What We Deliver</h2>
            <p className="text-[#64748b] mt-4 text-lg font-medium">
              Complete renovation services that breathe new life into every space
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            {scopeItems.map((item, idx) => {
              const Icon = item.icon;
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.title}
                  className="group relative w-full max-w-4xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                  style={{
                    transform: `rotate(${isEven ? -1 : 1}deg)`,
                    transformOrigin: isEven ? "left center" : "right center",
                  }}
                  onClick={() => {}}
                >
                  <div className="flex bg-white border-2 border-[#e2e8f0] overflow-hidden shadow-sm hover:shadow-xl transition-all group-hover:border-[#0d9488]/30">
                    <div className="w-2 bg-gradient-to-b from-[#0d9488] to-[#e11d48]" />
                    <div className="w-24 sm:w-32 shrink-0 relative overflow-hidden">
                      <ImageWithFallback
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover absolute inset-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                      <div className="absolute bottom-2 left-2 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#0d9488]" />
                      </div>
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-[#0d9488] bg-[#0d9488]/10 px-2 py-0.5 rounded-full uppercase tracking-widest">
                          Step {idx + 1}
                        </span>
                        <span className="w-px h-3 bg-[#e2e8f0]" />
                        <span className="text-xs text-[#94a3b8] uppercase font-bold tracking-wider">{item.title}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#0f172a] mb-1">{item.title}</h3>
                      <p className="text-sm text-[#64748b] leading-relaxed">{item.description}</p>
                    </div>
                    <div className="hidden sm:flex items-center pr-5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0d9488] to-[#e11d48] text-white flex items-center justify-center font-bold text-sm shadow-md">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-gradient-to-br from-[#0d9488] to-[#0f766e] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 border border-white/30 rounded-full text-white text-sm font-bold mb-4">
              <RotateCcw className="w-4 h-4" />
              Our Process
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white">How We Transform</h2>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute left-12 top-0 bottom-0 w-2 bg-[#fbbf24]/30 rounded-full" />
            <div className="space-y-0">
              {steps.map((step, idx) => (
                <div key={step.number} className="relative flex items-start gap-8 pb-0">
                  <div className="relative z-10 shrink-0 hidden lg:block">
                    <div className="w-24 h-24 rounded-full bg-white border-4 border-[#fbbf24] flex items-center justify-center shadow-xl">
                      <span className="text-2xl font-black text-[#0d9488]">{step.number}</span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-2 h-16 bg-gradient-to-b from-[#fbbf24] to-transparent" />
                    )}
                  </div>
                  <div className="flex-1 bg-white/10 backdrop-blur border border-white/20 p-6 mb-8 rounded-2xl group hover:bg-white/20 transition-colors">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="lg:hidden w-10 h-10 rounded-full bg-[#fbbf24] text-[#0d9488] flex items-center justify-center text-lg font-bold shrink-0">
                        {step.number}
                      </span>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>
                    <div className="flex gap-4">
                      <div className="hidden sm:block w-28 h-20 overflow-hidden rounded-xl border border-white/20 shrink-0">
                        <ImageWithFallback src={step.img} alt={step.title} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[#ccfbf1] leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0d9488]/10 to-[#e11d48]/10 rounded-full text-[#0d9488] text-sm font-bold mb-4">
              <Palette className="w-4 h-4" />
              Portfolio
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0f172a]">Recent Renovation Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjects.map((project, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border-2 border-[#e2e8f0] hover:border-[#0d9488]/40 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:grayscale-0 grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#e11d48] text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold">
                      {i === 0 || i === 2 ? "Heritage" : i === 1 ? "Modern" : i === 3 ? "Kitchen" : i === 4 ? "Bath" : "Office"}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-1 text-[#fbbf24] text-xs font-bold mb-1">
                      <MapPinIcon className="w-3 h-3" />
                      {project.location}
                    </div>
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-br from-[#fef6f3] to-[#f0fdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0d9488]/10 to-[#e11d48]/10 rounded-full text-[#0d9488] text-sm font-bold mb-4">
              <Users className="w-4 h-4" />
              Technology Partners
            </div>
            <h2 className="text-3xl font-black text-[#0f172a]">Trusted Brands We Work With</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {techPartners.map((partner, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-24 px-6 rounded-2xl bg-white border-2 border-[#e2e8f0] hover:border-[#0d9488] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-sm font-bold text-[#475569] text-center tracking-wide">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#0d9488]/10 to-[#e11d48]/10 rounded-full text-[#0d9488] text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                AI-Powered
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-[#0f172a] leading-tight">
                AI-Powered Renovation
              </h2>
              <p className="text-lg text-[#64748b] leading-relaxed">
                Our COS platform provides real-time renovation tracking, material optimization, and cost control to ensure your project stays on track.
              </p>
              <div className="flex gap-3 flex-wrap">
                {swatches.map((swatch, i) => (
                  <button
                    key={swatch.name}
                    onClick={() => setActiveSwatch(activeSwatch === i ? null : i)}
                    className={`w-12 h-12 rounded-full ${swatch.class} border-4 transition-all duration-300 ${
                      activeSwatch === i ? "border-[#0d9488] scale-110 shadow-lg" : "border-white shadow hover:scale-105"
                    }`}
                    title={swatch.name}
                  />
                ))}
                <div className="flex items-center ml-2">
                  <span className="text-xs text-[#94a3b8] font-bold uppercase tracking-wider">
                    {activeSwatch !== null ? swatches[activeSwatch].name : "Pick a finish"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Clock, label: "Timeline", value: "2 wk - 6 mo" },
                  { icon: Users, label: "Team", value: "5-15 prof." },
                  { icon: Shield, label: "Warranty", value: "5-year" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="bg-gradient-to-br from-[#fef6f3] to-[#f0fdfa] rounded-2xl p-4 border border-[#e2e8f0] hover:border-[#0d9488]/30 transition-colors text-center">
                      <Icon className="w-6 h-6 text-[#0d9488] mx-auto mb-2" />
                      <div className="text-xs text-[#64748b] font-bold uppercase tracking-wider">{item.label}</div>
                      <div className="font-black text-[#0f172a] text-sm">{item.value}</div>
                    </div>
                  );
                })}
              </div>
              <Link
                to="/estimator"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0d9488] to-[#e11d48] text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-[#0d9488]/25 transition-all group text-lg"
              >
                Get Your Estimate <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#e2e8f0]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1600586162220-73cbb7a2f3f8?w=800&q=80"
                  alt="Renovation project"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border-2 border-[#fbbf24]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0d9488] to-[#e11d48] flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-[#64748b] font-bold uppercase tracking-wider">Avg. Timeline</div>
                    <div className="font-black text-[#0f172a]">35% Faster</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-gradient-to-br from-[#0d9488] to-[#0f766e] overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 border border-white/30 rounded-full text-white text-sm font-bold mb-4">
              <Shield className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-[#fbbf24] text-[#0d9488] flex items-center justify-center text-sm font-black shrink-0">
                      {index + 1}
                    </span>
                    <span className="font-bold text-white text-base">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#fbbf24] shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-[#ccfbf1] border-t border-white/20 pt-4 ml-14 leading-relaxed text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 overflow-hidden bg-gradient-to-r from-[#0d9488] via-[#fbbf24] to-[#e11d48]">
        <div className="relative max-w-3xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-medium">
            Get a free consultation and AI-powered estimate today. Let&apos;s reimagine your space.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#0d9488] px-10 py-5 rounded-full font-bold hover:shadow-2xl hover:shadow-black/20 transition-all group text-lg"
            >
              Get a Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/estimator"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-all group text-lg"
            >
              <Sparkles className="w-5 h-5" />
              Design Preview
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
