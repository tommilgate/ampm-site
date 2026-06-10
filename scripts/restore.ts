import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();

async function main() {
  await p.event.createMany({
    data: [
      {
        date: "SATURDAY JUNE 13TH",
        city: "EMO NIGHT MELBOURNE",
        venue: "STAY GOLD | THE FINAL PARTY",
        supports: "WITH NIGHTLIGHT + CLOSURE",
        ticketsUrl: "https://tickets.oztix.com.au/outlet/event/ab1e9d8e-8818-48a2-b515-f893782dabfa",
        order: 1,
      },
      {
        date: "SATURDAY JUNE 27TH",
        city: "EMO NIGHT SYDNEY",
        venue: "THE BURDEKIN",
        supports: "WITH CLOSURE & HEADSTRONG",
        ticketsUrl: "https://tickets.oztix.com.au/outlet/event/5c47551a-4216-4e12-9f57-737d1b5cbb03",
        order: 2,
      },
      {
        date: "SATURDAY JULY 4TH",
        city: "EMO NIGHT BRISBANE",
        venue: "THE BRIGHTSIDE",
        supports: "WITH CLOSURE & HEADSTRONG",
        ticketsUrl: "https://tickets.oztix.com.au/outlet/event/72ce1efc-db0b-4b06-90d6-234be4e64d62",
        order: 3,
      },
    ],
  });
  await p.setting.upsert({
    where: { key: "eventsHeroUrl" },
    update: { value: "https://qeeuwkhpbglfzwuq.public.blob.vercel-storage.com/events-hero-1781008087023-KxIAj0U8QMWZhWZbhkphIsHrgKfBoz.jpg" },
    create: { key: "eventsHeroUrl", value: "https://qeeuwkhpbglfzwuq.public.blob.vercel-storage.com/events-hero-1781008087023-KxIAj0U8QMWZhWZbhkphIsHrgKfBoz.jpg" },
  });
  const ev = await p.event.findMany({ orderBy: { order: "asc" } });
  const st = await p.setting.findMany();
  console.log("RESTORED events:", ev.map((e) => `${e.id}:${e.city}`).join(", "));
  console.log("RESTORED settings:", st.map((s) => s.key).join(", "));
  await p.$disconnect();
}
main();
