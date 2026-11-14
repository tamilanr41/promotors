import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { AppProvider } from "@/store/app-store";
import { AuthProvider } from "@/components/providers/auth-provider";

export const metadata: Metadata = {
  title: "AAA Promoterz",
  description:
    "Trusted land developers in Tamil Nadu. Premium residential layouts, farming lands and construction projects across Arakkonam, Thiruthani, Maduranthangam, Tiruvallur, Acharapakkam and Kanchipuram — with clear titles and honest pricing.",
  keywords: ["AAA Promoterz", "residential layouts Tamil Nadu", "farming lands", "plots for sale", "Arakkonam layout", "Thiruthani plots", "Maduranthangam land", "clear titles"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "AAA Promoterz",
    description:
      "Own the land. Shape the future. Premium residential plots and fertile farming lands across Tamil Nadu — clear titles, honest pricing, written contracts.",
    type: "website",
    locale: "en_IN",
  },
};

import AosInit from "@/components/layout/aos-init";
import ScrollTop from "@/components/layout/scroll-top";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('aaa-theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <AosInit />
        <ScrollTop />
        <AuthProvider>
          <AppProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AppProvider>
        </AuthProvider>
        <script src="https://unpkg.com/aos@2.3.4/dist/aos.js" async />
      </body>
    </html>
  );
}
