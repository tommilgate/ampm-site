import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
async function main() {
  const s = await p.setting.findMany();
  console.log("SETTINGS:", JSON.stringify(s));
  await p.$disconnect();
}
main();
