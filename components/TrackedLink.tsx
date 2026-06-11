"use client";

type ConvergeWindow = Window & {
  Converge?: { track?: { custom?: (name: string, props?: Record<string, unknown>) => void } };
};

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
  const onClick = () => {
    // 1) Fire the Seeka event (feeds Seeka → GA4 / Meta / TikTok + ampm-insights).
    //
    //    IMPORTANT: we deliberately do NOT rewrite the href here. Seeka performs its
    //    own cross-domain decoration on the click — appending sk.pid / sk.sid / sk.fbp
    //    (Meta) / sk.ttp (TikTok) / sk.gacl / sk.gases / _gl (GA) to the Oztix URL.
    //    Any manual href mutation clobbers that decorated URL and breaks attribution.
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
    <a {...anchorProps} onClick={onClick}>
      {children}
    </a>
  );
}
