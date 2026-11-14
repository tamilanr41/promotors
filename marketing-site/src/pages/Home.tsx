import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Building2, Clock, Users, Award, Shield, HeadphonesIcon, Star, ChevronRight, PlayCircle, HardHat } from "lucide-react";
import HomeHero from "./HomeHero";

const stats = [
  { value: 1200, suffix: "+", label: "Projects Completed", icon: Building2 },
  { value: 850, suffix: "+", label: "Happy Clients", icon: Users },
  { value: 20, suffix: "+", label: "Years Experience", icon: Award },
  { value: 150, suffix: "+", label: "Expert Engineers", icon: HardHat },
];

const services = [
  { title: "Residential Construction", desc: "Luxury homes and residential complexes built with premium materials and meticulous attention to detail.", icon: "🏠" },
  { title: "Commercial Buildings", desc: "State-of-the-art office towers, retail spaces, and commercial hubs designed for modern business.", icon: "🏢" },
  { title: "Industrial Projects", desc: "Large-scale industrial facilities, warehouses, and manufacturing plants with robust engineering.", icon: "🏭" },
  { title: "Interior Design", desc: "World-class interior solutions combining aesthetics with functionality for exceptional spaces.", icon: "✨" },
  { title: "Renovation", desc: "Complete transformation of existing structures with innovative design and modern construction.", icon: "🔄" },
  { title: "Project Management", desc: "End-to-end project oversight ensuring timely delivery, budget compliance, and quality standards.", icon: "📋" },
];

