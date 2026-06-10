import Image from "next/image";

export default function EventsLoading() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#000" }}>
      <header className="w-full flex justify-center pt-7 pb-2">
        <Image src="/ampmheartwhite.png" alt="AM//PM" width={30} height={30} className="object-contain" priority />
      </header>

      <main className="flex-1 w-full max-w-[480px] mx-auto px-4 pt-3 pb-36">
        {/* Hero placeholder — square, matching the real hero so layout doesn't jump */}
        <div className="skeleton" style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 14, marginBottom: 18 }} />
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                background: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: 12,
              }}
            >
              {/* date bar */}
              <div className="skeleton" style={{ height: 34, marginBottom: 12 }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ height: 16, width: "70%", marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 12, width: "50%", marginBottom: 6 }} />
                  <div className="skeleton" style={{ height: 10, width: "40%" }} />
                </div>
                <div className="skeleton" style={{ height: 38, width: 78, borderRadius: 7 }} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
