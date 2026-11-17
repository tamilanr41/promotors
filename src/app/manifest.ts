import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AAA Promoterz & Builders",
    short_name: "AAA Promoterz",
    description: "Premium residential plots, gated community layouts and fertile farming lands in Tamil Nadu.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f59e0b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/logo.webp",
        sizes: "480x320",
        type: "image/webp",
      },
      {
        src: "/logo.png",
        sizes: "480x320",
        type: "image/png",
      },
    ],
  };
}
