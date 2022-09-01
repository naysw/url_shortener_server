import prisma from "../../src/lib/prisma";
import { blackListUrlSeeder } from "./blackListUrlSeeder";

(async () => {
  await blackListUrlSeeder();
})()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding complete");
    await prisma.$disconnect();
  });
