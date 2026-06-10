"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

// Seeka tracking — Custom Website source (generated from the Seeka dashboard).
// Loads ONLY on public-facing pages. The admin / back-office (/admin*) is excluded
// so internal usage never pollutes audience/attribution data.
// The org/instance/key are public client-side SDK identifiers (by design, like a pixel id).
export default function SeekaTracking() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  // lazyOnload: starts after hydration, so Seeka's DOM tagging (data-sk-view-layout-binded)
  // can't race React and trigger hydration mismatches.
  return <Script src="/seeka.js" strategy="lazyOnload" />;
}
