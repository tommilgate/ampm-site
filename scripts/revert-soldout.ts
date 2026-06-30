import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
async function main() {
  await p.event.updateMany({ data: { soldOut: false } });
  console.log("reverted: all events not sold out");
  await p.$disconnect();
}
main();
