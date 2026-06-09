import Script from "next/script";

// Seeka tracking — Custom Website source (generated from the Seeka dashboard).
// beforeInteractive loads it in the <head> ahead of all other scripts, on every page.
// The org/instance/key are public client-side SDK identifiers (by design, like a pixel id).
export default function SeekaTracking() {
  // beforeInteractive in the root layout is the correct App Router pattern for a
  // head-level pixel; the lint rule below predates the App Router (false positive).
  // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
  return <Script src="/seeka.js" strategy="beforeInteractive" />;
}
