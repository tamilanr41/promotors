import { useState } from "react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { Link } from "react-router-dom";

const posts = [
  {
    title: "How AI is Revolutionizing Construction Cost Estimation",
    excerpt: "Discover how machine learning and AI are transforming the way construction projects are estimated, saving time and improving accuracy.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    category: "AI & Technology",
    author: "David Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    date: "Mar 15, 2026",
    readTime: "5 min read",
  },
  {
    title: "Sustainable Building Practices for Modern Construction",
    excerpt: "Explore the latest sustainable construction methods and materials that are shaping the future of the building industry.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    category: "Sustainability",
    author: "Maria Rodriguez",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
    date: "Mar 10, 2026",
    readTime: "7 min read",
  },
  {
    title: "The Future of Commercial Real Estate Development",
    excerpt: "Trends and insights shaping commercial real estate development in 2026 and beyond.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
    category: "Commercial",
    author: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    date: "Mar 5, 2026",
    readTime: "6 min read",
  },
  {
    title: "Top 10 Questions to Ask Before Starting a Renovation",
    excerpt: "Planning a renovation? Here are the essential questions you need to ask before breaking ground.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    category: "Renovation",
    author: "Emily Thompson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    date: "Feb 28, 2026",
    readTime: "4 min read",
  },
  {
    title: "Smart Infrastructure: Building Cities of Tomorrow",
    excerpt: "How IoT and AI are being integrated into infrastructure projects to create smarter, more efficient cities.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb0510f4b?w=800&q=80",
    category: "Infrastructure",
    author: "Michael Park",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
    date: "Feb 20, 2026",
    readTime: "8 min read",
  },
  {
    title: "Navigating Construction Permits and Regulations",
    excerpt: "A comprehensive guide to understanding and managing construction permits, zoning laws, and regulatory compliance.",
    image: "https://images.unsplash.com/photo-1504304388090-c894fdcc538d?w=800&q=80",
    category: "Guides",
    author: "Sarah Mitchell",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80",
    date: "Feb 15, 2026",
    readTime: "6 min read",
  },
];

const categoryColors: Record<string, string> = {
  "AI & Technology": "#2563eb",
  Sustainability: "#16a34a",
  Commercial: "#d97706",
  Renovation: "#9333ea",
  Infrastructure: "#dc2626",
  Guides: "#0891b2",
};

const categories = [
  "All",
  "AI & Technology",
  "Commercial",
  "Sustainability",
  "Infrastructure",
  "Renovation",
  "Guides",
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredPost = posts[0];
  const remainingPosts =
    activeCategory === "All"
      ? posts.slice(1)
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <section className="relative w-full h-[80vh] overflow-hidden">
        <ImageWithFallback
          src={featuredPost.image}
          alt={featuredPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f7] via-[#faf9f7]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: categoryColors[featuredPost.category] || "#000" }}
            />
            <span className="text-[11px] tracking-[0.2em] uppercase font-medium text-gray-500">
              Cover Story
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-black leading-[1.05] max-w-4xl">
            {featuredPost.title}
          </h1>
          <div className="flex items-center gap-5 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <ImageWithFallback src={featuredPost.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-black font-medium">{featuredPost.author}</span>
            </div>
            <span>{featuredPost.date}</span>
            <span>{featuredPost.readTime}</span>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-6">
        <div className="flex items-center gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-300 border-b-2"
              style={{
                color: activeCategory === cat ? "#000" : "#aaa",
                borderColor: activeCategory === cat ? "#000" : "transparent",
                fontWeight: activeCategory === cat ? 600 : 400,
              }}
            >
              {cat !== "All" && (
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: categoryColors[cat] || "#999" }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
          {remainingPosts.map((post, idx) => (
            <Link
              key={post.title}
              to="#"
              className={`group ${idx === 0 && activeCategory === "All" ? "md:col-span-2" : ""}`}
            >
              <article
                className={`flex ${
                  idx === 0 && activeCategory === "All"
                    ? "flex-col md:flex-row md:items-center"
                    : "flex-col"
                } gap-6`}
              >
                <div
                  className={`relative overflow-hidden shrink-0 ${
                    idx === 0 && activeCategory === "All"
                      ? "md:w-1/2 aspect-[16/9]"
                      : "aspect-[16/10]"
                  }`}
                >
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="flex flex-col justify-center py-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-[10px] tracking-[0.15em] uppercase font-semibold px-2.5 py-1"
                      style={{
                        color: categoryColors[post.category] || "#000",
                        backgroundColor: `${categoryColors[post.category] || "#000"}10`,
                      }}
                    >
                      {post.category}
                    </span>
                    <span className="text-[11px] text-gray-400">{post.readTime}</span>
                  </div>
                  <div className="text-5xl md:text-6xl font-serif text-gray-200 leading-none mb-2 select-none">
                    {post.date.split(",")[0].split(" ")[0]}
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-black leading-snug mb-3 group-hover:text-gray-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-light line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full overflow-hidden">
                      <ImageWithFallback src={post.avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-400">{post.author}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400 font-medium mb-3">Newsletter</p>
            <h2 className="text-3xl md:text-4xl font-serif text-black leading-tight">
              Construction insights,<br />delivered weekly.
            </h2>
            <p className="text-gray-500 font-light mt-4 text-sm leading-relaxed max-w-md">
              Join thousands of construction professionals who get our analysis of industry trends, technology, and best practices.
            </p>
          </div>
          <div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent border-b border-gray-300 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-300 font-light"
              />
              <button className="text-sm font-medium text-black border-b border-black pb-3 hover:opacity-50 transition-opacity duration-300 shrink-0">
                Subscribe
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-3 font-light">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
