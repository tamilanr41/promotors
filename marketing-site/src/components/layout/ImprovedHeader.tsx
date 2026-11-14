import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/team" },
  {
    name: "Services",
    href: "#",
    dropdown: [
      { name: "Residential", href: "/services/residential" },
      { name: "Commercial", href: "/services/commercial" },
      { name: "Industrial", href: "/services/industrial" },
      { name: "Infrastructure", href: "/services/infrastructure" },
      { name: "Renovation", href: "/services/renovation" },
    ],
  },
  { name: "Projects", href: "/portfolio" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "AI Estimator", href: "/estimator" },
  { name: "Contact", href: "/contact" },
];

function LogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="14" width="8" height="16" rx="1" className="transition-colors duration-500" fill="currentColor" />
      <rect x="12" y="6" width="8" height="24" rx="1" className="transition-colors duration-500" fill="currentColor" />
      <rect x="22" y="10" width="8" height="20" rx="1" className="transition-colors duration-500" fill="currentColor" />
      <rect x="22" y="2" width="8" height="6" rx="1" fill="#F4B400" />
      <rect x="12" y="2" width="8" height="2" rx="0.5" fill="#F4B400" />
      <rect x="2" y="10" width="8" height="2" rx="0.5" fill="#F4B400" />
    </svg>
  );
}

function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.15, y: y * 0.15 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
    setHovering(false);
  }, []);

  return (
    <Link
      to={href}
      className={className}
      style={{
        transform: hovering ? `translate(${pos.x}px, ${pos.y}px)` : "translate(0, 0)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
}

export default function ImprovedHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollState, setScrollState] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrollState(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const scrolled = !mounted ? false : scrollState;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1400px" }}>
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? "h-20" : "h-20 lg:h-24"
        }`}>

          <MagneticButton
            to="/"
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <div className={`transition-all duration-500 ${scrolled ? "scale-90" : "scale-100"}`}>
              <div className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(244,180,0,0.4)] group-hover:scale-105 group-hover:rotate-3 ${
                scrolled ? "bg-[#0a0a12]" : "bg-white/10 backdrop-blur-sm"
              }`}>
                <div className={`transition-colors duration-500 ${scrolled ? "text-[#F4B400]" : "text-white"}`}>
                  <LogoIcon />
                </div>
              </div>
            </div>
            <span className={`text-xl font-bold font-[family-name:var(--font-montserrat)] tracking-tight transition-all duration-500 ${
              scrolled ? "text-[#0a0a12]" : "text-white"
            }`}>
              CONSTRUCT
            </span>
          </MagneticButton>

          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div className="relative group/menu">
                    <button
                      className={`relative px-5 py-2.5 text-sm font-medium font-[family-name:var(--font-montserrat)] tracking-wide transition-all duration-300 rounded-lg ${
                        scrolled ? "text-[#0a0a12] hover:text-[#F4B400]" : "text-white/90 hover:text-white"
                      }`}
                    >
                      <span className="relative inline-block">
                        {item.name}
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#F4B400] transition-all duration-300 group-hover/menu:w-full" />
                      </span>
                      <ChevronDown className="inline w-3.5 h-3.5 ml-0.5 -mt-0.5 transition-transform duration-300 group-hover/menu:rotate-180" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 translate-y-2 group-hover/menu:translate-y-0">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:text-[#F4B400] hover:bg-gradient-to-r hover:from-[#F4B400]/5 hover:to-transparent transition-all duration-200"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#F4B400]/30" />
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`relative px-5 py-2.5 text-sm font-medium font-[family-name:var(--font-montserrat)] tracking-wide transition-all duration-300 rounded-lg hover:-translate-y-0.5 ${
                      scrolled ? "text-[#0a0a12] hover:text-[#F4B400]" : "text-white/90 hover:text-white"
                    }`}
                  >
                    <span className="relative inline-block">
                      {item.name}
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#F4B400] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <MagneticButton
              to="/contact"
              className="group relative bg-[#F4B400] text-[#0a0a12] px-8 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-[#fbbf24] hover:shadow-[0_8px_30px_rgba(244,180,0,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Free Quote
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </MagneticButton>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${
              scrolled ? "text-[#0a0a12] hover:bg-gray-100" : "text-white hover:bg-white/10"
            } ${isOpen ? "bg-white/10" : ""}`}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[-1] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl animate-[slideInRight_0.4s_ease-out] overflow-y-auto">
            <div className="flex flex-col h-full pt-24 px-6 pb-8">
              <nav className="flex-1 space-y-2">
                {navigation.map((item, i) => (
                  <div key={item.name} className="animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0" style={{ animationDelay: `${i * 50}ms` }}>
                    {item.dropdown ? (
                      <MobileDropdown item={item} onClose={() => setIsOpen(false)} />
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-4 text-base font-medium text-[#0a0a12] hover:text-[#F4B400] hover:bg-gradient-to-r hover:from-[#F4B400]/5 hover:to-transparent rounded-xl transition-all duration-300 font-[family-name:var(--font-montserrat)]"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
              <div className="pt-8 animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0" style={{ animationDelay: `${navigation.length * 50}ms` }}>
                <MagneticButton
                  to="/contact"
                  className="group relative flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-[#F4B400] text-[#0a0a12] font-semibold text-base tracking-wide transition-all duration-300 hover:bg-[#fbbf24] hover:shadow-lg"
                >
                  <span className="relative z-10">Get Free Quote</span>
                  <ArrowRight className="relative z-10 w-5 h-5" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ripple {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(30); opacity: 0; }
        }
        @keyframes slideInRight {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}

function MobileDropdown({
  item,
  onClose,
}: {
  item: { name: string; dropdown: { name: string; href: string }[] };
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-4 text-base font-medium text-[#0a0a12] hover:text-[#F4B400] hover:bg-gradient-to-r hover:from-[#F4B400]/5 hover:to-transparent rounded-xl transition-all duration-300 font-[family-name:var(--font-montserrat)]"
      >
        {item.name}
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="pl-6 pb-2 pt-1 space-y-1">
          {item.dropdown.map((sub) => (
            <Link
              key={sub.name}
              to={sub.href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:text-[#F4B400] hover:bg-[#F4B400]/5 rounded-lg transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-[#F4B400]/30" />
              {sub.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}