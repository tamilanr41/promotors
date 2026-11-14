import { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import {
  Factory,
  ArrowRight,
  Users,
  Shield,
  Cpu,
  Warehouse,
  Fuel,
  ChevronDown,
  Cog,
  Wrench,
  Gauge,
  Hexagon,
  Radio,
  Activity,
} from "lucide-react";

const scopeItems = [
  {
    icon: Warehouse,
    title: "Warehouses & Distribution",
    description: "Large-scale warehouse and logistics facilities",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  },
  {
    icon: Factory,
    title: "Manufacturing Plants",
    description: "Custom manufacturing facilities with optimized layouts",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80",
  },
  {
    icon: Cpu,
    title: "Industrial Automation",
    description: "Smart factory integration with IoT and automation systems",
    img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80",
  },
  {
    icon: Fuel,
    title: "Energy Facilities",
    description: "Power plants, renewable energy, and utility facilities",
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
  },
  {
    icon: Cog,
    title: "Processing Facilities",
    description: "Food processing, chemical, and material processing plants",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
  },
  {
    icon: Wrench,
    title: "Maintenance Facilities",
    description: "Equipment maintenance and service centers",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80",
  },
];

const steps = [
  {
    number: "01",
    title: "Site Selection",
    description: "Geotechnical analysis and site suitability assessment.",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
  },
  {
    number: "02",
    title: "Process Design",
    description: "Industrial process flow optimization and equipment specification.",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&q=80",
  },
  {
    number: "03",
    title: "Engineering",
    description: "Structural, mechanical, and electrical engineering design.",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80",
  },
  {
    number: "04",
    title: "Construction",
    description: "Heavy civil and structural construction with precision scheduling.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80",
  },
  {
    number: "05",
    title: "Commissioning",
    description: "Systems integration testing and operational handover.",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
  },
];

const portfolioProjects = [
  { title: "Steel Plant Expansion", location: "Jamshedpur", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80" },
  { title: "Auto Manufacturing Hub", location: "Chennai", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80" },
  { title: "Chemical Processing Plant", location: "Gujarat", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
  { title: "Solar Farm", location: "Rajasthan", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
  { title: "Warehouse District", location: "Nagpur", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
  { title: "Food Processing Unit", location: "Punjab", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80" },
];

const techPartners = ["Siemens", "ABB", "Rockwell", "Fanuc", "Caterpillar", "Komatsu"];

const faqs = [
  {
    q: "What safety standards do you follow?",
    a: "We adhere to OSHA, NFPA, and all applicable industry-specific safety standards. Our COS platform includes real-time safety monitoring and reporting.",
  },
  {
    q: "Can you handle hazardous material environments?",
    a: "Yes, we are certified for hazmat containment and specialized industrial environments requiring strict safety protocols.",
  },
  {
    q: "What is the typical timeline for industrial projects?",
    a: "Industrial projects typically take 12-36 months depending on complexity, regulatory requirements, and facility specifications.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes, we provide comprehensive maintenance contracts and facility management services for all industrial projects we complete.",
  },
];

function CautionStripes({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="caution" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
            <rect width="10" height="20" fill="#ea580c" opacity="0.15" />
            <rect x="10" width="10" height="20" fill="#fbbf24" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#caution)" />
      </svg>
    </div>
  );
}

function GaugeMeter({ value, label, max = 100 }: { value: number; label: string; max?: number }) {
  const pct = Math.min(value / max, 1);
  return (
    <div className="bg-[#1e1e1e] border border-[#444] p-4">
      <div className="relative w-full h-4 bg-[#333] mb-2 overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#f97316] to-[#ea580c] transition-all duration-1000" style={{ width: `${pct * 100}%` }} />
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-[#f97316] font-mono">{Math.round(pct * 100)}%</span>
        <span className="text-[#888] font-mono text-[10px] uppercase tracking-wider">{label}</span>
      </div>
    </div>
  );
}

export default function Industrial() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-20 font-mono">
      <section className="relative min-h-screen bg-[#1a1a1a] overflow-hidden">
        <CautionStripes className="absolute inset-0 opacity-30" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 0L0 100' stroke='%23f97316' stroke-width='0.3' fill='none'/%3E%3Cpath d='M0 0L100 100' stroke='%23f97316' stroke-width='0.3' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-[#333] border border-[#555] text-[#f97316] text-sm font-mono w-fit uppercase tracking-widest">
                <Factory className="w-4 h-4" />
                Industrial Construction
              </div>
              <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-[1]">
                <span className="text-[#d4d4d4]">Industrial-Grade</span>
                <br />
                <span className="text-[#f97316]">Construction</span>
              </h1>
              <p className="text-lg text-[#888] max-w-lg leading-relaxed font-sans">
                Heavy industrial construction backed by AI precision and decades of expertise.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#ea580c] text-white px-8 py-4 font-bold hover:bg-[#dc2626] transition-all group text-lg uppercase tracking-wider border-b-4 border-[#9a3412]"
                >
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/estimator"
                  className="inline-flex items-center gap-2 border-2 border-[#555] text-[#bbb] px-8 py-4 font-bold hover:bg-[#333] transition-all group text-lg uppercase tracking-wider"
                >
                  <Gauge className="w-5 h-5" />
                  AI Estimator
                </Link>
              </div>
              <div className="flex gap-8 pt-4 border-t border-[#333]">
                {[
                  { value: "200+", label: "Industrial Plants" },
                  { value: "15M", label: "Sq. Ft. Built" },
                  { value: "Zero", label: "Lost-Time Incidents" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-[#f97316]">{s.value}</div>
                    <div className="text-sm text-[#666] uppercase tracking-wider text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden border-2 border-[#444] shadow-2xl aspect-[4/3]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
                  alt="Industrial facility"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-[#333] border border-[#555] px-3 py-1.5 text-xs text-[#f97316] flex items-center gap-1.5 uppercase tracking-wider">
                  <Radio className="w-3 h-3 text-green-400 animate-pulse" />
                  Live AI Monitoring
                </div>
                <div className="absolute bottom-3 right-3 bg-[#222] border border-[#444] p-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#f97316]" />
                    <div>
                      <div className="text-[10px] text-[#666] uppercase tracking-wider">Efficiency</div>
                      <div className="text-base font-bold text-white">94.7%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#f5f5f0] overflow-hidden">
        <CautionStripes className="absolute left-0 top-0 bottom-0 w-8 opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#e0e0d8] text-[#444] text-sm font-mono mb-4 uppercase tracking-widest">
              <Hexagon className="w-4 h-4" />
              Scope of Work
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#222] uppercase tracking-tight">What We Deliver</h2>
            <p className="text-[#666] mt-4 text-lg font-sans">
              Heavy industrial capabilities engineered for the most demanding environments
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {scopeItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative bg-[#e8e8e0] overflow-hidden hover:-translate-y-1 transition-all duration-300 border-2 border-[#ccc]"
                  style={{ boxShadow: "inset 0 2px 0 rgba(0,0,0,0.05)" }}
                >
                  <div className="relative h-40 overflow-hidden">
                    <ImageWithFallback
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-[#222] border border-[#555] p-2">
                      <Icon className="w-5 h-5 text-[#f97316]" />
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] font-mono text-[#f97316] bg-[#222] px-2 py-0.5 border border-[#444]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="w-2 h-2 bg-[#f97316] mb-2" />
                    <h3 className="text-lg font-bold text-[#222] mb-1 uppercase tracking-wide">{item.title}</h3>
                    <p className="text-sm text-[#666] leading-relaxed font-sans">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#1a1a1a] overflow-hidden">
        <CautionStripes className="absolute right-0 top-0 bottom-0 w-12 opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#333] border border-[#555] text-[#f97316] text-sm font-mono mb-4 uppercase tracking-widest">
              <Cog className="w-4 h-4" />
              Our Process
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#d4d4d4] uppercase tracking-tight">How We Build</h2>
          </div>
          <div className="relative overflow-x-auto">
            <div className="flex gap-2 min-w-[800px]">
              {steps.map((step, idx) => (
                <div key={step.number} className="flex-1 relative">
                  <div className="text-center">
                    <div className="relative w-14 h-14 mx-auto mb-4 bg-[#333] border-2 border-[#555] flex items-center justify-center group-hover:border-[#f97316] transition-colors">
                      <span className="text-lg font-bold text-[#f97316] font-mono">{step.number}</span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-7 left-[55%] w-[90%] h-0.5 bg-[#444] z-0">
                        <div className="absolute right-0 -top-1 w-2 h-2 bg-[#f97316]" />
                      </div>
                    )}
                    <div className="bg-[#222] border border-[#444] p-4 group-hover:border-[#f97316]/50 transition-colors min-h-[280px]">
                      <div className="relative h-20 overflow-hidden mb-3 border border-[#333]">
                        <ImageWithFallback src={step.img} alt={step.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                      </div>
                      <h3 className="font-bold text-[#d4d4d4] mb-1 uppercase tracking-wide text-sm">{step.title}</h3>
                      <p className="text-xs text-[#666] leading-relaxed font-sans">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#f5f5f0] overflow-hidden">
        <CautionStripes className="absolute left-0 right-0 bottom-0 h-8 opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#e0e0d8] text-[#444] text-sm font-mono mb-4 uppercase tracking-widest">
              <Hexagon className="w-4 h-4" />
              Portfolio
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#222] uppercase tracking-tight">Recent Industrial Projects</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {portfolioProjects.map((project, i) => (
              <div key={i} className="group relative overflow-hidden border-2 border-[#ccc] bg-[#e8e8e0]">
                <div className="relative aspect-square overflow-hidden rounded-full mx-auto w-48 h-48 border-4 border-[#aaa] mt-4">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 via-transparent to-transparent" />
                </div>
                <div className="p-5 text-center">
                  <div className="text-xs text-[#f97316] font-mono mb-1">#{String(i + 1).padStart(2, "0")}</div>
                  <div className="text-sm text-[#666] mb-1">{project.location}</div>
                  <h3 className="text-base font-bold text-[#222] uppercase tracking-wide">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-[#e8e8e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#d8d8cc] text-[#444] text-sm font-mono mb-4 uppercase tracking-widest">
              <Users className="w-4 h-4" />
              Technology Partners
            </div>
            <h2 className="text-3xl font-bold text-[#222] uppercase tracking-wide font-mono">Trusted Brands</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {techPartners.map((partner, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-20 px-4 bg-[#f5f5f0] border-2 border-[#ccc] hover:border-[#f97316] hover:shadow-lg transition-all duration-300"
              >
                <span className="text-xs font-bold text-[#444] text-center tracking-widest uppercase font-mono">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#f5f5f0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#e0e0d8] text-[#444] text-sm font-mono mb-4 uppercase tracking-widest">
                <Cpu className="w-4 h-4" />
                AI-Powered
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-[#222] uppercase tracking-tight">
                AI-Powered Industrial Projects
              </h2>
              <p className="text-lg text-[#666] leading-relaxed font-sans">
                Our COS platform optimizes heavy industrial construction with real-time supply chain tracking, automated scheduling, and predictive maintenance.
              </p>
              <div className="space-y-2">
                <GaugeMeter value={94} label="Efficiency Rating" />
                <GaugeMeter value={97} label="Predictive Accuracy" />
                <GaugeMeter value={100} label="Safety Compliance" />
              </div>
              <Link
                to="/estimator"
                className="inline-flex items-center gap-2 bg-[#ea580c] text-white px-8 py-4 font-bold hover:bg-[#dc2626] transition-all group text-lg uppercase tracking-wider border-b-4 border-[#9a3412]"
              >
                Get Your Estimate <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative border-2 border-[#ccc] overflow-hidden shadow-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
                  alt="Industrial construction"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#1a1a1a] overflow-hidden">
        <CautionStripes className="absolute inset-0 opacity-10" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#333] border border-[#555] text-[#f97316] text-sm font-mono mb-4 uppercase tracking-widest">
              <Shield className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#d4d4d4] uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#222] border border-[#444] overflow-hidden hover:border-[#f97316]/50 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#f97316] text-white flex items-center justify-center text-sm font-bold font-mono shrink-0">
                      {index + 1}
                    </span>
                    <span className="font-bold text-[#d4d4d4] text-sm uppercase tracking-wide">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#f97316] shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-[#888] border-t border-[#444] pt-4 ml-11 leading-relaxed text-sm font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-gradient-to-br from-[#ea580c] to-[#c2410c] overflow-hidden">
        <CautionStripes className="absolute inset-0 opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight uppercase tracking-tight">
            Ready to Build Your Industrial Facility?
          </h2>
          <p className="text-lg text-orange-100 max-w-2xl mx-auto font-sans">
            Get a free consultation and AI-powered estimate today. Let&apos;s engineer the future.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-black text-white px-10 py-5 font-bold hover:bg-[#222] transition-all group text-lg uppercase tracking-wider"
            >
              Get a Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/estimator"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-10 py-5 font-bold hover:bg-white/10 transition-all group text-lg uppercase tracking-wider"
            >
              <Gauge className="w-5 h-5" />
              AI Estimator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
