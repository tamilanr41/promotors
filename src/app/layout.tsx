import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { AppProvider } from "@/store/app-store";
import { AuthProvider } from "@/components/providers/auth-provider";
import AosInit from "@/components/layout/aos-init";
import ScrollTop from "@/components/layout/scroll-top";

const SITE_URL = "https://aaapromoterzandbuilders.com";

export const viewport: Viewport = {
  themeColor: "#f59e0b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AAA Promoterz & Builders | Best Land Developers & Approved Plots in Tamil Nadu",
    template: "%s | AAA Promoterz & Builders",
  },
  description:
    "AAA Promoterz and Builders (aaapromoterzandbuilders.com) — Tamil Nadu's most trusted land promoter and developers. DTCP & CMDA approved residential plots, gated community layouts, and organic farm lands in Arakkonam, Thiruthani, Maduranthangam, Tiruvallur, Acharapakkam, and Kanchipuram with 100% clear legal titles, bank loans, and spot registration.",
  keywords: [
    // Primary Brand Keywords
    "AAA Promoterz",
    "AAA Promoterz and Builders",
    "AAA Promoterz & Builders",
    "AAA Builders",
    "aaapromoterzandbuilders.com",
    "AAA Promoters",
    "AAA Promoters Arakkonam",
    "AAA Promoters Thiruthani",
    "AAA Promoters Maduranthangam",
    // Location & Service Specific Keywords
    "land promoters in Tamil Nadu",
    "best plot developers Tamil Nadu",
    "DTCP approved plots Arakkonam",
    "CMDA approved plots Thiruthani",
    "residential layouts Maduranthangam",
    "Acharapakkam farm lands",
    "Tiruvallur residential plots",
    "Kanchipuram plots for sale",
    "clear title plots in Tamil Nadu",
    "gated community layouts Chennai",
    "agricultural land for sale Tamil Nadu",
    "turnkey villa construction Arakkonam",
  ],
  authors: [{ name: "AAA Promoterz & Builders", url: SITE_URL }],
  creator: "AAA Promoterz & Builders",
  publisher: "AAA Promoterz & Builders",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-IN": SITE_URL,
      "ta-IN": SITE_URL,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.webp",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "AAA Promoterz & Builders",
    title: "AAA Promoterz & Builders | Leading Land Developers & Approved Layouts",
    description:
      "Buy DTCP & CMDA approved residential plots and organic farm lands across Tamil Nadu. Clear titles, spot registration, and fixed contracts.",
    images: [
      {
        url: "/img7.webp",
        width: 1200,
        height: 630,
        alt: "AAA Promoterz & Builders - Verified Land Layouts in Tamil Nadu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AAA Promoterz & Builders | Leading Land Developers in Tamil Nadu",
    description:
      "DTCP/CMDA approved residential plots and fertile farmlands in Arakkonam, Thiruthani, and Maduranthangam with clear titles.",
    images: ["/img7.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "real estate",
};

// Rich Structured Data (JSON-LD) for Google Knowledge Graph & Local Business Rankings
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["RealEstateAgent", "GeneralContractor", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: "AAA Promoterz & Builders",
      alternateName: [
        "AAA Promoterz",
        "AAA Promoterz and Builders",
        "AAA Builders",
        "AAA Promoters",
        "AAA Promoterz & Builders Tamil Nadu",
        "aaapromoterzandbuilders.com",
      ],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/logo.webp`,
        caption: "AAA Promoterz & Builders Logo",
      },
      image: `${SITE_URL}/img7.webp`,
      description:
        "Tamil Nadu's premier land developers and construction company specializing in DTCP & CMDA approved residential layouts, fertile farm lands, and custom home building across Arakkonam, Thiruthani, Maduranthangam, Tiruvallur, Acharapakkam, and Kanchipuram.",
      telephone: "+919176783332",
      email: "aaapromoterzandbuilders@gmail.com",
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, Cheque, Bank Transfer, UPI",
      address: {
        "@type": "PostalAddress",
        streetAddress: "No. 12, Gandhi Road, Near New Bus Stand",
        addressLocality: "Arakkonam",
        addressRegion: "Tamil Nadu",
        postalCode: "631001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "13.0827",
        longitude: "79.6732",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday"],
          opens: "10:00",
          closes: "17:00",
        },
      ],
      areaServed: [
        { "@type": "City", name: "Arakkonam" },
        { "@type": "City", name: "Thiruthani" },
        { "@type": "City", name: "Maduranthangam" },
        { "@type": "City", name: "Tiruvallur" },
        { "@type": "City", name: "Kanchipuram" },
        { "@type": "City", name: "Acharapakkam" },
        { "@type": "AdministrativeArea", name: "Tamil Nadu" },
        { "@type": "City", name: "Chennai" },
      ],
      sameAs: [
        "https://wa.me/919176783332",
        "https://aaapromoterzandbuilders.com",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "AAA Promoterz & Builders",
      alternateName: [
        "AAA Promoterz",
        "AAA Promoterz and Builders",
        "aaapromoterzandbuilders.com",
      ],
      description: "Premium residential plots, gated layouts and fertile farming lands in Tamil Nadu",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: ["en-IN", "ta-IN"],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is AAA Promoterz and Builders?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AAA Promoterz & Builders is a premier land development and construction company in Tamil Nadu with over 10 years of experience, offering DTCP and CMDA approved residential plots, gated layouts, and agricultural farm lands.",
          },
        },
        {
          "@type": "Question",
          name: "Where are AAA Promoterz projects located in Tamil Nadu?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AAA Promoterz develops residential layouts and farmlands in prime strategic locations across Arakkonam, Thiruthani, Maduranthangam, Tiruvallur, Acharapakkam, and Kanchipuram.",
          },
        },
        {
          "@type": "Question",
          name: "Are all plots by AAA Promoterz legally approved with clear titles?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, 100% of our plots come with verified DTCP / CMDA approvals, clear legal titles, patta transfer support, and written contractual commitments.",
          },
        },
        {
          "@type": "Question",
          name: "How can I book a free site visit with AAA Promoterz?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can book a free site visit by calling or sending a WhatsApp message to +91 91767 83332 or visiting https://aaapromoterzandbuilders.com/contact.",
          },
        },
      ],
    },
  ],
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
        {/* Google Structured Data / JSON-LD Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
