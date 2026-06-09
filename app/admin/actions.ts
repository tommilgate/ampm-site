"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

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

export async function uploadHero(formData: FormData) {
  requireAuth(await isAuthed());
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) redirect("/admin?error=nofile");

  const { put } = await import("@vercel/blob");
  const ext = (file!.name.split(".").pop() || "jpg").toLowerCase();
  const blob = await put(`events-hero-${Date.now()}.${ext}`, file!, {
    access: "public",
    addRandomSuffix: true,
  });

  await prisma.setting.upsert({
    where: { key: "eventsHeroUrl" },
    update: { value: blob.url },
    create: { key: "eventsHeroUrl", value: blob.url },
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
