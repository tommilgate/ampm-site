"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header({ transparent = false }: { transparent?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 ${
          transparent ? "bg-transparent" : "bg-black border-b border-white/10"
        }`}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/ampmheartwhite.png"
            alt="AM//PM Emo Night"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop nav — hidden on homepage (transparent mode) */}
        {!transparent && (
          <nav className="hidden md:flex items-center gap-8">
            <NavLinks />
          </nav>
        )}

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8"
          onClick={() => setMenuOpen(false)}
        >
          <NavLinks mobile onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </>
  );
}

function NavLinks({ mobile, onClick }: { mobile?: boolean; onClick?: () => void }) {
  const cls = mobile
    ? "text-3xl font-bold uppercase tracking-widest text-white hover:text-[#fe5859] transition-colors"
    : "text-sm font-semibold uppercase tracking-widest text-white hover:text-[#fe5859] transition-colors";

  return (
    <>
      <Link href="/events" className={cls} onClick={onClick}>Events</Link>
      <Link href="/photos" className={cls} onClick={onClick}>Photos</Link>
      <a href="https://www.ampmemonight.com/collections/all" target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>Merch</a>
    </>
  );
}
