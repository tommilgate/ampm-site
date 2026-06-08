"use client";

export default function HeroVideo({ videoSrc }: { videoSrc: string }) {
  return (
    <div className="absolute inset-0" style={{ isolation: "auto" }}>
      {/* Background image — fixed so it stays put while content scrolls over */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url(/BACKGROUND_1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Video blends with the background image above using screen mode */}
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
          zIndex: 1,
          mixBlendMode: "screen",
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
