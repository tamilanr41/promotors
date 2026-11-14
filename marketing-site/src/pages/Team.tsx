import { useState } from "react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "John Anderson",
    role: "CEO & Co-Founder",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "30+ years in construction technology. Former COO of major construction firm.",
  },
  {
    name: "Sarah Mitchell",
    role: "COO & Co-Founder",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "Operations expert with a passion for integrating AI into construction workflows.",
  },
  {
    name: "David Chen",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "AI and machine learning specialist. Built the COS AI Estimator engine.",
  },
  {
    name: "Maria Rodriguez",
    role: "VP of Construction",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    bio: "Licensed general contractor with 20+ years managing large-scale projects.",
  },
  {
    name: "James Wilson",
    role: "Head of Design",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    bio: "Award-winning architect specializing in sustainable and smart building design.",
  },
  {
    name: "Emily Thompson",
    role: "Director of Client Success",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "Dedicated to ensuring every COS client has an exceptional experience.",
  },
  {
    name: "Michael Park",
    role: "Head of Engineering",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    bio: "Structural engineering expert with innovative approach to complex projects.",
  },
  {
    name: "Lisa Brown",
    role: "VP of Sales & Marketing",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
    bio: "Strategic growth leader driving COS market expansion and brand presence.",
  },
];

const officePhotos = [
  { title: "Headquarters", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" },
  { title: "Design Studio", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80" },
  { title: "Team Collaboration", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" },
  { title: "Site Visit", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80" },
];

const stats = [
  { value: "200+", label: "Team Members" },
  { value: "8", label: "Regional Offices" },
  { value: "50+", label: "Industry Awards" },
  { value: "35", label: "States Served" },
];

export default function Team() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <div className="bg-[#f5f2ed]">
      <section className="relative w-full h-[85vh] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80"
          alt="COS Team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-end p-10 md:p-16">
          <div className="max-w-2xl">
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/50 mb-3 block">COS</span>
            <h1 className="text-white text-5xl md:text-7xl font-light tracking-tight leading-[0.95]">
              Meet the<br />Makers
            </h1>
            <p className="text-white/70 text-lg mt-6 font-light max-w-md leading-relaxed">
              Construction veterans, AI specialists, and visionaries building the operating system for construction.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-light text-black tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs tracking-[0.15em] uppercase text-gray-400 mt-2 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-28">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-black tracking-tight">Our People</h2>
          <div className="w-16 h-px bg-[#e85d4a] mt-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              className="relative group"
              onMouseEnter={() => setHoveredMember(i)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="bg-white p-3 pb-12 shadow-sm">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="font-['Caveat',_cursive] text-2xl text-black leading-tight">
                    {member.name}
                  </p>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-gray-400 mt-0.5 font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
              <div
                className="absolute left-3 right-3 bottom-0 bg-white shadow-lg px-4 py-4 transition-all duration-500 ease-out"
                style={{
                  transform: hoveredMember === i ? "translateY(-48px)" : "translateY(0)",
                  opacity: hoveredMember === i ? 1 : 0,
                  pointerEvents: hoveredMember === i ? "auto" : "none",
                }}
              >
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-300">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 mb-8">
          <h2 className="text-4xl md:text-5xl font-light text-black tracking-tight">Life at COS</h2>
          <div className="w-16 h-px bg-[#e85d4a] mt-4" />
        </div>
        <div className="flex overflow-x-auto gap-4 px-6 md:px-12 pb-16 snap-x snap-mandatory scrollbar-hide">
          {officePhotos.map((photo, i) => (
            <div key={i} className="shrink-0 snap-start w-[75vw] md:w-[45vw] lg:w-[30vw]">
              <div className="relative overflow-hidden aspect-[4/3]">
                <ImageWithFallback
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="mt-3 text-sm tracking-wide text-gray-500 font-light">
                {photo.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-300 py-24 text-center bg-white">
        <p className="text-gray-400 text-sm tracking-[0.2em] uppercase mb-4 font-medium">We&apos;re hiring</p>
        <Link
          to="/careers"
          className="inline-block text-black text-xl md:text-2xl font-light border-b border-black pb-0.5 hover:opacity-50 transition-opacity duration-300"
        >
          View open positions →
        </Link>
      </section>
    </div>
  );
}
