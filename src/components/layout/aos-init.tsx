"use client";

import { useEffect } from "react";

export default function AosInit() {
  useEffect(() => {
    const AOS = (window as unknown as { AOS?: { init: (o: object) => void; refresh: () => void } }).AOS;
    if (AOS) {
      AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 80 });
    }
  }, []);
  return null;
}