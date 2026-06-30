import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
async function main() {
  await p.setting.upsert({ where: { key: "buttonColor" }, update: { value: "#8b6cf0" }, create: { key: "buttonColor", value: "#8b6cf0" } });
  console.log("set test purple #8b6cf0");
  await p.$disconnect();
}
main();
