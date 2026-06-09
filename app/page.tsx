import HeroVideo from "@/components/HeroVideo";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/*
        Fixed background texture — homepage only. Stays put while the page scrolls so
        the hero video's screen-blend reveal shifts as you scroll. z-index: -1 keeps it
        behind all content (incl. the footer's own opaque texture).
      */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100lvh",
          zIndex: -1,
          backgroundImage: "url(/BACKGROUND_1.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          pointerEvents: "none",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      />
      {/*
        100svh (small viewport height) stays CONSTANT as the mobile address bar
        hides/shows — unlike 100dvh, which resizes mid-scroll and causes the hero
        to "grow then snap back". This keeps the hero a fixed size while scrolling.
      */}
      <div className="relative w-full" style={{ height: "100svh" }}>
        <HeroVideo />
        <BottomNav />
      </div>
      <Footer />
    </main>
  );
}
