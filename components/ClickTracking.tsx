"use client";

import { useEffect } from "react";

type ConvergeWindow = Window & {
  Converge?: { track?: { custom?: (name: string, props?: Record<string, unknown>) => void } };
};

// Single delegated click listener for outbound tracking (Tickets / RSVP).
//
// WHY delegated instead of per-link onClick handlers: the ticket links are plain
// server-rendered <a> tags (NOT client components), so React never hydrates/reconciles
// them. That keeps Seeka's cross-domain decoration handler (bound early via
// beforeInteractive) attached to the anchor — which is what appends sk.pid/sk.fbp/etc
// to the Oztix URL. A per-link React onClick would force hydration of the anchor and
// detach Seeka's handler intermittently (the recurring "sk.* missing" bug).
//
// This listener NEVER touches the href or calls preventDefault — it only fires our own
// Seeka custom event + first-party beacon and lets the click proceed, so Seeka's handler
// still runs and decorates the URL.
export default function ClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a[data-track]") as HTMLAnchorElement | null;
      if (!a) return;

      const eventName = a.dataset.track!;
      const eventId = a.dataset.eventId ? Number(a.dataset.eventId) : undefined;

      // 1) Seeka custom event → GA4 / Meta / TikTok + ampm-insights
      try {
        (window as ConvergeWindow).Converge?.track?.custom?.(eventName, {
          event_id: eventId,
          event_name: a.dataset.eventName,
          venue: a.dataset.venue,
          url: a.href,
        });
      } catch {
        /* ignore */
      }

      // 2) First-party click record (feeds /api/stats). sendBeacon survives navigation.
      try {
        const payload = JSON.stringify({ kind: a.dataset.kind ?? eventName, eventId });
        if (navigator.sendBeacon) {
          navigator.sendBeacon("/api/track-click", new Blob([payload], { type: "application/json" }));
        } else {
          fetch("/api/track-click", {
            method: "POST",
            body: payload,
            keepalive: true,
            headers: { "Content-Type": "application/json" },
          });
        }
      } catch {
        /* ignore */
      }
    };

    // capture phase: runs regardless of other handlers, never interferes with Seeka
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
