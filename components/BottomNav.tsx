"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const links = [
  { label: "EVENTS", href: "/events" },
  { label: "PHOTOS", href: "https://ampmemonight.shop/pages/photos", external: true },
  { label: "MERCH", href: "https://ampmemonight.shop/collections/all", external: true },
];

const CLOSE_MS = 180;

export default function BottomNav({ persistent = false }: { persistent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  // Prefetch the events route so tapping EVENTS is instant.
  useEffect(() => {
    router.prefetch("/events");
  }, [router]);

  // Animated close: play the out animation, then unmount.
  const close = useCallback(() => {
    setClosing(true);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, CLOSE_MS);
  }, []);

  // Open must cancel any in-flight close, otherwise a pending close timer
  // immediately shuts a freshly-opened menu (the "click twice" bug).
  const openMenu = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosing(false);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [close]);

  // The floating MENU fades out once you scroll down, on every page,
  // so it never sits over content/footer mid-scroll.
  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Trigger button — liquid-glass pill */}
      <button
        id="nav-menu-trigger"
        className="menu-pill"
        onClick={openMenu}
        aria-label="Open menu"
        aria-expanded={open}
        style={{
          bottom: persistent ? "24px" : "15%",
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? "none" : "auto",
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

      {/* Popup overlay — click-through while closing so the pill is immediately tappable */}
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
            pointerEvents: closing ? "none" : "auto",
          }}
        >
          {/* Backdrop */}
          <div
            className={`menu-backdrop${closing ? " closing" : ""}`}
            onClick={close}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* Glass card — crystal panel */}
          <div
            className={`menu-card${closing ? " closing" : ""}`}
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
                          className="menu-row"
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={itemStyle}
                          onClick={close}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          id={linkId}
                          className="menu-row"
                          href={link.href}
                          style={itemStyle}
                          onClick={close}
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
