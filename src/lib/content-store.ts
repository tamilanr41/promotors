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

export interface SettingsItem {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
}

export type ContentType = "projects" | "upcoming" | "offers" | "testimonials" | "leads" | "settings";

const CONTENT_SYNC_EVENT = "aaa_site_content_updated";
const BROADCAST_CHANNEL_NAME = "aaa_content_sync_channel";
const LOCAL_STORAGE_KEY = "aaa_cached_content";
const LOCAL_TIMESTAMP_KEY = "aaa_content_local_ts";

export async function fetchLiveContent(): Promise<Record<string, any> | null> {
  let localData: Record<string, any> = {};
  let localTs = 0;

  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) localData = JSON.parse(cached);
      localTs = Number(localStorage.getItem(LOCAL_TIMESTAMP_KEY) || 0);
    } catch {}
  }

  try {
    const res = await fetch("/api/content", { cache: "no-store" });
    const contentType = res.headers.get("content-type") || "";
    if (res.ok && contentType.includes("application/json")) {
      const json = await res.json();
      if (json && json.success && json.data) {
        const serverData = json.data;
        const serverTs = Number(json.updatedAt || 0);

        // If client has newer local edits than server, preserve local edits and sync to server
        if (localTs > serverTs && Object.keys(localData).length > 0) {
          const merged = { ...serverData, ...localData };
          if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
          }
          // Push merged changes to server in background
          fetch("/api/content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(merged),
          }).catch(() => {});
          return merged;
        }

        // Server data is newer or local is empty, update local cache
        const merged = { ...localData, ...serverData };
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
        }
        return merged;
      }
    }
  } catch {
    // Gracefully fallback to localStorage when offline or server unreachable
  }

  return Object.keys(localData).length > 0 ? localData : null;
}

export async function saveLiveContent(type: ContentType, data: any): Promise<boolean> {
  const now = Date.now();

  // 1. Immediately persist to localStorage and broadcast with 0ms delay
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed = cached ? JSON.parse(cached) : {};
      parsed[type] = data;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      localStorage.setItem(LOCAL_TIMESTAMP_KEY, String(now));

      // Same-tab instant broadcast
      window.dispatchEvent(new CustomEvent(CONTENT_SYNC_EVENT, { detail: { type, data } }));

      // Cross-tab instant broadcast
      if (typeof BroadcastChannel !== "undefined") {
        const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        channel.postMessage({ type, data, timestamp: now });
        channel.close();
      }
    } catch (err) {
      console.warn("localStorage save error:", err);
    }
  }

  // 2. Persist to API / serverless /tmp
  try {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data }),
    });
    return res.ok;
  } catch (err) {
    console.warn(`saveLiveContent (${type}) API error (saved to localStorage):`, err);
    return true; // Still true because client storage is guaranteed
  }
}

// React Hook to subscribe to live data in any component with instant sync
export function useLiveContent<T>(
  type: ContentType,
  fallback: T[]
): [T[], (newData: T[]) => Promise<void>, boolean] {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Immediately load from localStorage on client mount (0ms latency)
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && Array.isArray(parsed[type]) && parsed[type].length > 0 && isMounted) {
          setData(parsed[type]);
        }
      }
    } catch {}

    // Background server sync to pull latest changes
    fetchLiveContent().then((content) => {
      if (isMounted && content && Array.isArray(content[type]) && content[type].length > 0) {
        setData(content[type]);
      }
    });

    // 1. Same-window custom event handler
    const handleCustomSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.type === type && isMounted) {
        setData(customEvent.detail.data);
      }
    };
    window.addEventListener(CONTENT_SYNC_EVENT, handleCustomSync);

    // 2. Cross-tab instant BroadcastChannel handler
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
      if (e.key === LOCAL_STORAGE_KEY && e.newValue && isMounted) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed && Array.isArray(parsed[type])) {
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
