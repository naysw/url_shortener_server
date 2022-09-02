import bcrypt, { genSaltSync } from "bcrypt";
import prisma from "../../src/lib/prisma";
import { ADMIN_ROLE_ID } from "../../src/_data/roles";

export async function userSeeder() {
  // create a admin user with admin role
  await prisma.user.create({
    data: {
      name: "Admin",
      username: "admin",
      password: await bcrypt.hash("password", genSaltSync(12)),
      roles: {
        create: {
          role: {
            connect: {
              id: ADMIN_ROLE_ID,
            },
          },
        },
      },
    },
  });

  // create a normal user without role
  await prisma.user.create({
    data: {
      name: "User",
      username: "user",
      password: bcrypt.hashSync("password", 12),
    },
  });
}
