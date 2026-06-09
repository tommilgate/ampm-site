"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { label: "EVENTS", href: "/events" },
  { label: "PHOTOS", href: "https://store.ampmemonight.com/pages/photos", external: true },
  { label: "MERCH", href: "https://store.ampmemonight.com/collections/all", external: true },
];

export default function BottomNav({ persistent = false }: { persistent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // On the homepage the floating MENU fades out once you scroll past the hero so it
  // never overlaps the footer. On inner pages (persistent) it stays visible.
  useEffect(() => {
    if (persistent) return;
    const onScroll = () => setHidden(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [persistent]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Trigger button — Option A liquid-glass pill */}
      <button
        id="nav-menu-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        style={{
          position: "fixed",
          bottom: persistent ? "24px" : "15%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          background: "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: "30px",
          padding: "16px 40px",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? "none" : "auto",
          transition: "all 0.3s ease",
        }}
      >
        <span style={{
          color: "#ffffff",
          fontSize: "18px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "3px",
          margin: 0,
        }}>
          MENU
        </span>
      </button>

      {/* Popup overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: "8%",
            opacity: 1,
            transition: "opacity 0.3s ease",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* Glass card — Option B crystal panel */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(18px) saturate(160%)",
              WebkitBackdropFilter: "blur(18px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.35)",
              borderRadius: "16px",
              minWidth: "300px",
              maxWidth: "440px",
              width: "86%",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            }}
          >
            {/* Corner light-glow sheen */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -50,
                left: -50,
                width: 220,
                height: 220,
                background: "radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <nav>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, position: "relative" }}>
                {links.map((link, i) => {
                  const itemStyle: React.CSSProperties = {
                    display: "block",
                    padding: "20px 28px",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "18px",
                    fontWeight: 600,
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "3px",
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
                  };
                  const linkId = `nav-menu-link-${link.label.toLowerCase()}`;
                  return (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          id={linkId}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={itemStyle}
                          onClick={() => setOpen(false)}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          id={linkId}
                          href={link.href}
                          style={itemStyle}
                          onClick={() => setOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
