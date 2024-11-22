import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  console.log("API Session:", session);

  if (!session?.user?.telegramId) {
    console.log("No session or telegramId found");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      telegramId: session.user.telegramId,
    },
    include: {
      boughtPhotos: true,
    },
  });

  console.log("Found user:", user?.id);

  console.log("User photos:", user?.boughtPhotos);

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ photos: user.boughtPhotos }, { status: 200 });
}
