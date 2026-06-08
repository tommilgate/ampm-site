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
      <body className="min-h-full flex flex-col bg-black text-white">
        {/* Fixed background — stays put while everything scrolls over it */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            backgroundImage: "url(/BACKGROUND_1.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {children}
      </body>
    </html>
  );
}
