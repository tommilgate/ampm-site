import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

// Placeholder events — will come from DB once Neon is connected
const EVENTS = [
  {
    id: 1,
    date: "FRIDAY JUNE 13TH",
    city: "EMO NIGHT MELBOURNE",
    venue: "STAY GOLD | THE FINAL PARTY",
    supports: "NIGHTLIGHT + CLOSURE",
    rsvpUrl: "https://www.facebook.com/events/",
    ticketsUrl: "https://tickets.oztix.com.au/",
  },
  {
    id: 2,
    date: "FRIDAY JUNE 27TH",
    city: "EMO NIGHT SYDNEY",
    venue: "VENUE TBA",
    supports: null,
    rsvpUrl: null,
    ticketsUrl: null,
  },
  {
    id: 3,
    date: "FRIDAY JULY 4TH",
    city: "EMO NIGHT BRISBANE",
    venue: "VENUE TBA",
    supports: null,
    rsvpUrl: null,
    ticketsUrl: null,
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-[820px] mx-auto px-4 py-24 pb-32">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-white mb-8">
          Upcoming Events
        </h1>

        <div className="flex flex-col gap-4">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="border border-white/10 rounded-lg p-4 grid gap-3"
              style={{
                background: "var(--color-card)",
                gridTemplateColumns: "auto 1fr auto",
                alignItems: "center",
              }}
            >
              {/* Date pill */}
              <div
                className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap"
                style={{ background: "var(--color-date-bg)", color: "var(--color-date-text)" }}
              >
                {event.date}
              </div>

              {/* Text */}
              <div className="min-w-0 px-3">
                <p className="text-white font-bold uppercase tracking-wide text-sm truncate">{event.city}</p>
                <p className="text-[#cfcfcf] text-xs uppercase tracking-wide truncate">{event.venue}</p>
                {event.supports && (
                  <p className="text-[#cfcfcf] text-xs uppercase tracking-wide truncate">{event.supports}</p>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2 items-end">
                {event.rsvpUrl && (
                  <a
                    href={event.rsvpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-lg whitespace-nowrap"
                    style={{ background: "var(--color-date-bg)", color: "white" }}
                  >
                    RSVP
                  </a>
                )}
                {event.ticketsUrl && (
                  <a
                    href={event.ticketsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-lg whitespace-nowrap"
                    style={{ background: "var(--color-accent)", color: "white" }}
                  >
                    TICKETS
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
