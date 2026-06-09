"use client";

export default function HeroVideo({ videoSrc }: { videoSrc: string }) {
  return (
    <div className="absolute inset-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          mixBlendMode: "screen",
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
