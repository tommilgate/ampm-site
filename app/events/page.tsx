import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { getSetting } from "@/app/admin/actions";

// Cached/ISR: served instantly from cache. The admin actions call revalidatePath("/events")
// on every add/edit/delete/reorder/hero change, so it regenerates with fresh data on edits.
// The 300s window is a self-healing fallback.
export const revalidate = 300;

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { enabled: true },
    orderBy: { order: "asc" },
  });
  const heroUrl = await getSetting("eventsHeroUrl");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#000" }}>
      {/* Centered logo, links home */}
      <header className="w-full flex justify-center pt-7 pb-2">
        <Link id="events-logo-home" href="/" aria-label="Home">
          <Image src="/ampmheartwhite.png" alt="AM//PM" width={30} height={30} className="object-contain" priority />
        </Link>
      </header>

      <main className="flex-1 w-full max-w-[480px] mx-auto px-4 pt-3 pb-36">
        {/* Page hero image */}
        {heroUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroUrl}
            alt="AM//PM Emo Night"
            style={{ width: "100%", borderRadius: 14, display: "block", marginBottom: 18 }}
          />
        )}

        {events.length === 0 ? (
          <p className="text-center text-white/40 uppercase tracking-widest text-xs py-20">
            No events announced right now — check back soon.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {events.map((event) => (
              <article
                key={event.id}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14,
                  padding: 12,
                }}
              >
                {/* Date bar */}
                <div
                  style={{
                    background: "#1c1c1c",
                    borderRadius: 7,
                    padding: "8px 12px",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  {event.date}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <h2
                      style={{
                        fontSize: "clamp(14px, 3.8vw, 16px)",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: 0.3,
                        color: "#fff",
                        lineHeight: 1.1,
                        margin: "0 0 5px",
                      }}
                    >
                      {event.city}
                    </h2>
                    <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.3, textTransform: "uppercase", color: "#efefef", margin: "0 0 3px" }}>
                      {event.venue}
                    </p>
                    {event.supports && (
                      <p style={{ fontSize: 11, letterSpacing: 0.8, textTransform: "uppercase", color: "#888", margin: 0 }}>
                        {event.supports}
                      </p>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    {event.rsvpUrl && (
                      <a
                        id={`event-rsvp-${event.id}`}
                        href={event.rsvpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
                          color: "#fff", padding: "10px 14px", borderRadius: 7,
                          border: "1px solid rgba(255,255,255,0.25)", whiteSpace: "nowrap",
                        }}
                      >
                        RSVP
                      </a>
                    )}
                    {event.ticketsUrl && (
                      <a
                        id={`event-tickets-${event.id}`}
                        href={event.ticketsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
                          color: "#fff", padding: "10px 18px", borderRadius: 7,
                          background: "var(--color-accent)", whiteSpace: "nowrap",
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

      <Footer dark />
      <BottomNav persistent />
    </div>
  );
}
