"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React sometimes drops the `muted` attribute; set it explicitly so autoplay works
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener("canplay", tryPlay, { once: true });
  }, []);

  return (
    <div className="absolute inset-0">
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
        }}
      >
        <source src="/Video.webm" type="video/webm" />
        <source src="/Video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
