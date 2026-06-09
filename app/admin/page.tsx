import { prisma } from "@/lib/prisma";
import { isAuthed, login, logout, addEvent, deleteEvent, toggleEvent } from "./actions";

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
  searchParams: Promise<{ error?: string; added?: string }>;
}) {
  const authed = await isAuthed();
  const sp = await searchParams;

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "var(--font-jost), sans-serif" }}>
        <form action={login} style={{ width: "100%", maxWidth: 340 }}>
          <h1 style={{ fontSize: 20, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>AM//PM Admin</h1>
          <p style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>Enter the admin password.</p>
          <input name="password" type="password" placeholder="Password" style={inputStyle} autoFocus />
          {sp.error && <p style={{ color: "#fe5859", fontSize: 12, marginTop: 8 }}>Incorrect password.</p>}
          <button type="submit" style={{ width: "100%", marginTop: 14, padding: "12px", borderRadius: 8, background: "#fe5859", color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, fontSize: 13, border: "none", cursor: "pointer" }}>
            Log in
          </button>
        </form>
      </div>
    );
  }

  const events = await prisma.event.findMany({ orderBy: { order: "asc" } });

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "32px 20px 80px", fontFamily: "var(--font-jost), sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: 20, textTransform: "uppercase", letterSpacing: 2 }}>Events Admin</h1>
          <form action={logout}>
            <button type="submit" style={{ background: "none", border: "1px solid #333", color: "#888", padding: "6px 12px", borderRadius: 6, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, cursor: "pointer" }}>Log out</button>
          </form>
        </div>

        {/* Add event form */}
        <section style={{ background: "#0c0c0c", border: "1px solid #1e1e1e", borderRadius: 14, padding: 22, marginBottom: 32 }}>
          <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 2, marginBottom: 18, color: "#fe5859" }}>Add an event</h2>
          {sp.added && <p style={{ color: "#4ade80", fontSize: 13, marginBottom: 14 }}>✓ Event added.</p>}
          <form action={addEvent} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Date *</label>
              <input name="date" placeholder="SATURDAY JUNE 13TH" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>City / Title *</label>
              <input name="city" placeholder="EMO NIGHT MELBOURNE" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Venue *</label>
              <input name="venue" placeholder="STAY GOLD" style={inputStyle} required />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Support acts</label>
              <input name="supports" placeholder="WITH NIGHTLIGHT + CLOSURE" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Tickets URL</label>
              <input name="ticketsUrl" placeholder="https://tickets.oztix..." style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>RSVP URL</label>
              <input name="rsvpUrl" placeholder="https://facebook.com/events/..." style={inputStyle} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <button type="submit" style={{ padding: "12px 28px", borderRadius: 8, background: "#fe5859", color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, fontSize: 13, border: "none", cursor: "pointer" }}>
                Add event
              </button>
            </div>
          </form>
        </section>

        {/* Existing events */}
        <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 2, marginBottom: 14, color: "#888" }}>
          Current events ({events.length})
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {events.map((e) => (
            <div key={e.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: "#0c0c0c", border: "1px solid #1e1e1e", borderRadius: 12, padding: "14px 16px", opacity: e.enabled ? 1 : 0.5 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 11, color: "#fe5859", letterSpacing: 1, textTransform: "uppercase" }}>{e.date}</div>
                <div style={{ fontSize: 15, fontWeight: 700, textTransform: "uppercase" }}>{e.city}</div>
                <div style={{ fontSize: 12, color: "#999" }}>{e.venue}{e.supports ? ` · ${e.supports}` : ""}</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <form action={toggleEvent}>
                  <input type="hidden" name="id" value={e.id} />
                  <input type="hidden" name="enabled" value={String(e.enabled)} />
                  <button type="submit" style={{ background: "none", border: "1px solid #333", color: "#aaa", padding: "7px 11px", borderRadius: 6, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, cursor: "pointer", whiteSpace: "nowrap" }}>
                    {e.enabled ? "Hide" : "Show"}
                  </button>
                </form>
                <form action={deleteEvent}>
                  <input type="hidden" name="id" value={e.id} />
                  <button type="submit" style={{ background: "none", border: "1px solid #4a1f1f", color: "#fe5859", padding: "7px 11px", borderRadius: 6, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, cursor: "pointer" }}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
          {events.length === 0 && <p style={{ color: "#666", fontSize: 13 }}>No events yet — add one above.</p>}
        </div>
      </div>
    </div>
  );
}