const projects = [
  { title: "Skyline Luxury Villas", category: "Luxury Villas", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80" },
  { title: "Harbor View Apartments", category: "Apartments", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" },
  { title: "Tech Park Office Complex", category: "Office Buildings", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" },
  { title: "Greenfield Industrial Zone", category: "Factories", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80" },
  { title: "Grand Horizon Hotel", category: "Hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" },
  { title: "City Care Hospital", category: "Hospitals", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80" },
];

const whyUs = [
  { title: "Quality", desc: "ISO-certified processes with rigorous quality checks at every stage of construction.", icon: CheckCircle },
  { title: "On-Time Delivery", desc: "Proven track record of completing projects on schedule through efficient planning.", icon: Clock },
  { title: "Certified Team", desc: "Highly skilled architects, engineers, and craftsmen with industry certifications.", icon: Award },
  { title: "Modern Equipment", desc: "State-of-the-art machinery and technology for precision construction.", icon: Building2 },
  { title: "Safety First", desc: "Comprehensive safety protocols with zero-incident track record.", icon: Shield },
  { title: "24/7 Support", desc: "Round-the-clock client support and project monitoring.", icon: HeadphonesIcon },
];

const testimonials = [
  { name: "Rajesh Mehta", role: "CEO, Mehta Group", text: "Construct delivered our flagship commercial project ahead of schedule with exceptional quality. Their professionalism and attention to detail exceeded our expectations." },
  { name: "Priya Sharma", role: "MD, Sharma Constructions", text: "We partnered with Construct for our luxury villa project. The craftsmanship was outstanding and the team was a pleasure to work with." },
  { name: "Arun Kumar", role: "Director, Kumar Industries", text: "Our industrial facility required specialized expertise. Construct not only met but exceeded all technical requirements with innovative solutions." },
  { name: "Sneha Patel", role: "Founder, Patel Estates", text: "Construct transformed our vision into reality. Their interior design team created spaces that are both beautiful and functional." },
];

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current!;
    const ctx = cvs.getContext("2d")!;
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * cvs.width,
        y: Math.random() * cvs.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    function animate() {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = cvs.width;
        if (p.x > cvs.width) p.x = 0;
        if (p.y < 0) p.y = cvs.height;
        if (p.y > cvs.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 180, 0, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      cvs.width = window.innerWidth;
      cvs.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
}

function StatCounter({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => {
      let start = 0;
      const step = Math.ceil(value / (2000 / 16));
      const timer = setInterval(() => {
        start += step;
        if (start >= value) { setCount(value); clearInterval(timer); }
        else setCount(start);
      }, 16);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(t1);
  }, [inView, value, delay]);

  return (
    <span className="text-2xl sm:text-3xl font-black text-white font-[family-name:var(--font-montserrat)]">
      {count}{suffix}
    </span>
  );
}

export default function Home() {
  const [heroRef, heroVisible] = useScrollReveal(0.01);
  const [aboutRef, aboutVisible] = useScrollReveal(0.1);
  const [servicesRef, servicesVisible] = useScrollReveal(0.05);
  const [projectsRef, projectsVisible] = useScrollReveal(0.05);
  const [whyRef, whyVisible] = useScrollReveal(0.05);
  const [testimonialsRef, testimonialsVisible] = useScrollReveal(0.1);
  const [ctaRef, ctaVisible] = useScrollReveal(0.1);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden bg-[#0f0f1a]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1541888946425-d81bb58e70d0?w=1920&q=85)",
              transform: mounted ? `translate(${(mousePos.x - (typeof window !== "undefined" ? window.innerWidth / 2 : 960)) * 0.02}px, ${(mousePos.y - (typeof window !== "undefined" ? window.innerHeight / 2 : 540)) * 0.02}px)` : "translate(0,0)",
              transition: "transform 0.1s ease-out",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1a]/95 via-[#0f0f1a]/70 to-[#0f0f1a]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-transparent to-transparent" />
        </div>

        <ParticleBackground />

        <div className="relative z-20 h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[60px] pt-[120px] pb-0">
          <div className="grid lg:grid-cols-[45fr_55fr] h-full gap-12 items-center">
            <div className={`transition-all duration-1000 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
                <span className="text-lg">🏗</span>
                <span className="text-sm text-white/80 tracking-wide">20+ Years of Construction Excellence</span>
              </div>

              <h1 className="font-black text-white leading-[1.1] font-[family-name:var(--font-montserrat)] mb-6"
                  style={{fontSize: "clamp(2.5rem, 5vw, 4.5rem)"}}>
                BUILDING THE<br />
                <span className="text-[#F4B400]">FUTURE</span> WITH<br />
                QUALITY & TRUST
              </h1>

              <p className="text-base sm:text-lg text-white/60 max-w-[600px] leading-relaxed mb-8">
                Delivering world-class residential, commercial, and industrial construction with
                unmatched craftsmanship, innovation, and trusted engineering excellence.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact"
                  className="group relative bg-[#F4B400] text-[#1a1a2e] px-8 py-4 rounded-xl text-base font-bold font-[family-name:var(--font-montserrat)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(244,180,0,0.4)] hover:-translate-y-0.5">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Free Quote
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
                <Link to="/portfolio"
                  className="group relative border-2 border-white/20 text-white px-8 py-4 rounded-xl text-base font-bold font-[family-name:var(--font-montserrat)] transition-all duration-300 hover:border-[#F4B400]/50 hover:shadow-[0_0_30px_rgba(244,180,0,0.15)] hover:-translate-y-0.5">
                  <span className="relative z-10 flex items-center gap-2">
                    View Projects
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center scale-110"
                  style={{
                    backgroundImage: "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85)",
                    transform: mounted ? `translate(${(mousePos.x - (typeof window !== "undefined" ? window.innerWidth / 2 : 960)) * 0.04}px, ${(mousePos.y - (typeof window !== "undefined" ? window.innerHeight / 2 : 540)) * 0.04}px)` : "translate(0,0)",
                    transition: "transform 0.1s ease-out",
                  }}
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
              </div>

              <div className="absolute -bottom-4 -left-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-5 hover:bg-white/15 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#F4B400]/20 flex items-center justify-center shrink-0">
                    <PlayCircle className="w-6 h-6 text-[#F4B400]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Building Tomorrow, Today</div>
                    <div className="text-xs text-white/60 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Watch Our Story
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">Scroll</span>
              <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
                <div className="w-1 h-2 rounded-full bg-[#F4B400] animate-[scrollDown_2s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-[#0f0f1a] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-[60px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="relative text-center"
              >
                <div className="flex items-center justify-center mb-1">
                  <stat.icon className="w-4 h-4 text-[#F4B400]" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-[family-name:var(--font-montserrat)]">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xs text-white/50 tracking-wide uppercase mt-1">{stat.label}</div>
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section ref={aboutRef} className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 delay-100 ${aboutVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=85)" }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#F4B400] rounded-2xl -z-10" />
              </div>
            </div>
            <div className={`transition-all duration-1000 delay-300 ${aboutVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
              <span className="text-[#F4B400] text-sm font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">About Us</span>
              <h2 className="text-4xl sm:text-5xl font-black text-[#1a1a2e] mt-4 mb-6 font-[family-name:var(--font-montserrat)] leading-tight">
                Crafting Excellence in Every Structure We Build
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                With over two decades of experience, CONSTRUCT has established itself as a premier construction company 
                known for delivering exceptional projects across residential, commercial, and industrial sectors. Our 
                team of expert architects, engineers, and craftsmen bring unparalleled dedication to every project.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#F4B400]" />
                  <span className="text-sm text-gray-600">ISO Certified</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#F4B400]" />
                  <span className="text-sm text-gray-600">20+ Awards</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#F4B400]" />
                  <span className="text-sm text-gray-600">500+ Projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#F4B400]" />
                  <span className="text-sm text-gray-600">Global Reach</span>
                </div>
              </div>
              <Link
                to="/team"
                className="group inline-flex items-center gap-2 text-[#1a1a2e] font-bold font-[family-name:var(--font-montserrat)] hover:text-[#F4B400] transition-colors"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

{/* SERVICES */}
      <section ref={servicesRef} className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F4B400] text-sm font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">Our Services</span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1a1a2e] mt-4 mb-4 font-[family-name:var(--font-montserrat)]">
              Comprehensive Construction Solutions
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              From concept to completion, we deliver end-to-end construction services tailored to your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`group relative p-8 rounded-2xl bg-white border border-gray-100 hover:border-[#F4B400]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(244,180,0,0.08)] hover:-translate-y-1 ${
                  servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms`, transitionDuration: "1000ms" }}
              >
                <div className="text-4xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">{service.icon}</div>
                <h3 className="text-xl font-bold text-[#1a1a2e] mb-3 font-[family-name:var(--font-montserrat)]">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full bg-[#F4B400]/0 group-hover:bg-[#F4B400]/10 transition-all duration-500 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-[#F4B400] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section ref={projectsRef} className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#F4B400] text-sm font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">Our Portfolio</span>
              <h2 className="text-4xl sm:text-5xl font-black text-[#1a1a2e] mt-4 font-[family-name:var(--font-montserrat)]">
                Featured Projects
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-2 text-[#1a1a2e] font-bold font-[family-name:var(--font-montserrat)] hover:text-[#F4B400] transition-colors flex-shrink-0"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className={`group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer ${
                  projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms`, transitionDuration: "1000ms" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/90 via-[#0f0f1a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-xs text-[#F4B400] font-bold tracking-widest uppercase">{project.category}</span>
                  <h3 className="text-xl font-bold text-white mt-1 font-[family-name:var(--font-montserrat)]">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section ref={whyRef} className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F4B400] text-sm font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">Why Choose Us</span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1a1a2e] mt-4 mb-4 font-[family-name:var(--font-montserrat)]">
              Built on Excellence
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              What sets us apart is our unwavering commitment to quality, innovation, and client satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex gap-5 p-6 rounded-2xl transition-all duration-700 hover:bg-gray-50 ${
                    whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#F4B400]/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#F4B400]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a1a2e] mb-2 font-[family-name:var(--font-montserrat)]">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={testimonialsRef} className="py-28 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#F4B400] text-sm font-bold tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)]">Testimonials</span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1a1a2e] mt-4 mb-4 font-[family-name:var(--font-montserrat)]">
              What Our Clients Say
            </h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className={`transition-all duration-1000 ${testimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-xl">
                <div className="absolute -top-4 left-10 text-6xl text-[#F4B400]/20 font-serif">&ldquo;</div>
                <p className="text-lg text-gray-600 leading-relaxed italic mb-8 relative z-10">
                  {testimonials[testimonialIndex].text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F4B400] to-[#F4B400]/60 flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[testimonialIndex].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[#1a1a2e] font-[family-name:var(--font-montserrat)]">{testimonials[testimonialIndex].name}</div>
                    <div className="text-sm text-gray-400">{testimonials[testimonialIndex].role}</div>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#F4B400] text-[#F4B400]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === testimonialIndex ? "bg-[#F4B400] w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=85)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1a]/95 via-[#0f0f1a]/85 to-[#0f0f1a]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`max-w-2xl transition-all duration-1000 delay-200 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-[family-name:var(--font-montserrat)] mb-8">
              Let&apos;s Build Something Extraordinary Together
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-xl">
              Transform your vision into reality. Get in touch with our team for a free consultation.
            </p>
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 bg-[#F4B400] text-[#1a1a2e] px-10 py-4 rounded-lg text-lg font-bold font-[family-name:var(--font-montserrat)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(244,180,0,0.35)] overflow-hidden"
            >
              <span className="relative z-10">Request a Free Consultation</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
