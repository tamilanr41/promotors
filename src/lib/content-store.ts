"use client";

import { useState, useEffect } from "react";

export interface ProjectItem {
  id: string;
  name: string;
  location: string;
  category: string;
  plotsCount: number;
  priceRange: string;
  status: "Ready to Construct" | "Ongoing Development" | "Fast Selling" | "Completed";
  image: string;
  description: string;
  isActive?: boolean;
}

export interface UpcomingProjectItem {
  id: string;
  name: string;
  location: string;
  expectedLaunch: string;
  category: string;
  totalAcres: string;
  estimatedPlots: number;
  preBookingStatus: "Pre-Booking Open" | "Early Bird Available" | "Approvals in Progress" | "Coming Soon";
  image: string;
  highlights: string;
  isActive?: boolean;
}

export interface OfferItem {
  id: string;
  badge?: string;
  tag?: string;
  title: string;
  discountType?: string;
  discountValue?: string;
  applicableProjects?: string;
  validTill?: string;
  active: boolean;
  terms?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
  featured: boolean;
  active: boolean;
  date: string;
}

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  project: string;
  plotSize: string;
  budget: string;
  status: "new" | "contacted" | "site-visit-fixed" | "booked" | "cancelled";
  source: string;
  date: string;
  notes: string;
}

export type ContentType = "projects" | "upcoming" | "offers" | "testimonials" | "leads";

const CONTENT_SYNC_EVENT = "aaa_site_content_updated";
const BROADCAST_CHANNEL_NAME = "aaa_content_sync_channel";

export async function fetchLiveContent() {
  try {
    const res = await fetch("/api/content", { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        if (typeof window !== "undefined") {
          localStorage.setItem("aaa_cached_content", JSON.stringify(json.data));
        }
        return json.data;
      }
    }
  } catch (err) {
    console.error("fetchLiveContent error:", err);
  }

  // Fallback to localStorage if offline
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem("aaa_cached_content");
      if (cached) return JSON.parse(cached);
    } catch {}
  }
  return null;
}

export async function saveLiveContent(type: ContentType, data: any) {
  try {
    // 1. Immediately update localStorage and broadcast instantly across all open tabs/windows
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("aaa_cached_content");
        const parsed = cached ? JSON.parse(cached) : {};
        parsed[type] = data;
        localStorage.setItem("aaa_cached_content", JSON.stringify(parsed));

        // Same-window broadcast
        window.dispatchEvent(new CustomEvent(CONTENT_SYNC_EVENT, { detail: { type, data } }));

        // Instant cross-tab broadcast (0ms delay)
        if (typeof BroadcastChannel !== "undefined") {
          const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
          channel.postMessage({ type, data });
          channel.close();
        }
      } catch {}
    }

    // 2. Persist to API / disk
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data }),
    });
    return res.ok;
  } catch (err) {
    console.error(`saveLiveContent (${type}) error:`, err);
    return false;
  }
}

// React Hook to subscribe to live data in any component with instant sync
export function useLiveContent<T>(
  type: ContentType,
  fallback: T[]
): [T[], (newData: T[]) => Promise<void>, boolean] {
  // Initial state matches fallback so SSR and initial client pass match 100% (eliminates hydration errors)
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Immediately load from localStorage on client mount (0ms, no network wait)
    try {
      const cached = localStorage.getItem("aaa_cached_content");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && Array.isArray(parsed[type]) && isMounted) {
          setData(parsed[type]);
        }
      }
    } catch {}

    // Background fetch to ensure latest data from disk/server
    fetchLiveContent().then((content) => {
      if (isMounted && content && content[type]) {
        setData(content[type]);
      }
    });

    // 1. Same-window custom event handler
    const handleCustomSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.type === type) {
        setData(customEvent.detail.data);
      }
    };
    window.addEventListener(CONTENT_SYNC_EVENT, handleCustomSync);

    // 2. Cross-tab instant BroadcastChannel handler (0ms latency)
    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== "undefined") {
      channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      channel.onmessage = (event) => {
        if (event.data && event.data.type === type && isMounted) {
          setData(event.data.data);
        }
      };
    }

    // 3. Storage event fallback
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "aaa_cached_content" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed && parsed[type] && isMounted) {
            setData(parsed[type]);
          }
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      isMounted = false;
      window.removeEventListener(CONTENT_SYNC_EVENT, handleCustomSync);
      window.removeEventListener("storage", handleStorage);
      if (channel) {
        channel.close();
      }
    };
  }, [type]);

  const update = async (newData: T[]) => {
    setData(newData);
    await saveLiveContent(type, newData);
  };

  return [data, update, loading];
}
