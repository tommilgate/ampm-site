import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAuthed, updateEvent } from "../../actions";
import { toDateInputValue } from "@/lib/dates";

export const dynamic = "force-dynamic";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 13px", borderRadius: 8, background: "#111",
  border: "1px solid #2a2a2a", color: "#fff", fontSize: 14, outline: "none",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: 1,
  color: "#888", marginBottom: 6,
};

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAuthed())) redirect("/admin");

  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id: Number(id) } });
  if (!event) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "32px 20px 80px", fontFamily: "var(--font-jost), sans-serif" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, textTransform: "uppercase", letterSpacing: 2 }}>Edit Event</h1>
          <Link href="/admin" style={{ color: "#888", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, border: "1px solid #333", padding: "6px 12px", borderRadius: 6 }}>← Back</Link>
        </div>

        <form id="admin-edit-event-form" action={updateEvent} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, background: "#0c0c0c", border: "1px solid #1e1e1e", borderRadius: 14, padding: 22 }}>
          <input type="hidden" name="id" value={event.id} />

          <div>
            <label style={labelStyle}>Date label *</label>
            <input id="admin-edit-event-date" name="date" defaultValue={event.date} style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>Event date * (auto-hides when past)</label>
            <input id="admin-edit-event-startdate" name="startDate" type="date" defaultValue={toDateInputValue(event.startDate)} style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>City / Title *</label>
            <input id="admin-edit-event-city" name="city" defaultValue={event.city} style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>Venue *</label>
            <input id="admin-edit-event-venue" name="venue" defaultValue={event.venue} style={inputStyle} required />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Support acts</label>
            <input id="admin-edit-event-supports" name="supports" defaultValue={event.supports ?? ""} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Tickets URL</label>
            <input id="admin-edit-event-tickets" name="ticketsUrl" defaultValue={event.ticketsUrl ?? ""} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>RSVP URL</label>
            <input id="admin-edit-event-rsvp" name="rsvpUrl" defaultValue={event.rsvpUrl ?? ""} style={inputStyle} />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#ccc" }}>
              <input id="admin-edit-event-soldout" name="soldOut" type="checkbox" defaultChecked={event.soldOut} style={{ width: 16, height: 16 }} />
              Mark as <strong style={{ color: "#fff" }}>Sold Out</strong> (shows a SOLD OUT badge instead of Tickets)
            </label>
          </div>

          <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12, marginTop: 4 }}>
            <button id="admin-edit-event-submit" type="submit" style={{ padding: "12px 28px", borderRadius: 8, background: "#fe5859", color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, fontSize: 13, border: "none", cursor: "pointer" }}>
              Save changes
            </button>
            <Link id="admin-edit-event-cancel" href="/admin" style={{ padding: "12px 22px", borderRadius: 8, border: "1px solid #333", color: "#aaa", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, fontSize: 13, display: "inline-flex", alignItems: "center" }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
