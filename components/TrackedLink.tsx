"use client";

import { useEffect, useState } from "react";
import { TRACKED_PARAMS, saveTrackedParams, loadTrackedParams } from "@/lib/attribution";

type ConvergeWindow = Window & {
  Converge?: { track?: { custom?: (name: string, props?: Record<string, unknown>) => void } };
};

function readCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
  );
  return m ? decodeURIComponent(m[1]) : "";
}

// Carry Meta / UTM click identifiers onto an outbound (cross-domain) ticket link
// so Oztix + Seeka can attach them to the Purchase event. Without this, the
// Facebook click id (fbc) is lost at the domain handoff and Meta can't do
// click-through attribution — which is the whole reason attribution looked broken.
function withClickIds(rawHref: string): string {
  try {
    const url = new URL(rawHref, window.location.href);
    // Only touch cross-origin links (e.g. tickets.oztix.com.au) — internal links don't need it.
    if (url.origin === window.location.origin) return rawHref;

    const here = new URLSearchParams(window.location.search);
    const stored = loadTrackedParams();

    // Pass through UTMs + platform click ids — current URL first, then the
    // first-touch values saved when the visitor originally landed.
    for (const k of TRACKED_PARAMS) {
      const v = here.get(k) || stored[k];
      if (v && !url.searchParams.has(k)) url.searchParams.set(k, v);
    }

    // Meta click cookie (_fbc): persists ~90 days, set by the pixel from the fbclid.
    // This is what survives "saw ad → came back later on the same device". If the
    // cookie isn't set yet, build a valid fbc from a fresh fbclid in the URL.
    let fbc = readCookie("_fbc");
    const fbclid = here.get("fbclid") || stored["fbclid"];
    if (!fbc && fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
    if (fbc && !url.searchParams.has("fbc")) url.searchParams.set("fbc", fbc);

    // Meta browser cookie (_fbp) — helps match even without a click id.
    const fbp = readCookie("_fbp");
    if (fbp && !url.searchParams.has("fbp")) url.searchParams.set("fbp", fbp);

    return url.toString();
  } catch {
    return rawHref;
  }
}

export default function TrackedLink({
  event,
  properties,
  eventId,
  kind,
  children,
  ...anchorProps
}: {
  event: string;
  properties?: Record<string, unknown>;
  eventId?: number;
  kind?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  // Start with the raw href (SSR-safe), then augment on the client once cookies
  // and URL params are available. Falls back to raw href if anything goes wrong.
  const [href, setHref] = useState(anchorProps.href);
  useEffect(() => {
    saveTrackedParams(); // capture first-touch UTMs/click ids before they're lost to internal nav
    if (anchorProps.href) setHref(withClickIds(anchorProps.href));
  }, [anchorProps.href]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Belt-and-suspenders: re-augment at click time in case the pixel set _fbc
    // after mount. Idempotent — won't double-append.
    try {
      const a = e.currentTarget;
      if (a.href) a.href = withClickIds(a.href);
    } catch {
      /* ignore */
    }
    // 1) Fire to Seeka (feeds Seeka → ampm-insights + any connected pixels)
    try {
      const w = window as ConvergeWindow;
      w.Converge?.track?.custom?.(event, properties);
    } catch {
      /* ignore */
    }
    // 2) Record a first-party click in our own DB (owned, verifiable data).
    //    sendBeacon survives the page opening the ticketing tab.
    try {
      const payload = JSON.stringify({ kind: kind ?? event, eventId });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track-click", new Blob([payload], { type: "application/json" }));
      } else {
        fetch("/api/track-click", { method: "POST", body: payload, keepalive: true, headers: { "Content-Type": "application/json" } });
      }
    } catch {
      /* ignore */
    }
  };

  return (
    <a {...anchorProps} href={href} onClick={onClick}>
      {children}
    </a>
  );
}
