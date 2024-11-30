import { maxPossibleEnergyTable } from "@/lib/boosts";
import { prisma } from "@/lib/prisma";
import { encrypt, SESSION_DURATION } from "@/lib/session";
import { validateTelegramWebAppData } from "@/lib/telegramAuth";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Create user or referral user
async function createUserWithReferral(
  telegramId: number,
  username: string | undefined,
  referralTelegramId?: number,
): Promise<User> {
  let newUser: User;

  if (referralTelegramId && referralTelegramId !== telegramId) {
    const referralUser = await prisma.user.findUnique({
      where: { telegramId: String(referralTelegramId) },
    });

    if (referralUser) {
      newUser = await prisma.user.create({
        data: {
          coins: 1000,
          coinsBalance: 1000,
          username,
          telegramId: String(telegramId),
          referredBy: {
            connect: { id: referralUser.id },
          },
        },
        include: {
          referrals: true,
          tasks: true,
          referredBy: true,
          boughtPhotos: true,
          ratedPhotos: true,
        },
      });

      // Update user referrals
      await prisma.user.update({
        where: { telegramId: String(referralTelegramId) },
        data: {
          referrals: {
            connect: { id: newUser.id },
          },
          coins: {
            increment: 10000,
          },
          coinsBalance: {
            increment: 10000,
          },
        },
        include: {
          referrals: true,
          tasks: true,
          referredBy: true,
          boughtPhotos: true,
          ratedPhotos: true,
        },
      });
    } else {
      // If referral is not defined create default user
      newUser = await prisma.user.create({
        data: {
          username,
          telegramId: String(telegramId),
        },
        include: {
          referrals: true,
          tasks: true,
          referredBy: true,
          boughtPhotos: true,
          ratedPhotos: true,
        },
      });
    }
  } else {
    // If referral ID is not defined create default user
    newUser = await prisma.user.create({
      data: {
        username,
        telegramId: String(telegramId),
      },
      include: {
        referrals: true,
        tasks: true,
        referredBy: true,
        boughtPhotos: true,
        ratedPhotos: true,
      },
    });
  }

  return newUser as User;
}

async function findOrCreateUser(
  telegramId: number,
  username: string | undefined,
  start?: string | null,
): Promise<User> {
  let user: User | null = await prisma.user.findUnique({
    where: { telegramId: String(telegramId) },
    include: {
      referrals: true,
      tasks: true,
      referredBy: true,
      boughtPhotos: true,
      ratedPhotos: true,
    },
  });

  const currentTime = new Date();

  if (user) {
    // Calculate energy recovery
    const energyRecoveryRate = 1; // 1 energy per second
    const timeElapsed =
      (currentTime.getTime() - user.lastEnergyUpdateTimestamp.getTime()) / 1000;
    const energyRecovered = Math.min(
      timeElapsed * energyRecoveryRate,
      maxPossibleEnergyTable[
        user.energyLimitIndex as keyof typeof maxPossibleEnergyTable
      ] || maxPossibleEnergyTable[0],
    );

    // Update user energy
    user = await prisma.user.update({
      where: { telegramId: String(telegramId) },
      data: {
        energy: Math.min(
          user.energy + energyRecovered,
          maxPossibleEnergyTable[
            user.energyLimitIndex as keyof typeof maxPossibleEnergyTable
          ] || maxPossibleEnergyTable[0],
        ),
      },
      include: {
        referrals: true,
        tasks: true,
        referredBy: true,
        boughtPhotos: true,
        ratedPhotos: true,
      },
    });
  } else {
    // Create new user with initial energy
    user = await createUserWithReferral(
      telegramId,
      username,
      start ? Number(start) : undefined,
    );
  }

  return user as User;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { initData } = body;
  const { searchParams } = request.nextUrl;
  const start = searchParams.get("start");

  const validationResult = validateTelegramWebAppData(initData);

  if (validationResult.validatedData) {
    const telegramId = Number(validationResult.user.id);
    const username = validationResult.user.username;

    const user = await findOrCreateUser(telegramId, username, start);

    console.log(user);

    const sessionUser = {
      id: user.id,
      telegramId: user.telegramId,
      username: user.username,
    };

    const expires = new Date(Date.now() + SESSION_DURATION);
    const session = await encrypt({ user: sessionUser, expires });

    cookies().set("session", session, { expires, httpOnly: true });

    return NextResponse.json({
      user: {
        ...user,
        username: validationResult.user.username,
        telegramId: user.telegramId,
      },
    });
  } else {
    return NextResponse.json(
      { message: validationResult.message },
      { status: 401 },
    );
  }
}
