"use client";

export default function HeroVideo({ videoSrc }: { videoSrc: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ mixBlendMode: "screen" }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
