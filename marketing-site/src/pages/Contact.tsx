import { useState } from "react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Head Office",
    details: ["123 Construction Avenue", "Building District", "New York, NY 10001"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 (234) 567-890", "+1 (234) 567-891"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@cosconstruction.com", "estimates@cosconstruction.com"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Mon - Fri: 7:00 AM - 6:00 PM", "Sat: 8:00 AM - 2:00 PM", "Sun: Closed"],
  },
];

const services = [
  "Residential Construction",
  "Commercial Construction",
  "Industrial Construction",
  "Infrastructure",
  "Renovation",
];

const officePhotos = [
  { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80", label: "Head Office" },
  { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80", label: "Workspace" },
  { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80", label: "Meeting Room" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80", label: "Our Team" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="min-h-screen bg-white">
      {showToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-[#1a1a1a] text-white px-5 py-3 rounded-lg shadow-2xl text-sm">
          <CheckCircle className="w-4 h-4 text-green-400" />
          Message sent — we&apos;ll respond within 24h
        </div>
      )}

      <div className="w-full h-[55vh] min-h-[420px] overflow-hidden">
        <ImageWithFallback
          src={officePhotos[0].src}
          alt={officePhotos[0].label}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-light text-[#1a1a1a] tracking-tight mb-2">Contact us</h1>
            <p className="text-[#6b6b6b] mb-12">We typically respond within 24 hours.</p>

            {submitted ? (
              <div>
                <p className="text-lg font-medium text-[#1a1a1a]">Thanks for your message.</p>
                <p className="text-[#6b6b6b]">We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  {[{ field: "firstName", label: "First name" }, { field: "lastName", label: "Last name" }].map(({ field, label }) => (
                    <div key={field} className="relative">
                      <input
                        id={field}
                        type="text"
                        required
                        value={formData[field as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        placeholder={label}
                        className="peer w-full pt-6 pb-2 bg-transparent border-b border-[#d4d4d4] text-[#1a1a1a] placeholder-transparent focus:outline-none focus:border-[#1a1a1a] transition-colors text-lg"
                      />
                      <label
                        htmlFor={field}
                        className="absolute left-0 top-0 text-xs text-[#6b6b6b] peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#1a1a1a] transition-all duration-200 pointer-events-none"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>

                {[{ field: "email", label: "Email address", type: "email" }, { field: "phone", label: "Phone number", type: "tel" }].map(({ field, label, type }) => (
                  <div key={field} className="relative">
                    <input
                      id={field}
                      type={type}
                      required
                      value={formData[field as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      placeholder={label}
                      className="peer w-full pt-6 pb-2 bg-transparent border-b border-[#d4d4d4] text-[#1a1a1a] placeholder-transparent focus:outline-none focus:border-[#1a1a1a] transition-colors text-lg"
                    />
                    <label
                      htmlFor={field}
                      className="absolute left-0 top-0 text-xs text-[#6b6b6b] peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#1a1a1a] transition-all duration-200 pointer-events-none"
                    >
                      {label}
                    </label>
                  </div>
                ))}

                <div className="relative">
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="peer w-full pt-6 pb-2 bg-transparent border-b border-[#d4d4d4] text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors text-lg appearance-none"
                  >
                    <option value="" disabled></option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <label
                    htmlFor="service"
                    className="absolute left-0 top-0 text-xs text-[#6b6b6b] peer-focus:text-[#1a1a1a] transition-all duration-200 pointer-events-none"
                  >
                    Service interested in
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Message"
                    className="peer w-full pt-6 pb-2 bg-transparent border-b border-[#d4d4d4] text-[#1a1a1a] placeholder-transparent focus:outline-none focus:border-[#1a1a1a] transition-colors text-lg resize-none"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-0 top-0 text-xs text-[#6b6b6b] peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#1a1a1a] transition-all duration-200 pointer-events-none"
                  >
                    Message
                  </label>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
                >
                  <Send className="w-4 h-4" /> Send message
                </button>
              </form>
            )}
          </div>

          <div>
            <div className="space-y-10">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-[#6b6b6b]" />
                      <h3 className="text-xs font-medium text-[#1a1a1a] uppercase tracking-widest">{item.title}</h3>
                    </div>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-[#6b6b6b] text-sm ml-6">{detail}</p>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="mt-12 pt-12 border-t border-[#d4d4d4]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#6b6b6b] mt-0.5 shrink-0" />
                <p className="text-sm text-[#1a1a1a]">123 Construction Avenue, New York, NY 10001</p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3">
              {officePhotos.slice(1).map((photo) => (
                <div key={photo.label} className="overflow-hidden">
                  <ImageWithFallback
                    src={photo.src}
                    alt={photo.label}
                    className="w-full h-28 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
