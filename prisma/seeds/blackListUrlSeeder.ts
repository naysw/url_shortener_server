import prisma from "../../src/lib/prisma";

export async function blackListUrlSeeder() {
  await prisma.blackListUrl.create({
    data: {
      url: "https://google.com",
    },
  });
}
