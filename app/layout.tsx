import type { Metadata } from "next";
import { Jost, Tinos } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-jost" });
// Tinos is a metric-compatible Times New Roman — matches the serif in the reference footer
const tinos = Tinos({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-tinos" });

export const metadata: Metadata = {
  title: "AM//PM Emo Night",
  description: "Australia's biggest touring emo night",
  icons: { icon: "/favi.jpg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${jost.variable} ${tinos.variable} ${jost.className}`}>
      <body className="min-h-full flex flex-col text-white" style={{ background: "#000" }}>
        {/*
          Fixed background texture — stays put in the viewport while the page scrolls.
          z-index: -1 keeps it BEHIND all content (including the footer's own opaque
          texture), so it never paints over anything. The hero video scrolls over this
          stationary texture, so the screen-blend interaction shifts as you scroll.
        */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            backgroundImage: "url(/BACKGROUND_1.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            pointerEvents: "none",
          }}
        />
        {children}
      </body>
    </html>
  );
}
