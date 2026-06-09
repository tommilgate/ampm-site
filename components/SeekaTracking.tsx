"use client";

import Script from "next/script";

// Seeka identity / analytics tracking (migrated from the old Shopify theme).
// The org/instance/key are public client-side SDK identifiers (by design, like a pixel id).
export default function SeekaTracking() {
  return (
    <Script
      src="/seeka-loader.js"
      strategy="afterInteractive"
      onLoad={() => {
        const w = window as unknown as {
          SeekaInstall?: (cfg: unknown) => void;
        };
        if (typeof w.SeekaInstall === "function") {
          w.SeekaInstall({
            extraParams: "&vo=latest",
            hosts: [],
            instances: [
              {
                org: "8262f619178281744fd03a0c4f5b9534",
                id: "328f2630072d370d43923a141d5bc286",
                key: "sdkr_Q2ZESjhJQlIzYnhzSE4xQW9Hci1kc3JfODBna3hDX1NFRjRFZUt3VV80Mm9feUlUZlEzUzViaUJWanlaaUpMYlI2OVNKMkhOUVlDcHFEbDVNbWtBNHh2cFQxREVTdEs2eVVvVWsxN3Zta2puRlF1T1REUVJxSmkybWJxMjdwb3NHdm5kU3ZKWG13UEZBUzg5NG1adll3XzdFanhSSzFuZXF6VHZJWExJS3lEeHJ4VjU",
              },
            ],
          });
        }
      }}
    />
  );
}
