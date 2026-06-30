import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
async function main() {
  await p.event.updateMany({ where: { city: "EMO NIGHT SYDNEY" }, data: { soldOut: true } });
  console.log("set Sydney sold out");
  await p.$disconnect();
}
main();
