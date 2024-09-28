import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();

  if (!session.user.telegramId)
    return NextResponse.json(
      { error: "User not found", isMember: false },
      { status: 404 },
    );

  const botToken = process.env.BOT_TOKEN;
  const channelUsername = process.env.TELEGRAM_CHANNEL_USERNAME;
  const userId = session.user.telegramId;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=@${channelUsername}&user_id=${userId}`,
    );
    const data = await response.json();

    if (data.ok) {
      const isMember = ["creator", "administrator", "member"].includes(
        data.result.status,
      );
      const user = await prisma.user.findUnique({
        where: {
          telegramId: userId,
        },
        include: {
          tasks: true,
        },
      });
      const task = await prisma.task.findUnique({
        where: {
          name: "join_community",
        },
      });

      if (user && task) {
        const updatedUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            tasks: {
              connect: {
                id: task.id,
              },
            },
            coins: {
              increment: task.reward,
            },
            coinsBalance: {
              increment: task.reward,
            },
          },
          include: {
            tasks: true,
          },
        });

        await prisma.task.update({
          where: {
            id: task.id,
          },
          data: {
            usersCompleted: {
              connect: {
                id: updatedUser.id,
              },
            },
          },
        });

        return NextResponse.json({
          isMember,
          userTasks: updatedUser.tasks,
          coins: updatedUser.coinsBalance,
        });
      }

      return NextResponse.json({ isMember, userTasks: user?.tasks });
    } else {
      throw new Error(data.description);
    }
  } catch (error) {
    console.error("Error while checking community membership:", error);
    return NextResponse.json(
      { error: "Error while checking community membership", isMember: false },
      { status: 500 },
    );
  }
}
