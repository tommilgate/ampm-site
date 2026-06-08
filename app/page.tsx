import HeroVideo from "@/components/HeroVideo";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <div className="relative w-full" style={{ height: "100dvh" }}>
        <HeroVideo
          videoSrc="/Video.mp4"
          backgroundSrc="/BACKGROUND_1.png"
        />
        <BottomNav />
      </div>
      <Footer />
    </main>
  );
}
