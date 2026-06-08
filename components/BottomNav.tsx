"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { label: "EVENTS", href: "/events" },
  { label: "PHOTOS", href: "/photos" },
  { label: "MERCH", href: "https://www.ampmemonight.com/collections/all", external: true },
];

export default function BottomNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        style={{
          position: "fixed",
          bottom: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "30px",
          padding: "16px 40px",
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          transition: "all 0.3s ease",
        }}
      >
        <span style={{
          color: "#ffffff",
          fontSize: "18px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "2px",
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

          {/* Glass card */}
          <div
            style={{
              position: "relative",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "20px",
              padding: "40px",
              minWidth: "300px",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <nav>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {links.map((link) => {
                  const itemStyle: React.CSSProperties = {
                    display: "block",
                    padding: "18px 24px",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "20px",
                    fontWeight: 500,
                    textAlign: "center",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    backdropFilter: "blur(10px)",
                  };
                  return (
                    <li key={link.label} style={{ marginBottom: "10px" }}>
                      {link.external ? (
                        <a
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
