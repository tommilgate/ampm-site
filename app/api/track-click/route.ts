import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Records a first-party click. Called via navigator.sendBeacon from the delegated ClickTracking listener.
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const kind = typeof body.kind === "string" ? body.kind.slice(0, 32) : "unknown";
    const eventId = Number.isInteger(body.eventId) ? body.eventId : null;

    await prisma.click.create({ data: { kind, eventId } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 }); // never block the client
  }
}
