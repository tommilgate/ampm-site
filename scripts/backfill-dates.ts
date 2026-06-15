import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
// UTC-midnight of each event's calendar date (date-only semantics)
const d = (s: string) => new Date(s + "T00:00:00.000Z");
async function main() {
  const map: Record<string, string> = {
    "EMO NIGHT MELBOURNE": "2026-06-13",
    "EMO NIGHT SYDNEY": "2026-06-27",
    "EMO NIGHT BRISBANE": "2026-07-04",
  };
  for (const [city, date] of Object.entries(map)) {
    await p.event.updateMany({ where: { city }, data: { startDate: d(date) } });
  }
  const ev = await p.event.findMany({ orderBy: { order: "asc" } });
  console.log("BACKFILLED:", ev.map((e) => `${e.city}=${e.startDate?.toISOString().slice(0,10)}`).join(", "));
  await p.$disconnect();
}
main();
