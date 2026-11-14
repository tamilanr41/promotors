import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { AppProvider } from "@/store/app-store";
import { AuthProvider } from "@/components/providers/auth-provider";
import AosInit from "@/components/layout/aos-init";
import ScrollTop from "@/components/layout/scroll-top";

export const metadata: Metadata = {
  title: "AAA Promoterz",
  description:
    "Trusted land developers in Tamil Nadu. Premium residential layouts, farming lands and construction projects across Arakkonam, Thiruthani, Maduranthangam, Tiruvallur, Acharapakkam and Kanchipuram — with clear titles and honest pricing.",
  keywords: ["AAA Promoterz", "residential layouts Tamil Nadu", "farming lands", "plots for sale", "Arakkonam layout", "Thiruthani plots", "Maduranthangam land", "clear titles"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.webp",
  },
  openGraph: {
    title: "AAA Promoterz",
    description:
      "Own the land. Shape the future. Premium residential plots and fertile farming lands across Tamil Nadu — clear titles, honest pricing, written contracts.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('aaa-theme');if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
        <AosInit />
        <ScrollTop />
        <AuthProvider>
          <AppProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
