import Script from "next/script";

// Seeka tracking — Custom Website source (generated from the Seeka dashboard).
//
// strategy="beforeInteractive": loads in <head> before the page is interactive — the
// same as the original Shopify install ("place before any other scripts"). This is
// REQUIRED for reliable cross-domain decoration: Seeka must be loaded and bound to the
// ticket links BEFORE the user can click them, otherwise the sk.* identity params
// (Meta/TikTok/GA handoff to Oztix) intermittently don't get appended. (lazyOnload loaded
// it during idle time, which raced fast clicks and dropped the sk.* params.)
//
// /admin is excluded inside seeka.js itself (the SeekaInstall call is guarded by pathname),
// so this can load unconditionally without a client-side route check.
//
// The org/instance/key are public client-side SDK identifiers (by design, like a pixel id).
export default function SeekaTracking() {
  // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
  return <Script src="/seeka.js" strategy="beforeInteractive" />;
}
