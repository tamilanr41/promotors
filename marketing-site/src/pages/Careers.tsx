import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Coffee, GraduationCap, Gift, Home, Users, ArrowRight } from "lucide-react";

const positions = [
  {
    title: "Senior Project Manager",
    department: "Operations",
    location: "New York, NY",
    type: "Full-time",
    salary: "$120K - $160K",
    description: "Lead cross-functional teams to deliver complex construction projects on time and within budget. Oversee project lifecycle from planning through completion.",
    requirements: ["8+ years in construction project management", "PMP certification preferred", "Experience with AI-powered project tools"],
  },
  {
    title: "AI/ML Engineer",
    department: "Technology",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$140K - $200K",
    description: "Build and optimize machine learning models for cost estimation, risk analysis, and project scheduling within the COS platform.",
    requirements: ["3+ years ML engineering experience", "Python, TensorFlow, PyTorch", "NLP or time-series experience a plus"],
  },
  {
    title: "Construction Superintendent",
    department: "Operations",
    location: "Multiple Locations",
    type: "Full-time",
    salary: "$90K - $130K",
    description: "Manage on-site construction activities, coordinate subcontractors, and ensure quality standards and safety compliance.",
    requirements: ["7+ years field experience", "OSHA 30 certification", "Strong leadership skills"],
  },
  {
    title: "Structural Engineer",
    department: "Engineering",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$85K - $120K",
    description: "Design structural systems for commercial and residential buildings using advanced analysis tools and sustainable practices.",
    requirements: ["PE license required", "Proficiency in ETABS, SAP2000", "Sustainable design experience"],
  },
  {
    title: "UX/UI Designer",
    department: "Technology",
    location: "Remote",
    type: "Full-time",
    salary: "$100K - $140K",
    description: "Design intuitive interfaces for the COS platform, translating complex construction workflows into seamless user experiences.",
    requirements: ["4+ years product design", "Figma expertise", "Construction/enterprise SaaS experience"],
  },
  {
    title: "Business Development Manager",
    department: "Sales",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100K - $150K + Commission",
    description: "Drive revenue growth by identifying and closing new business opportunities with construction companies nationwide.",
    requirements: ["5+ years B2B sales", "Construction industry network", "CRM proficiency"],
  },
  {
    title: "Safety Coordinator",
    department: "Safety",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$70K - $95K",
    description: "Implement and monitor safety programs across construction sites, ensuring compliance with OSHA and local regulations.",
    requirements: ["OSHA 30, CHST preferred", "3+ years safety management", "Inspection and audit experience"],
  },
  {
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    salary: "$65K - $85K",
    description: "Develop and execute marketing campaigns targeting construction companies, managing content strategy and brand communications.",
    requirements: ["3+ years marketing experience", "Content marketing and SEO", "B2B SaaS marketing background"],
  },
];

const benefits = [
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive medical, dental, and vision insurance" },
  { icon: Coffee, title: "Work-Life Balance", description: "Flexible PTO, remote options, and hybrid schedules" },
  { icon: GraduationCap, title: "Learning & Development", description: "Annual learning budget and conference attendance" },
  { icon: Gift, title: "Competitive Compensation", description: "Top-tier salaries, equity, and performance bonuses" },
  { icon: Home, title: "401(k) Matching", description: "Generous matching program for your future" },
  { icon: Users, title: "Inclusive Culture", description: "Diverse, supportive, and collaborative environment" },
];

const departments = [
  { name: "All Departments", emoji: "🌟" },
  { name: "Technology", emoji: "💻" },
  { name: "Operations", emoji: "🔧" },
  { name: "Engineering", emoji: "📐" },
  { name: "Sales", emoji: "📊" },
  { name: "Marketing", emoji: "🎯" },
  { name: "Safety", emoji: "🛡️" },
];

