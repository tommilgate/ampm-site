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
        {children}
      </body>
    </html>
  );
}
