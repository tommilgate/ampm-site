import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-[820px] mx-auto px-4 py-24 pb-32">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-white mb-8">
          Photos
        </h1>
        <p className="text-[#cfcfcf]">Albums coming soon.</p>
      </main>
      <BottomNav />
    </div>
  );
}
