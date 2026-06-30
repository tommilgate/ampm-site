import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
p.setting.deleteMany({ where: { key: "buttonColor" } }).then(()=>{console.log("reverted (default coral)");return p.$disconnect();});
