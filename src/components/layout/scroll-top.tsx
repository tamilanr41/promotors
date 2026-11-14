"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-24 right-6 sm:right-7 z-[90] flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center bg-slate-950/85 hover:bg-amber-500 text-white hover:text-slate-950 dark:bg-white/85 dark:hover:bg-amber-400 dark:text-slate-950 shadow-xl backdrop-blur-md rounded-full border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer"
    >
      <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
  );
}
