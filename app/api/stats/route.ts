import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Per-event click stats for ampm-insights to pull (like it pulls Oztix / GA4).
// Protected by a simple API key: GET /api/stats?key=...
export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get("key");
  if (!process.env.STATS_API_KEY || key !== process.env.STATS_API_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const events = await prisma.event.findMany({ orderBy: { order: "asc" } });
  const grouped = await prisma.click.groupBy({
    by: ["eventId", "kind"],
    _count: { _all: true },
  });

  const stats = events.map((e) => {
    const ticket = grouped.find((g) => g.eventId === e.id && g.kind === "ticket")?._count._all ?? 0;
    const rsvp = grouped.find((g) => g.eventId === e.id && g.kind === "rsvp")?._count._all ?? 0;
    return { eventId: e.id, city: e.city, date: e.date, venue: e.venue, ticketClicks: ticket, rsvpClicks: rsvp };
  });

  return NextResponse.json({ generatedAt: new Date().toISOString(), events: stats });
}
