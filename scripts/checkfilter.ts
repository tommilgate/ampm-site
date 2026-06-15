import { PrismaClient } from "@prisma/client";
import { auTodayCutoff } from "../lib/dates";
const p = new PrismaClient();
async function main() {
  const cutoff = auTodayCutoff();
  console.log("AU today cutoff (UTC):", cutoff.toISOString());
  const all = await p.event.findMany({ orderBy: { order: "asc" } });
  for (const e of all) {
    const shown = !e.startDate || e.startDate >= cutoff;
    console.log(`  ${e.city.padEnd(22)} ${e.startDate?.toISOString().slice(0,10) ?? "no-date"}  -> ${shown ? "SHOWS" : "HIDDEN (past)"}`);
  }
  await p.$disconnect();
}
main();
