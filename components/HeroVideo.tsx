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
      {/* Texture sits behind the video, inside the hero (scrolls with it). */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/BACKGROUND_1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Video blends against the texture above with screen mode. */}
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
