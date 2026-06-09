import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "AM//PM Emo Night",
  description: "Australia's biggest touring emo night",
  icons: { icon: "/favi.jpg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${jost.className}`}>
      <body className="min-h-full flex flex-col text-white">
        {/*
          Fixed background image — sits behind everything.
          No z-index so it doesn't create a stacking context barrier.
          The video's mix-blend-mode: screen composites directly against this.
        */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage: "url(/BACKGROUND_1.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            pointerEvents: "none",
          }}
        />
        {children}
      </body>
    </html>
  );
}
