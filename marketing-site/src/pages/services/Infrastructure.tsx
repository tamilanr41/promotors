import { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import {
  Road,
  ArrowRight,
  Clock,
  Users,
  Shield,
  ChevronDown,
  Train,
  Lightbulb,
  GitBranch,
  Droplets,
  Triangle,
  Compass,
  Mountain,
  Map,
  RadioTower,
  Globe,
} from "lucide-react";

const scopeItems = [
  {
    icon: Road,
    title: "Highways & Roads",
    description: "Major highway systems and local road networks",
    img: "https://images.unsplash.com/photo-1541888946425-d81bbd40e9d3?w=600&q=80",
  },
  {
    icon: GitBranch,
    title: "Bridges & Tunnels",
    description: "Complex bridge structures and tunnel systems",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
  },
  {
    icon: Droplets,
    title: "Water & Sewer Systems",
    description: "Municipal water treatment and distribution infrastructure",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80",
  },
  {
    icon: Train,
    title: "Rail & Transit",
    description: "Railway systems, stations, and public transit infrastructure",
    img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80",
  },
  {
    icon: Lightbulb,
    title: "Utility Networks",
    description: "Electrical grid, telecommunications, and utility corridors",
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
  },
  {
    icon: Triangle,
    title: "Earthworks & Site Dev",
    description: "Large-scale grading, excavation, and site preparation",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
  },
];

const steps = [
  {
    number: "01",
    title: "Environmental Assessment",
    description: "Impact studies, geotechnical surveys, and regulatory review.",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
  },
  {
    number: "02",
    title: "Design & Engineering",
    description: "Detailed infrastructure design using BIM and civil 3D.",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&q=80",
  },
  {
    number: "03",
    title: "Permitting",
    description: "Environmental permits, right-of-way acquisition, approvals.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
  },
  {
    number: "04",
    title: "Construction",
    description: "Heavy civil construction with AI-powered project management.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80",
  },
  {
    number: "05",
    title: "Handover",
    description: "Systems testing, documentation, and public handover.",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
  },
];

const portfolioProjects = [
  { title: "Expressway Corridor", location: "Delhi-Mumbai", image: "https://images.unsplash.com/photo-1541888946425-d81bbd40e9d3?w=600&q=80" },
  { title: "Metro Rail Phase II", location: "Bangalore", image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80" },
  { title: "River Bridge", location: "Assam", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80" },
  { title: "Water Treatment Plant", location: "Chennai", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80" },
  { title: "Smart Grid Network", location: "Gujarat", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
  { title: "Port Expansion", location: "Mumbai", image: "https://images.unsplash.com/photo-1624969862644-791f3dc98927?w=600&q=80" },
];

const techPartners = ["Caterpillar", "Komatsu", "Volvo CE", "Trimble", "Hexagon", "Topcon"];

const faqs = [
  {
    q: "Does COS handle public infrastructure projects?",
    a: "Yes, we are pre-qualified for federal, state, and municipal infrastructure projects across all major categories.",
  },
  {
    q: "What environmental certifications do you hold?",
    a: "We are ISO 14001 certified and have extensive experience with NEPA, LEED-ND, and Envision sustainability frameworks.",
  },
  {
    q: "How do you minimize community disruption?",
    a: "Our COS platform includes advanced traffic management planning, night work scheduling, and community communication systems.",
  },
  {
    q: "What is your project delivery approach?",
    a: "We offer design-bid-build, design-build, CM-at-risk, and P3 delivery models to best suit each project's requirements.",
  },
];

function TopoLines({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 800 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      {[20, 50, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380].map((offset, i) => (
        <path
          key={i}
          d={`M0 ${offset + 10} Q100 ${offset - 30} 200 ${offset + 5} T400 ${offset - 10} T600 ${offset + 15} T800 ${offset - 5}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity={0.12 + i * 0.02}
          className="text-emerald-700"
        />
      ))}
      {[35, 65, 95, 125, 155, 185, 215, 245, 275, 305, 335, 365].map((offset, i) => (
        <path
          key={`b-${i}`}
          d={`M0 ${offset + 20} Q150 ${offset - 20} 300 ${offset + 10} T550 ${offset - 15} T800 ${offset + 5}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity={0.08 + i * 0.015}
          className="text-amber-700"
        />
      ))}
    </svg>
  );
}

function CompassRose({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="0.4" />
      <polygon points="30,2 33,27 30,30 27,27" fill="currentColor" opacity="0.6" />
      <polygon points="30,58 27,33 30,30 33,33" fill="currentColor" opacity="0.3" />
      <polygon points="2,30 27,27 30,30 27,33" fill="currentColor" opacity="0.3" />
      <polygon points="58,30 33,33 30,30 33,27" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export default function Infrastructure() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-20 font-sans">
      <section className="relative min-h-screen bg-[#f5f0e8] overflow-hidden">
        <TopoLines className="absolute inset-0 w-full h-full" />
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#f59e0b]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur border-l-4 border-[#f59e0b] text-[#92400e] text-sm font-bold w-fit shadow-sm uppercase tracking-wide">
                <Road className="w-4 h-4" />
                Infrastructure
              </div>
              <h1 className="text-5xl sm:text-7xl font-black text-[#1e293b] leading-[1] uppercase tracking-tight">
                Building the
                <br />
                <span className="text-[#059669]">Backbone of</span>
                <br />
                <span className="text-[#f59e0b]">Communities</span>
              </h1>
              <p className="text-lg text-[#78716c] max-w-lg leading-relaxed">
                COS delivers critical infrastructure projects that connect, power, and sustain communities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#059669] text-white px-8 py-4 rounded-full font-bold hover:bg-[#047857] transition-all group text-lg shadow-md"
                >
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/estimator"
                  className="inline-flex items-center gap-2 border-2 border-[#d6d3d1] text-[#57534e] px-8 py-4 rounded-full font-bold hover:bg-[#f5f0e8] transition-all group text-lg"
                >
                  <Map className="w-5 h-5" />
                  Project Map
                </Link>
              </div>
              <div className="flex gap-6 pt-4">
                {[
                  { value: "1,200+", label: "KM of Roads" },
                  { value: "45+", label: "Bridges Built" },
                  { value: "500M", label: "Litres/Day Treated" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/70 px-4 py-3 border-l-2 border-[#f59e0b]">
                    <div className="text-2xl font-black text-[#1e293b]">{s.value}</div>
                    <div className="text-sm text-[#78716c] font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/40 border-2 border-dashed border-[#d6d3d1] rotate-1" />
                <div className="relative aspect-[4/3] overflow-hidden border-4 border-white shadow-xl">
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-white/90 backdrop-blur rounded-full px-3 py-1 text-xs text-[#059669] border border-[#d6d3d1] flex items-center gap-1 font-bold">
                      <Compass className="w-3 h-3" />
                      Survey Completed
                    </div>
                  </div>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1541888946425-d81bbd40e9d3?w=800&q=80"
                    alt="Infrastructure project"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f5f0e8]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 right-4 z-10">
                    <div className="bg-white/90 px-3 py-1.5 border border-[#d6d3d1] flex items-center gap-2 text-xs">
                      <Globe className="w-4 h-4 text-[#059669]" />
                      <span className="font-bold text-[#1e293b]">Geo Coverage: 32 States</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-white overflow-hidden">
        <TopoLines className="absolute bottom-0 w-full h-32 opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ecfdf5] text-[#047857] text-sm font-bold mb-4 uppercase tracking-wide">
                <Mountain className="w-4 h-4" />
                Scope of Work
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-[#1e293b] uppercase tracking-tight">What We Deliver</h2>
            </div>
            <p className="text-[#78716c] max-w-md text-lg font-medium">
              Large-scale infrastructure capabilities engineered for the public good
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scopeItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative bg-[#faf8f5] overflow-hidden hover:-translate-y-1 transition-all duration-300 border-2 border-[#e7e5e4]"
                  style={{ borderRadius: "999px 20px 20px 20px" }}
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-[#059669] group-hover:w-3 transition-all" />
                  <div className="relative h-40 overflow-hidden">
                    <ImageWithFallback
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-4 bg-white/90 p-2 border border-[#e7e5e4]">
                      <Icon className="w-5 h-5 text-[#059669]" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-1 h-1 bg-[#f59e0b] rounded-full" />
                      <span className="text-[10px] font-bold text-[#78716c] uppercase tracking-widest">Cat {String(idx + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1e293b] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#78716c] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#1e293b] overflow-hidden">
        <TopoLines className="absolute inset-0 w-full h-full opacity-5 text-emerald-300" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#059669]/20 border border-[#059669]/40 text-[#6ee7b7] text-sm font-bold mb-4 uppercase tracking-wide">
              <Map className="w-4 h-4" />
              Our Process
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">How We Build</h2>
          </div>
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={step.number} className="relative flex items-center gap-6 group">
                <div className="relative z-10 shrink-0">
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-[#059669] flex items-center justify-center group-hover:bg-[#059669] transition-colors">
                    <span className="text-xl font-black text-[#1e293b] group-hover:text-white transition-colors">{step.number}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-px h-12 bg-[#059669]/40">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#059669] rotate-45" />
                    </div>
                  )}
                </div>
                <div className="flex-1 bg-[#334155]/60 border border-[#475569] p-5 group-hover:border-[#059669]/40 transition-colors flex items-center gap-4">
                  <div className="hidden sm:block w-24 h-16 overflow-hidden border border-[#475569] shrink-0">
                    <ImageWithFallback src={step.img} alt={step.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{step.title}</h3>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">{step.description}</p>
                  </div>
                </div>
                <div className="hidden lg:flex items-center gap-2 text-[#6ee7b7] text-xs font-bold uppercase tracking-widest">
                  <div className="w-8 h-px bg-[#059669]/40" />
                  Waypoint
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#f5f0e8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fef3c7] text-[#92400e] text-sm font-bold mb-4 uppercase tracking-wide">
              <RadioTower className="w-4 h-4" />
              Portfolio
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1e293b] uppercase tracking-tight">Recent Infrastructure Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {portfolioProjects.map((project, i) => (
              <div key={i} className="group relative overflow-hidden border-4 border-white shadow-md hover:shadow-xl transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <CompassRose className="w-8 h-8 text-white/60" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-1 text-[#f59e0b] text-xs font-bold mb-1">
                      <Map className="w-3 h-3" />
                      {project.location}
                    </div>
                    <h3 className="text-base font-bold text-white">{project.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ecfdf5] text-[#047857] text-sm font-bold mb-4 uppercase tracking-wide">
              <Users className="w-4 h-4" />
              Technology Partners
            </div>
            <h2 className="text-3xl font-black text-[#1e293b] uppercase tracking-tight">Trusted Brands We Work With</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {techPartners.map((partner, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-20 px-4 bg-[#faf8f5] border-2 border-[#e7e5e4] hover:border-[#059669] hover:shadow-md transition-all duration-300"
              >
                <span className="text-xs font-bold text-[#444] text-center tracking-widest uppercase">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#f5f0e8] overflow-hidden">
        <TopoLines className="absolute inset-0 w-full h-full opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fef3c7] text-[#92400e] text-sm font-bold mb-4 uppercase tracking-wide">
                <RadioTower className="w-4 h-4" />
                Smart Infrastructure
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-[#1e293b] leading-tight uppercase tracking-tight">
                AI-Powered Infrastructure
              </h2>
              <p className="text-lg text-[#78716c] leading-relaxed font-medium">
                Our COS platform brings smart technology to infrastructure projects with real-time structural monitoring, traffic optimization, and sustainability tracking.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Clock, label: "Timeline", value: "18-48 months" },
                  { icon: Users, label: "Team", value: "100-500+" },
                  { icon: Shield, label: "Safety", value: "OSHA VPP Star" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="bg-white border-2 border-[#e7e5e4] p-4 text-center hover:border-[#059669] transition-colors">
                      <Icon className="w-6 h-6 text-[#047857] mx-auto mb-2" />
                      <div className="text-xs text-[#78716c] font-bold uppercase tracking-wider">{item.label}</div>
                      <div className="font-bold text-[#1e293b] text-sm">{item.value}</div>
                    </div>
                  );
                })}
              </div>
              <Link
                to="/estimator"
                className="inline-flex items-center gap-2 bg-[#059669] text-white px-8 py-4 rounded-full font-bold hover:bg-[#047857] transition-all group text-lg shadow-md"
              >
                Get Your Estimate <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative border-4 border-white shadow-xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1624969862644-791f3dc98927?w=800&q=80"
                  alt="Infrastructure construction"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f5f0e8]/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#1e293b] overflow-hidden">
        <TopoLines className="absolute inset-0 w-full h-full opacity-5 text-emerald-300" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#059669]/20 border border-[#059669]/40 text-[#6ee7b7] text-sm font-bold mb-4 uppercase tracking-wide">
              <Shield className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#334155]/60 border border-[#475569] overflow-hidden hover:border-[#059669]/40 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#f59e0b] text-[#1e293b] flex items-center justify-center text-sm font-black shrink-0">
                      {index + 1}
                    </span>
                    <span className="font-bold text-white text-base">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6ee7b7] shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-[#94a3b8] border-t border-[#475569] pt-4 ml-11 leading-relaxed text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#059669] overflow-hidden">
        <TopoLines className="absolute inset-0 w-full h-full opacity-10 text-white" />
        <div className="relative max-w-3xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight uppercase tracking-tight">
            Ready to Build Infrastructure?
          </h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto font-medium">
            Get a free consultation and AI-powered estimate today. Let&apos;s build what matters.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#059669] px-10 py-5 rounded-full font-bold hover:shadow-xl hover:shadow-black/20 transition-all group text-lg"
            >
              Get a Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/estimator"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-all group text-lg"
            >
              <Map className="w-5 h-5" />
              Project Map
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
