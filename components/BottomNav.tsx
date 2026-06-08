"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "EVENTS", href: "/events" },
  { label: "PHOTOS", href: "/photos" },
  { label: "MERCH", href: "https://www.ampmemonight.com/collections/all", external: true },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-3 p-4 pb-safe">
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
      >
        {links.map((link) => {
          const isActive = !link.external && pathname === link.href;
          return link.external ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold uppercase tracking-widest text-white px-5 py-3 rounded-xl transition-colors"
              style={{ background: isActive ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)" }}
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-widest text-white px-5 py-3 rounded-xl transition-colors"
              style={{ background: isActive ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)" }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
