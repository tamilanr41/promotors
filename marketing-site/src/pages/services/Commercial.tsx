import { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import {
  Building2,
  ArrowRight,
  Users,
  Shield,
  Ruler,
  Zap,
  GlassWater,
  Wind,
  ChevronDown,
  TrendingUp,
  Target,
  Layers,
  BarChart3,
  ExternalLink,
} from "lucide-react";

const scopeItems = [
  {
    icon: Building2,
    title: "Office Buildings",
    description: "Modern office spaces designed for productivity and collaboration",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80",
  },
  {
    icon: Ruler,
    title: "Retail Spaces",
    description: "Custom retail environments that drive customer engagement",
    img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80",
  },
  {
    icon: GlassWater,
    title: "Mixed-Use Developments",
    description: "Integrated residential, commercial, and retail complexes",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  },
  {
    icon: Zap,
    title: "Smart Building Systems",
    description: "IoT-enabled building management and automation",
    img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80",
  },
  {
    icon: Wind,
    title: "HVAC & MEP Systems",
    description: "Energy-efficient mechanical, electrical, and plumbing systems",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80",
  },
  {
    icon: Shield,
    title: "Safety & Compliance",
    description: "Full code compliance with advanced safety systems",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
  },
];

const steps = [
  {
    number: "01",
    title: "Feasibility Study",
    description: "Site analysis, zoning review, and financial feasibility assessment.",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
  },
  {
    number: "02",
    title: "Design Development",
    description: "Architectural design, engineering, and 3D visualization.",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&q=80",
  },
  {
    number: "03",
    title: "Permitting & Approvals",
    description: "Complete permit management and regulatory compliance.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
  },
  {
    number: "04",
    title: "Construction",
    description: "AI-managed construction with real-time progress tracking.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80",
  },
  {
    number: "05",
    title: "Commissioning",
    description: "Systems testing, final inspection, and tenant handover.",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
  },
];

const portfolioProjects = [
  { title: "Tech Park Tower", location: "Bangalore", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80" },
  { title: "City Center Mall", location: "Mumbai", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80" },
  { title: "Corporate Hub", location: "Hyderabad", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80" },
  { title: "Business Park", location: "Chennai", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
  { title: "Hospital Complex", location: "Delhi", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80" },
  { title: "Hotel & Convention", location: "Goa", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80" },
];

const techPartners = ["Siemens", "Honeywell", "Johnson Controls", "Schneider", "Cisco", "IBM"];

const faqs = [
  {
    q: "How long does commercial construction typically take?",
    a: "Commercial projects range from 6-24 months depending on size and complexity. Our AI estimator provides precise timelines based on your specific requirements.",
  },
  {
    q: "What certifications does COS hold for commercial projects?",
    a: "COS is licensed for commercial construction in all 50 states, with OSHA certification, LEED accreditation, and PCI certification for parking structures.",
  },
  {
    q: "Do you handle tenant improvements?",
    a: "Yes, we specialize in tenant improvements and build-outs, working directly with tenants and landlords to deliver customized spaces.",
  },
  {
    q: "Can COS manage both design and construction?",
    a: "Absolutely. Our integrated design-build approach streamlines communication and reduces project timelines by up to 30%.",
  },
];

export default function Commercial() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-20 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      <section className="relative min-h-screen bg-[#f4f7fb] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute w-full h-full opacity-[0.04]" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[...Array(10)].map((_, i) => (
              <polygon key={i} points={`${(i % 3) * 40},${i * 12} ${(i % 3) * 40 + 40},${i * 12 + 20} ${(i % 3) * 40 + 20},${i * 12 + 40} ${(i % 3) * 40 - 20},${i * 12 + 20}`} fill="none" stroke="#60a5fa" strokeWidth="0.5" />
            ))}
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur border border-slate-200 text-slate-600 text-sm font-medium w-fit shadow-sm">
                <Building2 className="w-4 h-4" />
                Commercial Construction
              </div>
              <h1 className="text-5xl sm:text-7xl font-bold text-slate-800 leading-[1.1] tracking-tight">
                Building Commercial
                <br />
                <span className="text-slate-500">Excellence</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
                From office towers to retail centers, COS delivers premium commercial construction with AI-driven precision.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-none font-semibold hover:bg-slate-700 transition-all group text-lg tracking-wide"
                >
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/estimator"
                  className="inline-flex items-center gap-2 border border-slate-300 text-slate-600 px-8 py-4 rounded-none font-semibold hover:bg-slate-50 transition-all group text-lg"
                >
                  <Layers className="w-5 h-5" />
                  Project Estimator
                </Link>
              </div>
              <div className="flex gap-8 pt-4 border-t border-slate-200">
                {[
                  { value: "500+", label: "Buildings Delivered" },
                  { value: "32M", label: "Sq. Ft. Built" },
                  { value: "4.8", label: "Client Rating" },
                ].map((s) => (
                  <div key={s.label} className="pt-4">
                    <div className="text-2xl font-bold text-slate-800">{s.value}</div>
                    <div className="text-sm text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="relative">
                <div className="absolute -inset-3 bg-white/60 border border-slate-200" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} />
                <div className="relative aspect-[4/3] overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-100/40 via-white/20 to-transparent z-10 mix-blend-overlay" />
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80"
                    alt="Commercial building"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 z-20">
                    <div className="bg-white/90 backdrop-blur px-4 py-2 text-slate-700 text-sm border border-slate-200 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Avg. ROI +32%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 text-sm font-medium mb-4">
                <Target className="w-4 h-4" />
                Scope of Work
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight">What We Deliver</h2>
            </div>
            <p className="text-slate-500 max-w-md text-lg">
              End-to-end commercial construction services tailored to your business needs
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {scopeItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative bg-white border border-slate-200 overflow-hidden hover:bg-slate-50 transition-all duration-300"
                  style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 25%)" }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <ImageWithFallback
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
                    <div className="absolute top-4 left-4 bg-white/90 p-3 border border-slate-200">
                      <Icon className="w-6 h-6 text-slate-600" />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block bg-white/90 backdrop-blur text-slate-600 text-xs px-3 py-1 border border-slate-200">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#f4f7fb] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-600 text-sm font-medium mb-4">
              <BarChart3 className="w-4 h-4" />
              Our Process
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight">How We Build</h2>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-2xl">
              <div className="hidden lg:block absolute top-0 left-1/2 bottom-0 w-px bg-slate-300 -translate-x-1/2" />
              {steps.map((step, idx) => (
                <div key={step.number} className="relative flex items-start gap-6 mb-0 pb-16 last:pb-0">
                  <div className={`hidden lg:block w-[calc(50%-2rem)] ${idx % 2 === 0 ? "order-1 text-right" : "order-3 text-left"}`}>
                    <div className="bg-white border border-slate-200 p-5 inline-block shadow-sm">
                      <span className="text-3xl font-bold text-slate-300">{step.number}</span>
                      <h3 className="text-lg font-bold text-slate-800 mt-1">{step.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{step.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 order-2 flex items-center justify-center shrink-0">
                    <div className="w-10 h-10 bg-slate-800 text-white flex items-center justify-center text-sm font-bold border-4 border-[#f4f7fb]">
                      {step.number}
                    </div>
                  </div>
                  <div className="lg:hidden flex-1 bg-white border border-slate-200 p-5">
                    <div className="relative h-24 overflow-hidden mb-3">
                      <ImageWithFallback src={step.img} alt={step.title} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-500">{step.description}</p>
                  </div>
                  <div className={`hidden lg:block w-[calc(50%-2rem)] ${idx % 2 === 0 ? "order-3" : "order-1"}`}>
                    <div className="overflow-hidden shadow-sm border border-slate-200">
                      <ImageWithFallback src={step.img} alt={step.title} className="w-full h-28 object-cover" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 text-sm font-medium mb-4">
              <Building2 className="w-4 h-4" />
              Portfolio
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight">Recent Commercial Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {portfolioProjects.map((project, i) => (
              <div key={i} className="group relative bg-slate-50 border border-slate-200 hover:-translate-y-1 transition-all duration-500">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 text-xs text-slate-600 border border-slate-200">
                    <ExternalLink className="w-3 h-3 inline mr-1" />
                    View
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end">
                    <div>
                      <div className="text-xs text-slate-300 mb-1 flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {project.location}
                      </div>
                      <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-[#f4f7fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-600 text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Technology Partners
            </div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Trusted Brands We Work With</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {techPartners.map((partner, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-20 px-4 bg-white border border-slate-200 hover:border-slate-400 hover:shadow-sm transition-all duration-300"
              >
                <span className="text-xs font-bold text-slate-600 text-center tracking-wider uppercase">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 order-2 lg:order-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 text-sm font-medium">
                <Zap className="w-4 h-4" />
                AI-Powered
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
                AI-Powered Commercial Construction
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Timeline", value: "6-24 months" },
                  { label: "Team Size", value: "30-100+" },
                  { label: "Warranty", value: "10-year" },
                ].map((item) => (
                  <div key={item.label} className="bg-[#f4f7fb] p-4 border border-slate-200 text-center">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="font-bold text-slate-800 text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 leading-relaxed border-l-4 border-slate-300 pl-4">
                Our COS platform integrates BIM, AI scheduling, and real-time budget tracking to deliver commercial projects on time and within budget.
              </p>
              <Link
                to="/estimator"
                className="inline-flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-none font-semibold hover:bg-slate-700 transition-all group text-lg tracking-wide"
              >
                Get Your Estimate <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="flex-1 order-1 lg:order-2 relative">
              <div className="relative border border-slate-200 overflow-hidden shadow-sm">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"
                  alt="Commercial construction"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 px-3 py-1.5 text-xs text-slate-600 border border-slate-200 flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" />
                  BIM Integrated
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#f4f7fb] overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-600 text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-1">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-slate-800 text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-slate-800 text-base">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-slate-500 border-t border-slate-200 pt-4 ml-11 leading-relaxed text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-white overflow-hidden border-t border-slate-200">
        <div className="relative max-w-3xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            Ready to Start Your Commercial Project?
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Get a free consultation and AI-powered estimate today. Let&apos;s build something extraordinary together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-slate-800 text-white px-10 py-5 font-semibold hover:bg-slate-700 transition-all group text-lg tracking-wide"
            >
              Get a Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/estimator"
              className="inline-flex items-center gap-2 border border-slate-300 text-slate-600 px-10 py-5 font-semibold hover:bg-slate-50 transition-all group text-lg"
            >
              <Layers className="w-5 h-5" />
              Project Estimator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
