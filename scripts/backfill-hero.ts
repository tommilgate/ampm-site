import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
async function main() {
  const url = "https://qeeuwkhpbglfzwuq.public.blob.vercel-storage.com/events-hero-1781008087023-KxIAj0U8QMWZhWZbhkphIsHrgKfBoz.jpg";
  const value = JSON.stringify({ url, width: 1080, height: 1080 });
  await p.setting.update({ where: { key: "eventsHeroUrl" }, data: { value } });
  console.log("BACKFILLED:", (await p.setting.findUnique({ where: { key: "eventsHeroUrl" } }))?.value);
  await p.$disconnect();
}
main();
