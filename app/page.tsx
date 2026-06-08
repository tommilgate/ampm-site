import HeroVideo from "@/components/HeroVideo";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export default function HomePage() {
  return (
    <main className="relative w-full" style={{ height: "100dvh" }}>
      <Header transparent />
      <HeroVideo
        videoSrc="/Video.mp4"
        backgroundSrc="/BACKGROUND_1.png"
      />
      <BottomNav />
    </main>
  );
}
