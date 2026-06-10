import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#000" }}>
      <header className="w-full flex justify-center pt-7 pb-2">
        <Link id="legal-logo-home" href="/" aria-label="Home">
          <Image src="/ampmheartwhite.png" alt="AM//PM" width={30} height={30} className="object-contain" priority />
        </Link>
      </header>

      <main className="flex-1 w-full max-w-[720px] mx-auto px-5 pt-6 pb-14">
        <div className="legal">{children}</div>
      </main>

      <BottomNav persistent />
    </div>
  );
}