export default function Careers() {
  const [activeDept, setActiveDept] = useState("All Departments");
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const filteredPositions =
    activeDept === "All Departments"
      ? positions
      : positions.filter((p) => p.department === activeDept);

  return (
    <div>
      {/* Hero — pastel gradient, no image */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg,#fce4ec,#e8eaf6)" }}>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,182,193,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(179,229,252,0.4) 0%, transparent 50%)"
        }} />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(255,255,255,0.6)", color: "#d81b60" }}>
              🚀 We Are Hiring
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.85] tracking-tight" style={{ color: "#1a1a2e" }}>
              Shape the
              <br />
              <span style={{ background: "linear-gradient(135deg,#d81b60,#5c6bc0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Future</span>
              <br />
              of Construction
            </h1>
            <p className="text-lg mt-6 max-w-lg" style={{ color: "#5a5a7a" }}>
              Join COS and work at the intersection of construction and cutting-edge technology.
            </p>
            <a href="#openings" className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg" style={{ background: "linear-gradient(135deg,#d81b60,#5c6bc0)", color: "white" }}>
              View Open Positions <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats row — emoji + numbers */}
      <section className="py-12" style={{ background: "#f8f8ff" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap justify-center gap-12">
            {[
              { emoji: "🏗️", number: "500+", label: "Projects" },
              { emoji: "👷", number: "200+", label: "Team Members" },
              { emoji: "📍", number: "6", label: "Locations" },
              { emoji: "⭐", number: "4.9", label: "Rating" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="text-3xl block mb-1">{s.emoji}</span>
                <div className="text-3xl font-black" style={{ color: "#1a1a2e" }}>{s.number}</div>
                <div className="text-sm" style={{ color: "#7a7a9a" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits — card stack */}
      <section className="py-20" style={{ background: "linear-gradient(180deg,#fce4ec,#fff)" }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#d81b60" }}>Why COS</div>
            <h2 className="text-4xl sm:text-5xl font-black" style={{ color: "#1a1a2e" }}>Benefits &amp; Perks</h2>
            <p className="mt-3" style={{ color: "#7a7a9a" }}>We take care of our team so they can do their best work</p>
          </div>
          <div className="relative pb-8">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    marginTop: i > 0 ? "-1.5rem" : "0",
                    zIndex: benefits.length - i,
                    position: "relative",
                    background: "white",
                    border: "1px solid #e8e0f0",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: i % 2 === 0 ? "#fce4ec" : "#e8eaf6" }}>
                      <Icon className="w-6 h-6" style={{ color: i % 2 === 0 ? "#d81b60" : "#5c6bc0" }} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold" style={{ color: "#1a1a2e" }}>{benefit.title}</h4>
                      <p className="text-sm" style={{ color: "#7a7a9a" }}>{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job listings */}
      <section id="openings" className="py-20" style={{ background: "#f8f8ff" }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#5c6bc0" }}>Open Positions</div>
            <h2 className="text-4xl sm:text-5xl font-black" style={{ color: "#1a1a2e" }}>Join Our Mission</h2>
          </div>

          {/* Department filters with emojis */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {departments.map((dept) => (
              <button
                key={dept.name}
                onClick={() => setActiveDept(dept.name)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: activeDept === dept.name ? "linear-gradient(135deg,#d81b60,#5c6bc0)" : "white",
                  color: activeDept === dept.name ? "white" : "#5a5a7a",
                  border: activeDept === dept.name ? "none" : "2px solid #e0d8ec",
                }}
              >
                <span>{dept.emoji}</span> {dept.name}
              </button>
            ))}
          </div>

          {/* Accordion jobs */}
          <div className="space-y-3">
            {filteredPositions.map((position, i) => {
              const isExpanded = expandedJob === i;
              return (
                <div key={position.title} className="rounded-xl overflow-hidden transition-shadow" style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <button
                    onClick={() => setExpandedJob(isExpanded ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold" style={{ color: "#1a1a2e" }}>{position.title}</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-1">
                        <span style={{ color: "#d81b60" }}>{position.department}</span>
                        <span style={{ color: "#7a7a9a" }}>📍 {position.location}</span>
                        <span style={{ color: "#7a7a9a" }}>{position.salary}</span>
                      </div>
                    </div>
                    <span className={`text-xl transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} style={{ color: "#d81b60" }}>⟳</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-6 pb-6 pt-2" style={{ borderTop: "1px solid #f0ecf4" }}>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "#5a5a7a" }}>{position.description}</p>
                      <div className="mb-4">
                        <h5 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#5c6bc0" }}>Requirements</h5>
                        <div className="space-y-1.5">
                          {position.requirements.map((req, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm" style={{ color: "#5a5a7a" }}>
                              <span>•</span> {req}
                            </div>
                          ))}
                        </div>
                      </div>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105"
                        style={{ background: "linear-gradient(135deg,#d81b60,#5c6bc0)", color: "white" }}
                      >
                        Apply Now <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPositions.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-xl font-medium" style={{ color: "#7a7a9a" }}>No openings in this department right now.</p>
            </div>
          )}
        </div>
      </section>

      {/* Bento box CTA */}
      <section className="py-20" style={{ background: "linear-gradient(135deg,#fce4ec,#e8eaf6)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12" style={{ color: "#1a1a2e" }}>
            Don&apos;t See the Right Role?
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { emoji: "📬", title: "Send Resume", desc: "We&apos;ll keep you on file", bg: "#fce4ec", color: "#d81b60" },
              { emoji: "🤝", title: "Refer a Friend", desc: "Earn a referral bonus", bg: "#fff3e0", color: "#e65100" },
              { emoji: "💡", title: "Pitch Us", desc: "Got a role in mind? Tell us", bg: "#e0f2f1", color: "#00695c" },
            ].map((box) => (
              <div
                key={box.title}
                className="rounded-2xl p-8 text-center transition-all hover:scale-105 cursor-pointer"
                style={{ background: box.bg }}
              >
                <div className="text-5xl mb-4">{box.emoji}</div>
                <h3 className="text-lg font-bold mb-1" style={{ color: box.color }}>{box.title}</h3>
                <p className="text-sm" style={{ color: "#5a5a7a" }}>{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
