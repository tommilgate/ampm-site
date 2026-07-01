import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { getHero, getButtonColor } from "@/app/admin/actions";
import { auTodayCutoff } from "@/lib/dates";
import { normalizeHex, contrastText } from "@/lib/color";

// Cached/ISR: regenerated hourly (and on every admin edit via revalidatePath). The 1h
// window also re-evaluates the "past event" cutoff, so events drop off within an hour
// of their day ending.
export const revalidate = 3600;

export default async function EventsPage() {
  const cutoff = auTodayCutoff();
  const events = await prisma.event.findMany({
    where: {
      enabled: true,
      // Hide past events; events with no date set always show (legacy safety).
      OR: [{ startDate: null }, { startDate: { gte: cutoff } }],
    },
    orderBy: { order: "asc" },
  });
  const hero = await getHero();
  const btnColor = normalizeHex(await getButtonColor());
  const btnText = contrastText(btnColor);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#000" }}>
      {/* Centered logo, links home */}
      <header className="w-full flex justify-center pt-7 pb-2">
        <Link id="events-logo-home" href="/" aria-label="Home">
          <Image src="/ampmheartwhite.png" alt="AM//PM" width={30} height={30} className="object-contain" priority />
        </Link>
      </header>

      <main className="flex-1 w-full max-w-[480px] mx-auto px-4 pt-3 pb-12">
        {/* Page hero image — optimized via next/image with intrinsic dimensions (no layout shift) */}
        {hero && hero.width && hero.height ? (
          <Image
            src={hero.url}
            alt="AM//PM Emo Night"
            width={hero.width}
            height={hero.height}
            priority
            sizes="(max-width: 512px) 100vw, 480px"
            className="anim-fade-up"
            style={{ width: "100%", height: "auto", borderRadius: 14, display: "block", marginBottom: 18 }}
          />
        ) : hero ? (
          // Fallback for legacy hero values without stored dimensions
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.url}
            alt="AM//PM Emo Night"
            className="anim-fade-up"
            style={{ width: "100%", borderRadius: 14, display: "block", marginBottom: 18 }}
          />
        ) : null}

        {events.length === 0 ? (
          <p className="text-center text-white/40 uppercase tracking-widest text-xs py-20">
            No events announced right now — check back soon.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {events.map((event, i) => (
              <article
                key={event.id}
                className="anim-fade-up"
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14,
                  padding: 12,
                  // Staggered entrance, capped so long lists don't crawl
                  animationDelay: `${80 + Math.min(i, 6) * 70}ms`,
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
                    {event.soldOut ? (
                      <span
                        style={{
                          fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase",
                          color: "#bdbdbd", padding: "10px 16px", borderRadius: 7,
                          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.18)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Sold Out
                      </span>
                    ) : (
                      <>
                        {/* Plain server-rendered anchors — NO client component, so React
                            never hydrates them and Seeka's cross-domain decoration stays
                            attached. Tracking is handled by the delegated <ClickTracking />. */}
                        {event.rsvpUrl && (
                          <a
                            id={`event-rsvp-${event.id}`}
                            data-track="rsvp_click"
                            data-kind="rsvp"
                            data-event-id={event.id}
                            data-event-name={event.city}
                            data-venue={event.venue}
                            href={event.rsvpUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
                              color: btnColor, padding: "10px 14px", borderRadius: 7,
                              border: `1px solid ${btnColor}`, whiteSpace: "nowrap",
                            }}
                          >
                            RSVP
                          </a>
                        )}
                        {event.ticketsUrl && (
                          <a
                            id={`event-tickets-${event.id}`}
                            data-track="ticket_click"
                            data-kind="ticket"
                            data-event-id={event.id}
                            data-event-name={event.city}
                            data-venue={event.venue}
                            href={event.ticketsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
                              color: btnText, padding: "10px 18px", borderRadius: 7,
                              background: btnColor, whiteSpace: "nowrap",
                            }}
                          >
                            Tickets
                          </a>
                        )}
                      </>
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
