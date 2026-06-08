import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AM//PM Emo Night",
  description: "Australia's biggest touring emo night",
  icons: { icon: "/favi.jpg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
