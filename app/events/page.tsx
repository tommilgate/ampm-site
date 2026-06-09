import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // always show the latest events

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { enabled: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#000" }}>
      {/* Minimal top logo, links home */}
      <header className="w-full flex justify-center py-6">
        <Link href="/" aria-label="Home">
          <Image src="/ampmheartwhite.png" alt="AM//PM" width={38} height={38} className="object-contain" priority />
        </Link>
      </header>

      <main className="flex-1 w-full max-w-[680px] mx-auto px-4 pt-4 pb-40">
        <h1
          style={{
            fontFamily: "var(--font-tinos), 'Times New Roman', serif",
            fontSize: "clamp(30px, 9vw, 46px)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            textAlign: "center",
            color: "#fff",
            margin: "8px 0 28px",
          }}
        >
          Upcoming Events
        </h1>

        {events.length === 0 ? (
          <p className="text-center text-white/40 uppercase tracking-widest text-sm py-20">
            No events announced right now — check back soon.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {events.map((event) => (
              <article
                key={event.id}
                className="ev-card"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 18,
                  padding: "22px 22px 22px 26px",
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {/* coral accent edge */}
                <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "var(--color-accent)" }} />

                {/* Date */}
                <div
                  style={{
                    display: "inline-block",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: "var(--color-date-text)",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "5px 12px",
                    borderRadius: 999,
                    marginBottom: 14,
                  }}
                >
                  {event.date}
                </div>

                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ minWidth: 0 }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-jost), sans-serif",
                        fontSize: "clamp(20px, 6vw, 26px)",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        color: "#fff",
                        lineHeight: 1.05,
                        margin: "0 0 6px",
                      }}
                    >
                      {event.city}
                    </h2>
                    <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#e7e7e7", margin: "0 0 2px" }}>
                      {event.venue}
                    </p>
                    {event.supports && (
                      <p style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: 0 }}>
                        {event.supports}
                      </p>
                    )}
                  </div>

                  {/* CTAs */}
                  <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                    {event.rsvpUrl && (
                      <a
                        href={event.rsvpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                          color: "#fff", padding: "12px 18px", borderRadius: 10,
                          border: "1px solid rgba(255,255,255,0.25)", whiteSpace: "nowrap",
                        }}
                      >
                        RSVP
                      </a>
                    )}
                    {event.ticketsUrl && (
                      <a
                        href={event.ticketsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase",
                          color: "#fff", padding: "12px 22px", borderRadius: 10,
                          background: "var(--color-accent)", whiteSpace: "nowrap",
                          boxShadow: "0 4px 16px rgba(254,88,89,0.35)",
                        }}
                      >
                        Tickets
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <BottomNav persistent />
    </div>
  );
}
