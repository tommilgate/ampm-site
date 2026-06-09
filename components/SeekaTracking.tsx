import Script from "next/script";

// Seeka tracking — Custom Website source (generated from the Seeka dashboard).
// beforeInteractive loads it in the <head> ahead of all other scripts, on every page.
// The org/instance/key are public client-side SDK identifiers (by design, like a pixel id).
export default function SeekaTracking() {
  return <Script src="/seeka.js" strategy="beforeInteractive" />;
}
