"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener("canplay", tryPlay, { once: true });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/*
        Hero is transparent — the fixed texture (in layout, z-index -1) shows through
        behind it. The video blends against that STATIONARY texture with screen mode,
        so scrolling the page reveals the blend effect dynamically.
      */}
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          mixBlendMode: "screen",
          // Promote the blended video to its own GPU layer to reduce scroll repaint cost
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        <source src="/Video.webm" type="video/webm" />
        <source src="/Video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
