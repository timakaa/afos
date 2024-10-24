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

  const userId = session.user.telegramId;

  try {
    const user = await prisma.user.findUnique({
      where: {
        telegramId: userId,
      },
      include: {
        tasks: true,
        referrals: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.referrals.length < 5) {
      return NextResponse.json(
        { error: "You have not invited 5 friends yet." },
        { status: 400 },
      );
    }

    let task = await prisma.task.findUnique({
      where: {
        name: "invite_friends",
      },
    });

    if (user.tasks.find((userTask) => userTask.id === task?.id)) {
      return NextResponse.json({
        userTasks: user.tasks,
        coins: user.coinsBalance,
      });
    }

    if (!task) {
      task = await prisma.task.create({
        data: {
          name: "invite_friends",
          reward: 50000,
        },
      });
    }

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
      userTasks: updatedUser.tasks,
      coins: updatedUser.coinsBalance,
    });
  } catch (error) {
    console.error("Error while checking community membership:", error);
    return NextResponse.json(
      { error: "Error while checking community membership", isMember: false },
      { status: 500 },
    );
  }
}
