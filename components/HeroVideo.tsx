"use client";

export default function HeroVideo({
  videoSrc,
  backgroundSrc,
}: {
  videoSrc: string;
  backgroundSrc: string;
}) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
