import HeroVideo from "@/components/HeroVideo";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-col">
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
