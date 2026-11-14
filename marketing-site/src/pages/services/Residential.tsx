import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import {
  Home,
  ArrowRight,
  Clock,
  Users,
  Shield,
  PaintBucket,
  Ruler,
  Droplets,
  Zap,
  Thermometer,
  ChevronDown,
  Star,
  MapPin,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const scopeItems = [
  {
    icon: Ruler,
    title: "Custom Home Design",
    description: "Tailored architectural designs that reflect your vision",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
  },
  {
    icon: Home,
    title: "New Home Construction",
    description: "Turn-key construction from foundation to finishing",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    icon: PaintBucket,
    title: "Interior Finishing",
    description: "Premium interior fit-outs with modern materials",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  },
  {
    icon: Droplets,
    title: "Plumbing & Electrical",
    description: "Complete MEP systems installation and testing",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
  },
  {
    icon: Zap,
    title: "Smart Home Integration",
    description: "AI-powered home automation and security systems",
    img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80",
  },
  {
    icon: Thermometer,
    title: "HVAC Systems",
    description: "Energy-efficient heating and cooling solutions",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80",
  },
];

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Meet with our team to discuss your vision, requirements, and budget.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
  },
  {
    number: "02",
    title: "Design & Planning",
    description: "Our architects create detailed plans and 3D renderings for your approval.",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&q=80",
  },
  {
    number: "03",
    title: "Permitting",
    description: "We handle all permits and regulatory approvals to ensure compliance.",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
  },
  {
    number: "04",
    title: "Construction",
    description: "Our expert team builds your home using premium materials and AI-powered project management.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80",
  },
  {
    number: "05",
    title: "Handover",
    description: "Final inspection, walkthrough, and keys delivered to your new home.",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
  },
];

