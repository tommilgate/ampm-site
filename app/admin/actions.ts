"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseDateInput } from "@/lib/dates";

const COOKIE = "ampm_admin";

export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(COOKIE)?.value === process.env.ADMIN_PASSWORD;
}

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (password && password === process.env.ADMIN_PASSWORD) {
    const jar = await cookies();
    jar.set(COOKIE, password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    redirect("/admin");
  }
  redirect("/admin?error=1");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(COOKIE);
  redirect("/admin");
}

function requireAuth(authed: boolean) {
  if (!authed) throw new Error("Not authorized");
}

// ---- Page hero image (events page) ----

export async function getSetting(key: string): Promise<string | null> {
  const s = await prisma.setting.findUnique({ where: { key } });
  return s?.value ?? null;
}

export type HeroImage = { url: string; width: number | null; height: number | null };

// Hero is stored as JSON {url,width,height} so the page can render it with
// fixed dimensions (no layout shift) and next/image can optimize it.
export async function getHero(): Promise<HeroImage | null> {
  const s = await prisma.setting.findUnique({ where: { key: "eventsHeroUrl" } });
  if (!s?.value) return null;
  if (s.value.startsWith("{")) {
    try {
      const parsed = JSON.parse(s.value) as HeroImage;
      return parsed?.url ? parsed : null;
    } catch {
      return null;
    }
  }
  // legacy plain-URL value
  return { url: s.value, width: null, height: null };
}

export async function uploadHero(formData: FormData) {
  requireAuth(await isAuthed());
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) redirect("/admin?error=nofile");

  const buffer = Buffer.from(await file!.arrayBuffer());

  // Read intrinsic dimensions so the events page can reserve space (zero CLS)
  let width: number | null = null;
  let height: number | null = null;
  try {
    const { imageSize } = await import("image-size");
    const dim = imageSize(buffer);
    width = dim.width ?? null;
    height = dim.height ?? null;
  } catch {
    /* dimensions unknown — page falls back to fluid img */
  }

  const { put } = await import("@vercel/blob");
  const ext = (file!.name.split(".").pop() || "jpg").toLowerCase();
  const blob = await put(`events-hero-${Date.now()}.${ext}`, buffer, {
    access: "public",
    addRandomSuffix: true,
  });

  const value = JSON.stringify({ url: blob.url, width, height });
  await prisma.setting.upsert({
    where: { key: "eventsHeroUrl" },
    update: { value },
    create: { key: "eventsHeroUrl", value },
  });

  revalidatePath("/events");
  revalidatePath("/admin");
  redirect("/admin?hero=1");
}

export async function removeHero() {
  requireAuth(await isAuthed());
  await prisma.setting.deleteMany({ where: { key: "eventsHeroUrl" } });
  revalidatePath("/events");
  revalidatePath("/admin");
  redirect("/admin");
}

// ---- Drag reorder ----

export async function reorderEvents(orderedIds: number[]) {
  requireAuth(await isAuthed());
  await prisma.$transaction(
    orderedIds.map((id, i) => prisma.event.update({ where: { id }, data: { order: i + 1 } }))
  );
  revalidatePath("/events");
  revalidatePath("/admin");
}

export async function addEvent(formData: FormData) {
  requireAuth(await isAuthed());

  const get = (k: string) => {
    const v = String(formData.get(k) ?? "").trim();
    return v.length ? v : null;
  };

  const date = get("date");
  const city = get("city");
  const venue = get("venue");
  if (!date || !city || !venue) redirect("/admin?error=missing");

  // Place new events at the end by default
  const last = await prisma.event.findFirst({ orderBy: { order: "desc" } });
  const order = (last?.order ?? 0) + 1;

  await prisma.event.create({
    data: {
      date: date!,
      startDate: parseDateInput(get("startDate")),
      city: city!,
      venue: venue!,
      supports: get("supports"),
      ticketsUrl: get("ticketsUrl"),
      rsvpUrl: get("rsvpUrl"),
      imageUrl: get("imageUrl"),
      order,
    },
  });

  revalidatePath("/events");
  revalidatePath("/admin");
  redirect("/admin?added=1");
}

export async function updateEvent(formData: FormData) {
  requireAuth(await isAuthed());

  const id = Number(formData.get("id"));
  if (!id) redirect("/admin");

  const get = (k: string) => {
    const v = String(formData.get(k) ?? "").trim();
    return v.length ? v : null;
  };

  const date = get("date");
  const city = get("city");
  const venue = get("venue");
  if (!date || !city || !venue) redirect(`/admin/edit/${id}?error=missing`);

  const orderRaw = get("order");

  await prisma.event.update({
    where: { id },
    data: {
      date: date!,
      startDate: parseDateInput(get("startDate")),
      city: city!,
      venue: venue!,
      supports: get("supports"),
      ticketsUrl: get("ticketsUrl"),
      rsvpUrl: get("rsvpUrl"),
      imageUrl: get("imageUrl"),
      ...(orderRaw ? { order: Number(orderRaw) } : {}),
    },
  });

  revalidatePath("/events");
  revalidatePath("/admin");
  redirect("/admin?updated=1");
}

export async function deleteEvent(formData: FormData) {
  requireAuth(await isAuthed());
  const id = Number(formData.get("id"));
  if (id) {
    await prisma.event.delete({ where: { id } });
    revalidatePath("/events");
    revalidatePath("/admin");
  }
  redirect("/admin");
}

export async function toggleEvent(formData: FormData) {
  requireAuth(await isAuthed());
  const id = Number(formData.get("id"));
  const enabled = formData.get("enabled") === "true";
  if (id) {
    await prisma.event.update({ where: { id }, data: { enabled: !enabled } });
    revalidatePath("/events");
    revalidatePath("/admin");
  }
  redirect("/admin");
}
