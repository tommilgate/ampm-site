import type { Metadata } from "next";
import { Jost, Tinos } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SeekaTracking from "@/components/SeekaTracking";

const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-jost" });
// Tinos is a metric-compatible Times New Roman — matches the serif in the reference footer
const tinos = Tinos({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-tinos" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ampm-site.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AM//PM Emo Night | Australia's Biggest Touring Emo Night",
    template: "%s | AM//PM Emo Night",
  },
  description:
    "AM//PM is Australia's biggest touring emo night — emo, pop-punk and scene anthems in Melbourne, Sydney, Brisbane and beyond. See upcoming events and grab tickets.",
  keywords: [
    "AM//PM", "AMPM Emo Night", "emo night", "emo night Australia", "pop punk night",
    "emo night Melbourne", "emo night Sydney", "emo night Brisbane", "scene night",
    "emo party", "emo events Australia",
  ],
  applicationName: "AM//PM Emo Night",
  authors: [{ name: "AM//PM Emo Night" }],
  creator: "AM//PM Emo Night",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "AM//PM Emo Night",
    title: "AM//PM Emo Night | Australia's Biggest Touring Emo Night",
    description:
      "Australia's biggest touring emo night. Emo, pop-punk & scene anthems across the country. See upcoming events & tickets.",
    url: SITE_URL,
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "AM//PM Emo Night",
    description: "Australia's biggest touring emo night. See upcoming events & tickets.",
    creator: "@ampmemonight",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favi.jpg", apple: "/ampmheartwhite.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${jost.variable} ${tinos.variable} ${jost.className}`}>
      <body className="min-h-full flex flex-col text-white" style={{ background: "#000" }}>
        {/* Seeka tracking — beforeInteractive, loads in <head> before all other scripts */}
        <SeekaTracking />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "AM//PM Emo Night",
                alternateName: "AMPM Emo Night",
                url: SITE_URL,
                logo: `${SITE_URL}/ampmheartwhite.png`,
                description: "Australia's biggest touring emo night.",
                sameAs: [
                  "https://instagram.com/ampmemonight",
                  "https://facebook.com/ampmemonight",
                  "https://tiktok.com/@ampmemonight",
                  "https://threads.net/@ampmemonight",
                  "https://twitter.com/ampmemonight",
                  "https://open.spotify.com/playlist/1o3TfNkUVdpGz8WP9kEunY",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "AM//PM Emo Night",
                url: SITE_URL,
              },
            ]),
          }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
