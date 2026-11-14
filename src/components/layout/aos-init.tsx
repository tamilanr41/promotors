"use client";

import { useEffect } from "react";

export default function AosInit() {
  useEffect(() => {
    const initAOS = () => {
      const AOS = (window as unknown as { AOS?: { init: (o: object) => void; refresh: () => void } }).AOS;
      if (AOS) {
        AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 80 });
      }
    };

    const existing = document.querySelector('script[src*="aos.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/aos@2.3.4/dist/aos.js";
      script.async = true;
      script.onload = initAOS;
      document.body.appendChild(script);
    } else {
      initAOS();
    }
  }, []);

  return null;
}