const portfolioProjects = [
  { title: "Seaside Villa", location: "Goa", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
  { title: "Hilltop Mansion", location: "Coimbatore", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" },
  { title: "Garden Residency", location: "Pune", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" },
  { title: "Lake View Apartments", location: "Hyderabad", image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80" },
  { title: "Urban Luxury Homes", location: "Bangalore", image: "https://images.unsplash.com/photo-1600586162220-73cbb7a2f3f8?w=600&q=80" },
  { title: "Eco-Friendly Township", location: "Mysore", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
];

const techPartners = ["Bosch", "LG Smart", "Philips", "Schneider", "Siemens", "Honeywell"];

const faqs = [
  {
    q: "How long does it take to build a custom home?",
    a: "Depending on complexity and size, custom homes typically take 8-14 months from design to completion. Our AI estimator can provide a more precise timeline based on your specific requirements.",
  },
  {
    q: "What is included in the cost estimate?",
    a: "Our estimates include materials, labor, permits, design fees, and project management. We provide transparent, itemized quotes with no hidden fees.",
  },
  {
    q: "Do you offer financing options?",
    a: "Yes, we partner with leading financial institutions to offer flexible financing solutions for our residential clients.",
  },
  {
    q: "Can I make changes during construction?",
    a: "Absolutely. Our COS platform provides real-time project visibility and allows for change orders with clear cost and timeline implications.",
  },
];

function BlobShape({ className, color }: { className?: string; color: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.2,88.5,-0.7C87,14.8,81.4,29.6,72.5,42.7C63.6,55.8,51.4,67.2,37.8,76.1C24.2,85,9.2,91.4,-5.7,89.6C-20.5,87.8,-35.2,77.8,-47.1,66.2C-59,54.6,-68.1,41.4,-74.1,26.5C-80.1,11.6,-83,-5,-78.5,-18.8C-74,-32.6,-62.1,-43.6,-48.9,-50.6C-35.7,-57.6,-21.1,-60.6,-7.4,-66.7C6.4,-72.8,19.6,-82,30.6,-83.6C41.6,-85.1,50.3,-79.1,44.7,-76.4Z" transform="translate(100 100)" />
    </svg>
  );
}

export default function Residential() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [gaugeVal, setGaugeVal] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setGaugeVal((v) => (v >= 100 ? 0 : v + 1));
    }, 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-20 font-sans" style={{ fontFamily: "'Nunito', 'Inter', sans-serif" }}>
      <section className="relative min-h-screen bg-[#faf3e8] overflow-hidden">
        <BlobShape className="absolute -top-32 -left-32 w-96 h-96 text-amber-200/40" color="currentColor" />
        <BlobShape className="absolute -bottom-40 -right-40 w-[500px] h-[500px] text-amber-100/50" color="currentColor" />
        <BlobShape className="absolute top-1/3 right-1/4 w-64 h-64 text-orange-200/30" color="currentColor" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-white/70 backdrop-blur rounded-full border border-amber-200/50 text-amber-800 text-sm font-medium w-fit shadow-sm">
                <Home className="w-4 h-4" />
                Residential Construction
              </div>
              <h1 className="text-5xl sm:text-7xl font-extrabold text-[#5c3a1e] leading-[1.1]">
                Building Your
                <br />
                <span className="text-[#c87635]">Dream Home</span>
              </h1>
              <p className="text-lg text-[#8b6b4a] max-w-lg leading-relaxed">
                From custom luxury homes to multi-family developments, COS delivers exceptional residential construction powered by AI.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#c87635] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b5662a] transition-all group text-lg shadow-md shadow-amber-200"
                >
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/estimator"
                  className="inline-flex items-center gap-2 border-2 border-[#d4a373] text-[#7a5a3a] px-8 py-4 rounded-full font-semibold hover:bg-[#d4a373]/10 transition-all group text-lg"
                >
                  AI Estimator
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Link>
              </div>
              <div className="flex gap-8 pt-4">
                {[
                  { label: "Projects Delivered", value: "850+" },
                  { label: "Avg. Rating", value: "4.9" },
                  { label: "Years Experience", value: "25+" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-[#5c3a1e]">{stat.value}</div>
                    <div className="text-sm text-[#8b6b4a]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/40 rounded-[60px] border border-amber-200/50" style={{ borderRadius: "60% 40% 50% 50% / 40% 50% 50% 60%" }} />
                <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: "50% 50% 45% 55% / 55% 45% 55% 45%" }}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                    alt="Luxury residential home"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#faf3e8]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <div className="bg-white/80 backdrop-blur rounded-full px-4 py-2 text-[#5c3a1e] text-sm border border-amber-200/50">
                      <Star className="w-3 h-3 inline text-amber-500 mr-1" /> Premium Living
                    </div>
                    <div className="bg-white/80 backdrop-blur rounded-full px-4 py-2 text-[#5c3a1e] text-sm border border-amber-200/50">
                      <MapPin className="w-3 h-3 inline text-amber-500 mr-1" /> Pan-India
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#f5ede4] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#e8d5c0] rounded-full text-[#7a5a3a] text-sm font-medium mb-4">
              <Ruler className="w-4 h-4" />
              Scope of Work
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#5c3a1e]">What We Deliver</h2>
            <p className="text-[#8b6b4a] mt-4 text-lg">
              Comprehensive residential construction services under one roof
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scopeItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative bg-[#faf3e8] rounded-none overflow-hidden hover:-translate-y-2 transition-all duration-500 border-l-4 border-[#d4a373] shadow-md"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 23px, #e8d5c0 23px, #e8d5c0 24px), repeating-linear-gradient(90deg, transparent, transparent 23px, #e8d5c0 23px, #e8d5c0 24px)",
                    backgroundSize: "24px 24px",
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5c3a1e]/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 bg-white/80 backdrop-blur p-3 rounded-full border border-amber-200/50">
                      <Icon className="w-6 h-6 text-[#c87635]" />
                    </div>
                    <div className="absolute bottom-4 left-4 text-white/70 text-sm font-mono">0{idx + 1}</div>
                  </div>
                  <div className="p-6 bg-white/60">
                    <h3 className="text-xl font-bold text-[#5c3a1e] mb-2">{item.title}</h3>
                    <p className="text-[#8b6b4a] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#5c3a1e] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#d4a373]/20 border border-[#d4a373]/40 rounded-full text-[#d4a373] text-sm font-medium mb-4">
              <Clock className="w-4 h-4" />
              Our Process
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#faf3e8]">How We Build Your Home</h2>
          </div>
          <div className="relative overflow-x-auto pb-8">
            <div className="flex gap-0 min-w-[900px]">
              {steps.map((step, idx) => (
                <div key={step.number} className="flex-1 relative">
                  <div className="text-center px-4">
                    <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#c87635] text-white text-xl font-bold mb-6 shadow-lg shadow-[#c87635]/30 z-10">
                      {step.number}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-1 bg-gradient-to-r from-[#c87635] to-[#d4a373]" />
                    )}
                    <div className="bg-[#7a5a3a]/30 backdrop-blur rounded-2xl p-5 border border-[#d4a373]/20 min-h-[200px]">
                      <div className="relative h-24 rounded-xl overflow-hidden mb-3">
                        <ImageWithFallback src={step.img} alt={step.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#5c3a1e] to-transparent" />
                      </div>
                      <h3 className="font-bold text-[#faf3e8] mb-1">{step.title}</h3>
                      <p className="text-xs text-[#d4a373]/70 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#faf3e8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#e8d5c0] rounded-full text-[#7a5a3a] text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Portfolio
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#5c3a1e]">Recent Residential Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjects.map((project, i) => (
              <div key={i} className="group relative overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: "40% 45% 50% 40% / 45% 40% 55% 50%" }}>
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5c3a1e]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 text-[#d4a373] text-sm mb-1">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-[#f5ede4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#e8d5c0] rounded-full text-[#7a5a3a] text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Technology Partners
            </div>
            <h2 className="text-3xl font-bold text-[#5c3a1e]">Trusted Brands We Work With</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {techPartners.map((partner, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-24 px-6 rounded-2xl bg-white/80 border border-[#d4a373]/30 hover:border-[#c87635] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-sm font-bold text-[#5c3a1e] text-center tracking-wide">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#faf3e8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#e8d5c0] rounded-full text-[#7a5a3a] text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Powered Planning
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#5c3a1e] leading-tight">
                AI-Powered Timeline & Cost Estimation
              </h2>
              <p className="text-lg text-[#8b6b4a] leading-relaxed">
                Our COS AI analyzes your project details to provide accurate timelines and cost breakdowns instantly. No more guesswork or unexpected overruns.
              </p>
              <div className="relative w-full max-w-sm mx-auto">
                <div className="bg-[#5c3a1e] rounded-t-full p-6 pb-0">
                  <div className="relative w-48 h-48 mx-auto">
                    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#d4a373" strokeWidth="8" opacity="0.3" />
                      <circle
                        cx="60" cy="60" r="50"
                        fill="none" stroke="#c87635" strokeWidth="8"
                        strokeDasharray={`${gaugeVal * 3.14} 314`}
                        strokeLinecap="round"
                        className="transition-all duration-200"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#faf3e8]">{Math.round(gaugeVal)}%</div>
                        <div className="text-xs text-[#d4a373]">AI Accuracy</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#c87635] rounded-b-full py-3 text-center text-white text-sm font-medium">
                  Real-time estimation
                </div>
              </div>
              <Link
                to="/estimator"
                className="inline-flex items-center gap-2 bg-[#c87635] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b5662a] transition-all group text-lg shadow-md shadow-amber-200"
              >
                Get Your Estimate <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Clock, label: "Typical Timeline", value: "8-14 months" },
                { icon: Users, label: "Team Size", value: "15-25 professionals" },
                { icon: Shield, label: "Warranty", value: "10-year structural" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-white/80 rounded-2xl p-5 border border-[#d4a373]/30 hover:border-[#c87635] transition-colors">
                    <Icon className="w-8 h-8 text-[#c87635] mb-3" />
                    <div className="text-sm text-[#8b6b4a]">{item.label}</div>
                    <div className="font-bold text-[#5c3a1e] text-lg">{item.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 bg-[#5c3a1e] overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#d4a373]/20 border border-[#d4a373]/40 rounded-full text-[#d4a373] text-sm font-medium mb-4">
              <CheckCircle2 className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#faf3e8]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group bg-[#7a5a3a]/30 backdrop-blur rounded-2xl border border-[#d4a373]/20 overflow-hidden transition-all duration-300 hover:border-[#d4a373]/50"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-[#c87635] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-[#faf3e8] text-lg">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#d4a373] shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-[#d4a373]/80 border-t border-[#d4a373]/20 pt-4 ml-14 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "url(\"https://www.transparenttextures.com/patterns/brick-wall.png\")", backgroundColor: "#c87635", backgroundBlendMode: "overlay" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#c87635]/90 via-[#b5662a]/90 to-[#a05520]/90" />
        <div className="relative max-w-3xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Ready to Build Your Dream Home?
          </h2>
          <p className="text-lg text-amber-100 max-w-2xl mx-auto">
            Get a free consultation and AI-powered estimate today. Let&apos;s turn your vision into reality.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#7a5a3a] px-10 py-5 rounded-full font-semibold hover:shadow-2xl hover:shadow-black/20 transition-all group text-lg"
            >
              Get a Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/estimator"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-10 py-5 rounded-full font-semibold hover:bg-white/10 transition-all group text-lg"
            >
              AI Estimator
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
