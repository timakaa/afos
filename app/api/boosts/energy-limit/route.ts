import { maxPossibleEnergyTable } from "@/lib/boosts";
import {
  calculateLevelCost,
  DEFAULT_ENERGY_LIMIT_BASE_COST,
} from "@/lib/calculateLevelCost";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getSession();

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: {
      telegramId: session.user.telegramId,
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const level = user.energyLimitIndex;
  const maxLevel = Object.keys(maxPossibleEnergyTable).length - 1;

  if (level === maxLevel)
    return NextResponse.json({ error: "Max level reached" }, { status: 400 });

  const nextLevel = level + 1;
  const cost = calculateLevelCost({
    level: nextLevel,
    baseCost: DEFAULT_ENERGY_LIMIT_BASE_COST,
  });

  if (user.coinsBalance < cost)
    return NextResponse.json({ error: "Not enough coins" }, { status: 400 });

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      coinsBalance: user.coinsBalance - cost,
      energyLimitIndex: nextLevel,
    },
  });

  return NextResponse.json({
    ...updatedUser,
  });
}
