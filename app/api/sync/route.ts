import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import {
  maxPossibleEnergyTable,
  multitapBoostCoinsPerClick,
} from "@/lib/boosts";

interface SyncRequest {
  coins: number;
  energy: number;
  timeStamp: number;
}

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      console.log("Unauthorized access");
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    const data: SyncRequest = await request.json();
    const { coins, energy, timeStamp } = data;

    // Current time in seconds
    const currentTime = Date.now();

    // Check timeStamp
    if (timeStamp > currentTime) {
      console.log("Invalid timestamp: time cannot be in the future.");
      return NextResponse.json(
        { error: "Invalid timestamp: time cannot be in the future." },
        { status: 400 },
      );
    }

    if (coins < 0) {
      console.log("Invalid number of coins.");
      return NextResponse.json(
        { error: "Invalid number of coins." },
        { status: 400 },
      );
    }

    if (energy < 0) {
      console.log("Invalid number of energy.");
      return NextResponse.json(
        { error: "Invalid number of energy." },
        { status: 400 },
      );
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      console.log("User not found.");
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const energyLastSync = user.energy;

    const energyRecoveryRate = 1; // 1 energy per second
    const energyLimit =
      maxPossibleEnergyTable[
        (user.energyLimitIndex || 0) as keyof typeof maxPossibleEnergyTable
      ] || maxPossibleEnergyTable[0]; // Maximum energy
    const coinsPerClick =
      multitapBoostCoinsPerClick[
        (user.multitapLevelIndex ||
          0) as keyof typeof multitapBoostCoinsPerClick
      ] || multitapBoostCoinsPerClick[0];
    const energyRecovered = Math.min(
      ((currentTime - timeStamp) / 1000) * energyRecoveryRate,
      energyLimit,
    );

    const maxAccessEnergy = Math.min(
      energyLastSync + energyRecovered - energy,
      energyLimit,
    );

    if (energy > maxAccessEnergy) {
      console.log("Invalid number of energy.");
      return NextResponse.json(
        { error: "Invalid number of energy." },
        { status: 400 },
      );
    }

    const maxEarnedCoins = maxAccessEnergy * coinsPerClick;

    if (coins > maxEarnedCoins) {
      console.log("Invalid number of coins.");
      return NextResponse.json(
        { error: "Invalid number of coins." },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        coins: user.coins + coins,
        coinsBalance: user.coinsBalance + coins,
        energy: energy,
        lastCoinsUpdateTimestamp: new Date(),
        lastEnergyUpdateTimestamp: new Date(),
      },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
