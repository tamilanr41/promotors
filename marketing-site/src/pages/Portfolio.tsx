import { useState } from "react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { Link } from "react-router-dom";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "industrial", label: "Industrial" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "renovation", label: "Renovation" },
];

const projects = [
  { title: "The Horizon Tower", category: "commercial", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", location: "New York, NY", description: "48-story mixed-use commercial tower", featured: true },
  { title: "Green Valley Estate", category: "residential", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", location: "Los Angeles, CA", description: "200-unit luxury residential community", featured: false },
  { title: "Highway 95 Expansion", category: "infrastructure", image: "https://images.unsplash.com/photo-1541888946425-d81bb0510f4b?w=800&q=80", location: "Miami, FL", description: "12-mile highway with smart infrastructure", featured: false },
  { title: "Phoenix Manufacturing Hub", category: "industrial", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80", location: "Phoenix, AZ", description: "250,000 sq ft manufacturing facility", featured: false },
  { title: "Heritage Building Restoration", category: "renovation", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", location: "Boston, MA", description: "Historic landmark full restoration", featured: false },
  { title: "Riverside Office Park", category: "commercial", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80", location: "Chicago, IL", description: "500,000 sq ft Class A office complex", featured: false },
  { title: "Mountain View Residences", category: "residential", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", location: "Denver, CO", description: "Custom luxury mountain homes", featured: false },
  { title: "City Rail Transit Hub", category: "infrastructure", image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80", location: "Seattle, WA", description: "Multi-line transit interchange station", featured: false },
  { title: "Downtown Modern Lofts", category: "renovation", image: "https://images.unsplash.com/photo-1600586162220-73cbb7a2f3f8?w=800&q=80", location: "Austin, TX", description: "Industrial warehouse to luxury loft conversion", featured: false },
  { title: "Sunset Villas", category: "residential", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", location: "San Diego, CA", description: "Beachfront luxury villa community", featured: false },
  { title: "Steel Plant Modernization", category: "industrial", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80", location: "Pittsburgh, PA", description: "Full-scale steel plant upgrade", featured: false },
  { title: "Tech Park Tower", category: "commercial", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80", location: "San Francisco, CA", description: "30-story tech headquarters", featured: false },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const featuredProject = projects.find((p) => p.featured)!;
  const filteredProjects =
    activeCategory === "all"
      ? projects.filter((p) => !p.featured)
      : projects.filter((p) => p.category === activeCategory && !p.featured);

  return (
    <div className="bg-white">
      <section className="relative w-full h-[92vh] overflow-hidden">
        <ImageWithFallback
          src={featuredProject.image}
          alt={featuredProject.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16">
          <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/60 mb-4 block">Featured Project</span>
          <h1 className="text-white text-5xl md:text-7xl font-light tracking-tight leading-[0.95] max-w-3xl">
            {featuredProject.title}
          </h1>
          <p className="text-white/70 text-lg mt-4 font-light max-w-xl">
            {featuredProject.location} — {featuredProject.description}
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-8">
        <nav className="flex flex-wrap items-center gap-x-10 gap-y-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="relative pb-1 text-sm tracking-wide transition-colors duration-300"
              style={{
                color: activeCategory === cat.id ? "#000" : "#999",
                fontWeight: activeCategory === cat.id ? 600 : 400,
              }}
            >
              {cat.label}
              <span
                className="absolute bottom-0 left-0 h-px bg-black transition-all duration-300"
                style={{
                  width: activeCategory === cat.id ? "100%" : "0%",
                }}
              />
            </button>
          ))}
        </nav>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {filteredProjects.map((project, i) => (
            <div
              key={project.title}
              className="break-inside-avoid mb-4 relative group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-full block"
                style={{
                  aspectRatio: ["4/5", "3/4", "1/1", "4/3", "5/6", "3/2"][i % 6],
                  objectFit: "cover",
                }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-500 flex items-end p-6"
                style={{
                  opacity: hoveredIndex === i ? 1 : 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                }}
              >
                <div>
                  <p className="text-white text-2xl font-light tracking-tight leading-tight">
                    {project.title}
                  </p>
                  <p className="text-white/60 text-xs tracking-widest uppercase mt-1">
                    {project.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-40">
            <p className="text-gray-400 text-lg font-light">No projects in this category.</p>
          </div>
        )}
      </section>

      <section className="border-t border-gray-200 py-24 text-center">
        <p className="text-gray-500 text-sm tracking-widest uppercase mb-4">Interested in working together?</p>
        <Link
          to="/contact"
          className="inline-block text-black text-xl md:text-2xl font-light border-b border-black pb-0.5 hover:opacity-50 transition-opacity duration-300"
        >
          Start a conversation →
        </Link>
      </section>
    </div>
  );
}
