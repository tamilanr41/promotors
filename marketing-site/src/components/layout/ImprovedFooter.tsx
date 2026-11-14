import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

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

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function ImprovedFooter() {
  return (
    <footer className="bg-[#0a0a12] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4B400]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#F4B400] rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-[#F4B400] to-[#fbbf24] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-[#0a0a12] font-black text-xl font-[family-name:var(--font-montserrat)]">C</span>
                </div>
              </div>
              <span className="text-2xl font-bold font-[family-name:var(--font-montserrat)]">
                <span className="text-[#F4B400]">C</span>ONSTRUCT
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Excellence in construction since 2004. Delivering premium residential, commercial, and industrial projects with unmatched quality and innovation.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#F4B400] hover:border-[#F4B400]/50 hover:bg-[#F4B400]/10 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold font-[family-name:var(--font-montserrat)] tracking-wider uppercase mb-8 text-white/90">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={link.name} className="group">
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-[#F4B400] text-sm transition-all duration-300 flex items-center gap-3 group-hover:translate-x-1"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F4B400]/30 group-hover:bg-[#F4B400] transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold font-[family-name:var(--font-montserrat)] tracking-wider uppercase mb-8 text-white/90">Our Services</h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.name} className="group">
                  <Link 
                    to={service.href} 
                    className="text-gray-400 hover:text-[#F4B400] text-sm transition-all duration-300 flex items-center gap-3 group-hover:translate-x-1"
                  >
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold font-[family-name:var(--font-montserrat)] tracking-wider uppercase mb-8 text-white/90">Contact Information</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F4B400]/20 to-[#60a5fa]/20 flex items-center justify-center shrink-0 group-hover:from-[#F4B400]/30 group-hover:to-[#60a5fa]/30 transition-all">
                  <MapPin className="w-5 h-5 text-[#F4B400]" />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed">
                  123 Construction Ave, Building District, New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F4B400]/20 to-[#60a5fa]/20 flex items-center justify-center shrink-0 group-hover:from-[#F4B400]/30 group-hover:to-[#60a5fa]/30 transition-all">
                  <Phone className="w-5 h-5 text-[#F4B400]" />
                </div>
                <a href="tel:+1234567890" className="text-gray-400 hover:text-[#F4B400] text-sm transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F4B400]/20 to-[#60a5fa]/20 flex items-center justify-center shrink-0 group-hover:from-[#F4B400]/30 group-hover:to-[#60a5fa]/30 transition-all">
                  <Mail className="w-5 h-5 text-[#F4B400]" />
                </div>
                <a href="mailto:info@construct.com" className="text-gray-400 hover:text-[#F4B400] text-sm transition-colors">
                  info@construct.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 backdrop-blur-md bg-black/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} CONSTRUCT. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-500 hover:text-[#F4B400] text-xs transition-colors relative group">
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F4B400] transition-all duration-300 group-hover:w-full" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#F4B400] text-xs transition-colors relative group">
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F4B400] transition-all duration-300 group-hover:w-full" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#F4B400] text-xs transition-colors relative group">
                Sitemap
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F4B400] transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}