import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { enabled: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#000" }}>
      <Header />

      <main className="flex-1 w-full max-w-[820px] mx-auto px-4 pt-28 pb-20">
        {events.length === 0 ? (
          <p className="text-center text-white/40 uppercase tracking-widest text-sm py-20">
            No events announced right now — check back soon.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {events.map((event) => (
              <article
                key={event.id}
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16,
                  padding: 18,
                }}
              >
                {/* Full-width date bar */}
                <div
                  style={{
                    background: "#1c1c1c",
                    borderRadius: 8,
                    padding: "13px 18px",
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 500,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    marginBottom: 18,
                  }}
                >
                  {event.date}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                  <div style={{ minWidth: 0 }}>
                    <h2
                      style={{
                        fontSize: "clamp(22px, 6vw, 28px)",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        color: "#fff",
                        lineHeight: 1.1,
                        margin: "0 0 8px",
                      }}
                    >
                      {event.city}
                    </h2>
                    <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", color: "#f0f0f0", margin: "0 0 4px" }}>
                      {event.venue}
                    </p>
                    {event.supports && (
                      <p style={{ fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: "#888", margin: 0 }}>
                        {event.supports}
                      </p>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                    {event.rsvpUrl && (
                      <a
                        href={event.rsvpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                          color: "#fff", padding: "14px 20px", borderRadius: 8,
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
                          fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                          color: "#fff", padding: "14px 26px", borderRadius: 8,
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
    </div>
  );
}
