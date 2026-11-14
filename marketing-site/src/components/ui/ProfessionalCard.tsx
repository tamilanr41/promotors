import { ArrowRight, CheckCircle } from "lucide-react";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  link: string;
  delay?: number;
}

export function ServiceCard({ icon, title, description, features, link, delay = 0 }: ServiceCardProps) {
  return (
    <div 
      className="group relative p-8 rounded-3xl bg-white border border-gray-200 hover:border-[#F4B400]/30 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#F4B400]/5 to-[#60a5fa]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10">
        <div className="text-5xl mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold text-[#0a0a12] mb-4 group-hover:text-[#F4B400] transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed mb-8">
          {description}
        </p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="w-5 h-5 text-[#F4B400] shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        
        <div className="flex items-center justify-between">
          <a 
            href={link}
            className="inline-flex items-center gap-2 text-[#F4B400] font-semibold hover:text-[#fbbf24] transition-colors"
          >
            Learn More
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </a>
          
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F4B400]/10 to-[#60a5fa]/10 flex items-center justify-center group-hover:from-[#F4B400]/20 group-hover:to-[#60a5fa]/20 transition-all">
            <ArrowRight className="w-5 h-5 text-[#F4B400]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ image, title, category, description }: { 
  image: string; 
  title: string; 
  category: string; 
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer transition-all duration-700 hover:scale-105">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12]/90 via-[#0a0a12]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <span className="text-xs text-[#F4B400] font-bold tracking-widest uppercase border border-[#F4B400]/30 px-3 py-1 rounded-full bg-[#F4B400]/10">
          {category}
        </span>
        <h3 className="text-xl font-bold text-white mt-4 mb-2">
          {title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function TestimonialCard({ 
  quote, 
  name, 
  role, 
  rating = 5,
  avatarInitials 
}: { 
  quote: string; 
  name: string; 
  role: string; 
  rating?: number;
  avatarInitials: string;
}) {
  return (
    <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 group">
      <div className="absolute -top-6 left-10 text-7xl text-[#F4B400]/10 font-serif">&ldquo;</div>
      <div className="relative z-10">
        <div className="flex items-center gap-1 mb-6">
          {[...Array(rating)].map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-[#F4B400] to-[#fbbf24] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>
          ))}
        </div>
        
        <p className="text-gray-700 leading-relaxed italic mb-8 text-lg">
          {quote}
        </p>
        
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F4B400] to-[#fbbf24] flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {avatarInitials}
          </div>
          <div>
            <div className="font-bold text-[#0a0a12] text-lg">
              {name}
            </div>
            <div className="text-gray-500 font-medium">
              {role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsCard({ 
  value, 
  suffix = "", 
  label, 
  icon: Icon, 
  delay = 0
}: { 
  value: number; 
  suffix?: string; 
  label: string; 
  icon: any; 
  delay?: number;
}) {
  return (
    <div 
      className="group relative text-center p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[#F4B400]/30 hover:shadow-xl transition-all duration-500"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#F4B400]/20 to-[#60a5fa]/20 group-hover:from-[#F4B400]/30 group-hover:to-[#60a5fa]/30 transition-all">
        <Icon className="w-8 h-8 text-[#F4B400]" />
      </div>
      <div className="text-4xl sm:text-5xl font-bold text-[#0a0a12] mb-2">
        {value}{suffix}
      </div>
      <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );
}