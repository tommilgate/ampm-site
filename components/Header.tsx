"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 grid grid-cols-3 items-center px-6 py-4 bg-black/95 backdrop-blur border-b border-white/10">
        {/* Left — hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex flex-col gap-1.5 p-1 justify-self-start"
          aria-label="Open menu"
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
        </button>

        {/* Center — heart logo */}
        <Link href="/" className="justify-self-center" aria-label="Home">
          <Image src="/ampmheartwhite.png" alt="AM//PM" width={34} height={34} className="object-contain" priority />
        </Link>

        {/* Right — cart (Shopify) */}
        <a
          href="https://ampmemonight.shop/cart"
          target="_blank"
          rel="noopener noreferrer"
          className="justify-self-end p-1"
          aria-label="Cart"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </a>
      </header>

      {/* Full-screen menu drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/97 flex flex-col items-center justify-center gap-10"
          onClick={() => setMenuOpen(false)}
        >
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="absolute top-5 right-6 text-white text-3xl leading-none">×</button>
          <NavLinks onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </>
  );
}

function NavLinks({ onClick }: { onClick?: () => void }) {
  const cls = "text-3xl font-extrabold uppercase tracking-widest text-white hover:text-[#fe5859] transition-colors";
  return (
    <>
      <Link href="/events" className={cls} onClick={onClick}>Events</Link>
      <a href="https://ampmemonight.shop/pages/photos" target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>Photos</a>
      <a href="https://ampmemonight.shop/collections/all" target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>Merch</a>
    </>
  );
}
