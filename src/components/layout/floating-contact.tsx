"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Send,
  Phone,
  CheckCheck,
  Car,
  FileText,
} from "lucide-react";

const WHATSAPP_NUMBER = "919176783332";
const PHONE_NUMBER = "+91 91767 83332";

// Authentic Standalone Official WhatsApp Emblem (Green Bubble + White Handset, No extra wrapper borders)
function OfficialWhatsAppIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Official WhatsApp Green Speech Bubble with Pointer Tail */}
      <path
        fill="#25D366"
        d="M24 4C12.95 4 4 12.95 4 24c0 3.53.92 6.84 2.53 9.72L4 44l10.55-2.47A19.9 19.9 0 0024 44c11.05 0 20-8.95 20-20S35.05 4 24 4z"
      />
      {/* Official White Phone Handset */}
      <path
        fill="#FFFFFF"
        d="M34.6 29.3c-.5-.2-2.9-1.4-3.4-1.6-.5-.2-.8-.2-1.2.3-.3.5-1.3 1.6-1.6 1.9-.3.4-.6.4-1.1.2-.5-.3-2.1-.8-4-2.5-1.5-1.3-2.5-3-2.8-3.5-.3-.5 0-.8.2-1 .2-.2.5-.6.7-.8.2-.3.3-.5.5-.8.1-.3.1-.6 0-.8-.1-.3-1.2-2.9-1.6-4-.4-1.1-.9-.9-1.2-.9h-1c-.4 0-1 .1-1.6.7-.5.6-2 2-2 4.8 0 2.8 2.1 5.6 2.4 5.9.3.4 4 6.2 9.8 8.7 1.4.6 2.5 1 3.3 1.3 1.4.4 2.7.4 3.7.2 1.1-.2 3.4-1.4 3.9-2.7.5-1.4.5-2.5.3-2.7-.2-.3-.5-.4-1-.7z"
      />
    </svg>
  );
}

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSendMessage = (customText?: string) => {
    const textToSend =
      customText ||
      inputMessage.trim() ||
      "Hello AAA Promoterz & Builders, I am interested in your layout plots. Please send me layout plans and price details.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setInputMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[150] flex flex-col items-end select-none">
      {/* ================= REAL EXECUTIVE WHATSAPP CHAT POPUP ================= */}
      {isOpen && (
        <div
          suppressHydrationWarning
          className="mb-3 w-[calc(100vw-2.5rem)] max-w-[340px] max-h-[calc(100vh-120px)] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-slate-300 dark:border-slate-800 animate-fadeIn flex flex-col bg-white dark:bg-slate-950"
        >
          {/* Authentic WhatsApp Dark Green Header */}
          <div className="bg-[#075E54] px-4 py-3 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-white p-0.5 shadow-sm overflow-hidden flex items-center justify-center">
                  <Image
                    src="/logo.webp"
                    alt="AAA Promoterz & Builders"
                    width={36}
                    height={36}
                    style={{ width: "auto", height: "auto" }}
                    className="h-full w-full object-contain"
                  />
                </div>
                {/* Active Online Status Badge */}
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#25D366] border-2 border-[#075E54]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5 leading-tight">
                  <h4 className="font-bold text-sm text-white">AAA Promoterz</h4>
                  {/* Verified Business Green Tick */}
                  <span
                    className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full bg-[#25D366] text-white"
                    title="Verified Business"
                  >
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5">
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.739a.75.75 0 0 1 1.04-.208Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100 font-medium">Verified Business · Online</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-black/20 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Authentic WhatsApp Chat Background Area (Scrollable, Stays Below Navbar) */}
          <div className="bg-[#EFEAE2] dark:bg-[#0B141A] p-3.5 space-y-3 overflow-y-auto flex-1 max-h-[260px]">
            {/* Incoming Official Agent Message Bubble */}
            <div className="flex flex-col items-start">
              <div className="relative bg-white dark:bg-[#1F2C34] text-slate-900 dark:text-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[95%] border border-black/5 dark:border-white/5">
                <p className="text-[11px] font-semibold text-[#075E54] dark:text-[#25D366] mb-0.5">
                  AAA Customer Desk
                </p>
                <p className="text-xs leading-relaxed">
                  வணக்கம்! Welcome to <strong>AAA Promoterz &amp; Builders</strong>. 👋
                </p>
                <p className="text-xs leading-relaxed mt-1">
                  Are you looking for verified DTCP layout plots in Maduranthakam, Arakkonam or Thiruthani? How can we help you today?
                </p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                  <span>Just now</span>
                  <CheckCheck className="h-3 w-3 text-[#53bdeb]" />
                </div>
              </div>
            </div>

            {/* Quick Action Options */}
            <div className="pt-0.5 space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 px-1 font-mono">
                Quick Options:
              </p>

              {/* Option 1: Free Cab Site Visit */}
              <button
                type="button"
                onClick={() =>
                  handleSendMessage(
                    "Hello AAA Promoterz, I would like to book a Free Cab Site Visit with my family for your layouts. Please share available dates."
                  )
                }
                className="w-full text-left p-2 rounded-xl bg-white dark:bg-[#1F2C34] hover:bg-emerald-50 dark:hover:bg-[#2A3942] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all flex items-center justify-between group shadow-xs cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-[#25D366] shrink-0" />
                  <span>🚗 Book Free Cab Site Visit</span>
                </span>
                <span className="text-[9px] font-bold text-amber-700 dark:text-amber-400 bg-amber-500/15 px-1.5 py-0.5 rounded shrink-0">
                  FREE
                </span>
              </button>

              {/* Option 2: Layout Plans & Price Sheet */}
              <button
                type="button"
                onClick={() =>
                  handleSendMessage(
                    "Hello AAA Promoterz, please send me DTCP layout blueprints and price sheets for Maduranthakam & Arakkonam."
                  )
                }
                className="w-full text-left p-2 rounded-xl bg-white dark:bg-[#1F2C34] hover:bg-emerald-50 dark:hover:bg-[#2A3942] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all flex items-center justify-between group shadow-xs cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#25D366] shrink-0" />
                  <span>📑 Send Layout Blueprint &amp; Prices</span>
                </span>
                <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0">&rarr;</span>
              </button>

              {/* Option 3: Direct Phone Call */}
              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="w-full text-left p-2 rounded-xl bg-white dark:bg-[#1F2C34] hover:bg-blue-50 dark:hover:bg-[#2A3942] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all flex items-center justify-between group shadow-xs cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>📞 Call Director ({PHONE_NUMBER})</span>
                </span>
                <span className="text-[9px] text-blue-600 dark:text-blue-400 font-mono font-bold shrink-0">
                  DIRECT
                </span>
              </a>
            </div>
          </div>

          {/* Real WhatsApp Chat Input Footer */}
          <div className="bg-[#F0F2F5] dark:bg-[#1F2C34] p-2.5 border-t border-slate-300 dark:border-slate-800 flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              className="flex-1 bg-white dark:bg-[#2A3942] border border-slate-300 dark:border-slate-700 rounded-full px-3.5 py-1.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#25D366]"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              className="h-8 w-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shrink-0 shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              title="Send to WhatsApp"
            >
              <Send className="h-3.5 w-3.5 -ml-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STANDALONE OFFICIAL WHATSAPP FLOATING BUTTON (NO OUTER CIRCLE) ================= */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Official WhatsApp Support"
        className="group relative flex items-center justify-center p-0 bg-transparent border-0 outline-none shadow-none transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
      >
        {isOpen ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/95 text-white shadow-xl backdrop-blur-md border border-white/25 transition-transform group-hover:rotate-90">
            <X className="h-6 w-6 stroke-[2.5]" />
          </div>
        ) : (
          <div className="relative flex items-center justify-center filter drop-shadow-[0_10px_22px_rgba(37,211,102,0.45)]">
            <OfficialWhatsAppIcon className="h-14 w-14" />
          </div>
        )}
      </button>
    </div>
  );
}
