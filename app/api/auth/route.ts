import { prisma } from "@/lib/prisma";
import { encrypt, SESSION_DURATION } from "@/lib/session";
import { validateTelegramWebAppData } from "@/lib/telegramAuth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Create user or referral user
async function createUserWithReferral(
  telegramId: number,
  username: string | undefined,
  referralTelegramId?: number,
) {
  let newUser;

  if (referralTelegramId) {
    const referralUser = await prisma.user.findUnique({
      where: { telegramId: referralTelegramId },
    });

    if (referralUser) {
      newUser = await prisma.user.create({
        data: {
          coins: 1000,
          coinsBalance: 1000,
          username,
          telegramId,
          referredBy: {
            connect: { id: referralUser.id },
          },
          lastCoinsUpdateTimestamp: Date.now(),
          lastEnergyUpdateTimestamp: Date.now(),
          createdAt: Date.now(),
        },
        include: {
          referrals: true,
          userPacks: true,
          tasks: true,
          referredBy: true,
        },
      });

      // Update user referrals
      await prisma.user.update({
        where: { telegramId: referralTelegramId },
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
          userPacks: true,
          tasks: true,
          referredBy: true,
        },
      });
    } else {
      // If referral is not defined create default user
      newUser = await prisma.user.create({
        data: {
          username,
          telegramId,
          lastCoinsUpdateTimestamp: Date.now(),
          lastEnergyUpdateTimestamp: Date.now(),
          createdAt: Date.now(),
        },
        include: {
          referrals: true,
          userPacks: true,
          tasks: true,
          referredBy: true,
        },
      });
    }
  } else {
    // If referral ID is not defined create default user
    newUser = await prisma.user.create({
      data: {
        username,
        telegramId,
        lastCoinsUpdateTimestamp: Date.now(),
        lastEnergyUpdateTimestamp: Date.now(),
        createdAt: Date.now(),
      },
      include: {
        referrals: true,
        userPacks: true,
        tasks: true,
        referredBy: true,
      },
    });
  }

  return newUser;
}

async function findOrCreateUser(
  telegramId: number,
  username: string | undefined,
  start?: string | null,
) {
  let user = await prisma.user.findUnique({
    where: { telegramId },
    include: {
      referrals: true,
      userPacks: true,
      tasks: true,
      referredBy: true,
    },
  });

  if (!user) {
    user = await createUserWithReferral(
      telegramId,
      username,
      start ? Number(start) : undefined,
    );
  }

  return user;
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
