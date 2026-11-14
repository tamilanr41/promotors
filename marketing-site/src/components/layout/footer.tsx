import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/team" },
  { name: "Services", href: "/services/residential" },
  { name: "Projects", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Residential", href: "/services/residential" },
  { name: "Commercial", href: "/services/commercial" },
  { name: "Industrial", href: "/services/industrial" },
  { name: "Infrastructure", href: "/services/infrastructure" },
  { name: "Renovation & Design", href: "/services/renovation" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f0f1a] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/50 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#F4B400] rounded-lg flex items-center justify-center">
                <span className="text-[#0f0f1a] font-black text-lg font-[family-name:var(--font-montserrat)]">C</span>
              </div>
              <span className="text-xl font-black font-[family-name:var(--font-montserrat)]">
                <span className="text-[#F4B400]">C</span>ONSTRUCT
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Excellence in construction since 2004. Delivering premium residential, commercial, and industrial projects with unmatched quality and innovation.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold font-[family-name:var(--font-montserrat)] tracking-wider uppercase mb-6 text-white/80">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-[#F4B400] text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold font-[family-name:var(--font-montserrat)] tracking-wider uppercase mb-6 text-white/80">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link to={service.href} className="text-gray-400 hover:text-[#F4B400] text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold font-[family-name:var(--font-montserrat)] tracking-wider uppercase mb-6 text-white/80">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F4B400] shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">123 Construction Ave, Building District, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#F4B400] shrink-0" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-[#F4B400] text-sm transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#F4B400] shrink-0" />
                <a href="mailto:info@construct.com" className="text-gray-400 hover:text-[#F4B400] text-sm transition-colors">info@construct.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} CONSTRUCT. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-[#F4B400] text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-[#F4B400] text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
