import { prisma } from "@/lib/prisma";
import { isAuthed, login, logout, addEvent, getHero, uploadHero, removeHero } from "./actions";
import AdminEventsList from "@/components/AdminEventsList";
import { isPast } from "@/lib/dates";

export const dynamic = "force-dynamic";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 13px", borderRadius: 8, background: "#111",
  border: "1px solid #2a2a2a", color: "#fff", fontSize: 14, outline: "none",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: 1,
  color: "#888", marginBottom: 6,
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; added?: string; updated?: string; hero?: string }>;
}) {
  const authed = await isAuthed();
  const sp = await searchParams;

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "var(--font-jost), sans-serif" }}>
        <form id="admin-login-form" action={login} style={{ width: "100%", maxWidth: 340 }}>
          <h1 style={{ fontSize: 20, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>AM//PM Admin</h1>
          <p style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>Enter the admin password.</p>
          <input id="admin-login-password" name="password" type="password" placeholder="Password" style={inputStyle} autoFocus />
          {sp.error && <p style={{ color: "#fe5859", fontSize: 12, marginTop: 8 }}>Incorrect password.</p>}
          <button id="admin-login-submit" type="submit" style={{ width: "100%", marginTop: 14, padding: "12px", borderRadius: 8, background: "#fe5859", color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, fontSize: 13, border: "none", cursor: "pointer" }}>
            Log in
          </button>
        </form>
      </div>
    );
  }

  const events = await prisma.event.findMany({ orderBy: { order: "asc" } });
  const heroUrl = (await getHero())?.url ?? null;

  // Per-event click counts (first-party tracking)
  const clickGroups = await prisma.click.groupBy({ by: ["eventId", "kind"], _count: { _all: true } });
  const clicksByEvent: Record<number, { ticket: number; rsvp: number }> = {};
  for (const g of clickGroups) {
    if (g.eventId == null) continue;
    clicksByEvent[g.eventId] ??= { ticket: 0, rsvp: 0 };
    if (g.kind === "ticket") clicksByEvent[g.eventId].ticket = g._count._all;
    if (g.kind === "rsvp") clicksByEvent[g.eventId].rsvp = g._count._all;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "32px 20px 80px", fontFamily: "var(--font-jost), sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: 20, textTransform: "uppercase", letterSpacing: 2 }}>Events Admin</h1>
          <form id="admin-logout-form" action={logout}>
            <button id="admin-logout-submit" type="submit" style={{ background: "none", border: "1px solid #333", color: "#888", padding: "6px 12px", borderRadius: 6, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, cursor: "pointer" }}>Log out</button>
          </form>
        </div>

        {/* Events page hero image */}
        <section style={{ background: "#0c0c0c", border: "1px solid #1e1e1e", borderRadius: 14, padding: 22, marginBottom: 24 }}>
          <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 2, marginBottom: 6, color: "#fe5859" }}>Events page hero image</h2>
          <p style={{ color: "#888", fontSize: 12, marginBottom: 16 }}>Shown at the top of the events page. Upload an image file.</p>
          {sp.hero && <p style={{ color: "#4ade80", fontSize: 13, marginBottom: 12 }}>✓ Hero image updated.</p>}

          {heroUrl && (
            <div style={{ marginBottom: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroUrl} alt="Current hero" style={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 10, display: "block" }} />
            </div>
          )}

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <form id="admin-hero-upload-form" action={uploadHero} style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <input id="admin-hero-file" type="file" name="file" accept="image/*" required style={{ color: "#ccc", fontSize: 13 }} />
              <button id="admin-hero-upload-submit" type="submit" style={{ padding: "10px 20px", borderRadius: 8, background: "#fe5859", color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, fontSize: 12, border: "none", cursor: "pointer" }}>
                {heroUrl ? "Replace" : "Upload"}
              </button>
            </form>
            {heroUrl && (
              <form id="admin-hero-remove-form" action={removeHero}>
                <button id="admin-hero-remove-submit" type="submit" style={{ padding: "10px 16px", borderRadius: 8, background: "none", border: "1px solid #4a1f1f", color: "#fe5859", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, fontSize: 12, cursor: "pointer" }}>
                  Remove
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Add event form */}
        <section style={{ background: "#0c0c0c", border: "1px solid #1e1e1e", borderRadius: 14, padding: 22, marginBottom: 32 }}>
          <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 2, marginBottom: 18, color: "#fe5859" }}>Add an event</h2>
          {sp.added && <p style={{ color: "#4ade80", fontSize: 13, marginBottom: 14 }}>✓ Event added.</p>}
          <form id="admin-add-event-form" action={addEvent} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={labelStyle}>Date label *</label>
              <input id="admin-add-event-date" name="date" placeholder="SATURDAY JUNE 13TH" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Event date * (auto-hides when past)</label>
              <input id="admin-add-event-startdate" name="startDate" type="date" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>City / Title *</label>
              <input id="admin-add-event-city" name="city" placeholder="EMO NIGHT MELBOURNE" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Venue *</label>
              <input id="admin-add-event-venue" name="venue" placeholder="STAY GOLD" style={inputStyle} required />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Support acts</label>
              <input id="admin-add-event-supports" name="supports" placeholder="WITH NIGHTLIGHT + CLOSURE" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Tickets URL</label>
              <input id="admin-add-event-tickets" name="ticketsUrl" placeholder="https://tickets.oztix..." style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>RSVP URL</label>
              <input id="admin-add-event-rsvp" name="rsvpUrl" placeholder="https://facebook.com/events/..." style={inputStyle} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#ccc" }}>
                <input id="admin-add-event-soldout" name="soldOut" type="checkbox" style={{ width: 16, height: 16 }} />
                Mark as <strong style={{ color: "#fff" }}>Sold Out</strong> (shows a SOLD OUT badge instead of Tickets)
              </label>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <button id="admin-add-event-submit" type="submit" style={{ padding: "12px 28px", borderRadius: 8, background: "#fe5859", color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, fontSize: 13, border: "none", cursor: "pointer" }}>
                Add event
              </button>
            </div>
          </form>
        </section>

        {/* Existing events — draggable */}
        <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 2, marginBottom: 14, color: "#888" }}>
          Current events ({events.length})
        </h2>
        {sp.updated && <p style={{ color: "#4ade80", fontSize: 13, marginBottom: 12 }}>✓ Event updated.</p>}
        <AdminEventsList
          initial={events.map((e) => ({
            id: e.id, date: e.date, city: e.city, venue: e.venue, supports: e.supports, enabled: e.enabled,
            past: isPast(e.startDate), soldOut: e.soldOut,
            ticketClicks: clicksByEvent[e.id]?.ticket ?? 0,
            rsvpClicks: clicksByEvent[e.id]?.rsvp ?? 0,
          }))}
        />
      </div>
    </div>
  );
}
