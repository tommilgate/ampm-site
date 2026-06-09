import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const events = [
  {
    date: "SATURDAY JUNE 13TH",
    city: "EMO NIGHT MELBOURNE",
    venue: "STAY GOLD | THE FINAL PARTY",
    supports: "WITH NIGHTLIGHT + CLOSURE",
    ticketsUrl: "https://tickets.oztix.com.au/",
    rsvpUrl: null,
    order: 1,
  },
  {
    date: "SATURDAY JUNE 27TH",
    city: "EMO NIGHT SYDNEY",
    venue: "THE BURDEKIN",
    supports: "WITH CLOSURE & HEADSTRONG",
    ticketsUrl: "https://tickets.oztix.com.au/",
    rsvpUrl: null,
    order: 2,
  },
  {
    date: "SATURDAY JULY 4TH",
    city: "EMO NIGHT BRISBANE",
    venue: "THE BRIGHTSIDE",
    supports: "WITH CLOSURE & HEADSTRONG",
    ticketsUrl: "https://tickets.oztix.com.au/",
    rsvpUrl: null,
    order: 3,
  },
];

async function main() {
  const count = await prisma.event.count();
  if (count > 0) {
    console.log(`DB already has ${count} events — skipping seed.`);
    return;
  }
  for (const e of events) {
    await prisma.event.create({ data: e });
  }
  console.log(`Seeded ${events.length} events.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
