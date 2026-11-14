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
  { title: "Grand Horizon Hotel", category: "Hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85" },
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

export default function HomeImproved() {
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
      <HomeHero />

      {/* STATS */}
      <section className="py-24 bg-gradient-to-br from-[#0a0a12] to-[#1a1a2e] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,180,0,0.1),transparent_70%)]" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="relative group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#F4B400]/30 hover:bg-white/10 transition-all duration-500"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#F4B400]/20 to-[#2563eb]/20">
                  <stat.icon className="w-8 h-8 text-[#F4B400]" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  <StatCounter value={stat.value} suffix={stat.suffix} delay={i * 100} />
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section ref={aboutRef} className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`relative group ${aboutVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`} style={{ transition: "all 1s ease-out" }}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=85)" }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-[#F4B400] to-[#fbbf24] rounded-3xl -z-10 shadow-xl" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#2563eb] to-[#60a5fa] rounded-2xl -z-10" />
              </div>
            </div>
            <div className={`space-y-8 ${aboutVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`} style={{ transition: "all 1s ease-out 0.2s" }}>
              <div>
                <span className="text-[#F4B400] font-bold tracking-[0.2em] uppercase text-sm">About Us</span>
                <h2 className="text-4xl sm:text-5xl font-bold text-[#0a0a12] mt-4 mb-6">
                  Building Excellence<br/>Through Innovation
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                With over two decades of experience, CONSTRUCT has established itself as a premier construction company
                known for delivering exceptional projects across residential, commercial, and industrial sectors. Our
                team of expert architects, engineers, and craftsmen bring unparalleled dedication to every project.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a0a12]">ISO Certified</div>
                    <div className="text-sm text-gray-500">Quality Assurance</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a0a12]">20+ Awards</div>
                    <div className="text-sm text-gray-500">Industry Recognition</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a0a12]">500+ Projects</div>
                    <div className="text-sm text-gray-500">Successfully Completed</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0a0a12]">Global Reach</div>
                    <div className="text-sm text-gray-500">International Presence</div>
                  </div>
                </div>
              </div>
              <Link
                to="/team"
                className="group inline-flex items-center gap-3 bg-[#0a0a12] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1a1a2e] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section ref={servicesRef} className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-[#F4B400] font-bold tracking-[0.2em] uppercase text-sm">Our Services</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a0a12] mt-4 mb-6">
              Comprehensive Construction Solutions
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From concept to completion, we deliver end-to-end construction services tailored to your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`group relative p-10 rounded-3xl bg-white border border-gray-200 hover:border-[#F4B400]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms`, transitionDuration: "700ms" }}
              >
                <div className="text-5xl mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0a0a12] mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {service.desc}
                </p>
                <div className="flex items-center justify-between">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-[#F4B400] font-semibold hover:text-[#fbbf24] transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </Link>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F4B400]/10 to-[#2563eb]/10 flex items-center justify-center group-hover:from-[#F4B400]/20 group-hover:to-[#2563eb]/20 transition-all">
                    <ArrowRight className="w-5 h-5 text-[#F4B400]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section ref={projectsRef} className="py-32 bg-[#0a0a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div>
              <span className="text-[#F4B400] font-bold tracking-[0.2em] uppercase text-sm">Our Portfolio</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4">
                Featured Projects
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-3 text-white font-semibold hover:text-[#F4B400] transition-colors"
            >
              View All Projects
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className={`group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer transition-all duration-700 hover:scale-105 ${projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12]/90 via-[#0a0a12]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-xs text-[#F4B400] font-bold tracking-widest uppercase border border-[#F4B400]/30 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-4">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section ref={whyRef} className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-[#F4B400] font-bold tracking-[0.2em] uppercase text-sm">Why Choose Us</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a0a12] mt-4 mb-6">
              Built on Excellence
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              What sets us apart is our unwavering commitment to quality, innovation, and client satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`group flex gap-6 p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-700 hover:-translate-y-2 ${whyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F4B400]/20 to-[#2563eb]/20 flex items-center justify-center group-hover:from-[#F4B400]/30 group-hover:to-[#2563eb]/30 transition-all">
                    <Icon className="w-8 h-8 text-[#F4B400]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0a0a12] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={testimonialsRef} className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,180,0,0.05),transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <span className="text-[#F4B400] font-bold tracking-[0.2em] uppercase text-sm">Testimonials</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a0a12] mt-4 mb-6">
              What Our Clients Say
            </h2>
          </div>
          <div className={`relative transition-all duration-1000 ${testimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-12 shadow-2xl">
              <div className="absolute -top-8 left-12 text-8xl text-[#F4B400]/10 font-serif">&ldquo;</div>
              <div className="relative z-10">
                <p className="text-xl text-gray-700 leading-relaxed italic mb-12">
                  {testimonials[testimonialIndex].text}
                </p>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F4B400] to-[#fbbf24] flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {testimonials[testimonialIndex].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[#0a0a12] text-lg font-[family-name:var(--font-montserrat)]">
                      {testimonials[testimonialIndex].name}
                    </div>
                    <div className="text-gray-500 font-medium">
                      {testimonials[testimonialIndex].role}
                    </div>
                    <div className="flex gap-1 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F4B400] text-[#F4B400]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${i === testimonialIndex ? "bg-[#F4B400] w-12" : "bg-gray-300 hover:bg-gray-400"}`}
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a12]/95 via-[#1a1a2e]/90 to-[#16213e]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12]/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,180,0,0.15),transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center transition-all duration-1000 delay-200 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
              Let&apos;s Build<br/>
              Something<br/>
              <span className="text-[#F4B400]">Extraordinary</span> Together
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Transform your vision into reality. Get in touch with our team for a free consultation
              and discover how we can exceed your expectations.
            </p>
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-4 bg-[#F4B400] text-[#0a0a12] px-12 py-5 rounded-xl text-lg font-bold transition-all duration-300 hover:shadow-[0_0_50px_rgba(244,180,0,0.5)] hover:-translate-y-1 hover:bg-[#fbbf24] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Request a Free Consultation
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}