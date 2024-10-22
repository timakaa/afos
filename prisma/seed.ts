import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "Alice",
      telegramId: 3124213,
      coins: 444,
    },
  });
  console.log(user);
  await prisma.task.create({
    data: {
      name: "join_community",
      reward: 20000,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
