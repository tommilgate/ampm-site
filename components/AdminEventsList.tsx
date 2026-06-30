"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { reorderEvents, deleteEvent, toggleEvent, toggleSoldOut } from "@/app/admin/actions";

export type AdminEvent = {
  id: number;
  date: string;
  city: string;
  venue: string;
  supports: string | null;
  enabled: boolean;
  past: boolean;
  soldOut: boolean;
  ticketClicks: number;
  rsvpClicks: number;
};

function Row({ ev }: { ev: AdminEvent }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: ev.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : ev.enabled && !ev.past ? 1 : 0.5,
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "#0c0c0c",
    border: "1px solid #1e1e1e",
    borderRadius: 12,
    padding: "12px 14px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* Drag handle */}
      <button
        id={`admin-event-drag-${ev.id}`}
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        style={{ cursor: "grab", color: "#666", background: "none", border: "none", padding: "4px 6px", fontSize: 18, lineHeight: 1, touchAction: "none" }}
      >
        ⋮⋮
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: "#fe5859", letterSpacing: 1, textTransform: "uppercase" }}>
          {ev.date}
          {ev.past && (
            <span style={{ marginLeft: 8, color: "#888", border: "1px solid #444", borderRadius: 4, padding: "1px 6px", fontSize: 10 }}>
              PAST · hidden from site
            </span>
          )}
          {ev.soldOut && (
            <span style={{ marginLeft: 8, color: "#bdbdbd", border: "1px solid #555", borderRadius: 4, padding: "1px 6px", fontSize: 10 }}>
              SOLD OUT
            </span>
          )}
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, textTransform: "uppercase" }}>{ev.city}</div>
        <div style={{ fontSize: 12, color: "#999" }}>{ev.venue}{ev.supports ? ` · ${ev.supports}` : ""}</div>
        <div style={{ fontSize: 11, color: "#fe5859", marginTop: 4, letterSpacing: 0.5 }}>
          🎟 {ev.ticketClicks} ticket{ev.ticketClicks === 1 ? "" : "s"} · {ev.rsvpClicks} RSVP click{ev.rsvpClicks === 1 ? "" : "s"}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <a id={`admin-event-edit-${ev.id}`} href={`/admin/edit/${ev.id}`} style={btn}>Edit</a>
        <form id={`admin-event-soldout-form-${ev.id}`} action={toggleSoldOut}>
          <input type="hidden" name="id" value={ev.id} />
          <input type="hidden" name="soldOut" value={String(ev.soldOut)} />
          <button id={`admin-event-soldout-${ev.id}`} type="submit" style={ev.soldOut ? { ...btn, color: "#fe5859", borderColor: "#4a1f1f" } : btn}>
            {ev.soldOut ? "Sold ✓" : "Sold out"}
          </button>
        </form>
        <form id={`admin-event-toggle-form-${ev.id}`} action={toggleEvent}>
          <input type="hidden" name="id" value={ev.id} />
          <input type="hidden" name="enabled" value={String(ev.enabled)} />
          <button id={`admin-event-toggle-${ev.id}`} type="submit" style={btn}>{ev.enabled ? "Hide" : "Show"}</button>
        </form>
        <form id={`admin-event-delete-form-${ev.id}`} action={deleteEvent}>
          <input type="hidden" name="id" value={ev.id} />
          <button id={`admin-event-delete-${ev.id}`} type="submit" style={{ ...btn, color: "#fe5859", borderColor: "#4a1f1f" }}>Delete</button>
        </form>
      </div>
    </div>
  );
}

const btn: React.CSSProperties = {
  border: "1px solid #333",
  color: "#fff",
  background: "none",
  padding: "7px 11px",
  borderRadius: 6,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 1,
  whiteSpace: "nowrap",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
};

export default function AdminEventsList({ initial }: { initial: AdminEvent[] }) {
  const [items, setItems] = useState(initial);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const next = arrayMove(items, oldIndex, newIndex);
      setItems(next);
      reorderEvents(next.map((i) => i.id)); // persist new order
    }
  }

  if (items.length === 0) {
    return <p style={{ color: "#666", fontSize: 13 }}>No events yet — add one above.</p>;
  }

  return (
    <>
      <p style={{ color: "#666", fontSize: 12, marginBottom: 10 }}>Drag the ⋮⋮ handle to reorder.</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map((ev) => (
              <Row key={ev.id} ev={ev} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}
