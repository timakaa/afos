import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getSession();

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: {
      telegramId: session.user.telegramId,
    },
    include: {
      boughtPhotos: true,
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const skip = (page - 1) * limit;

  const totalPhotos = await prisma.photo.count();

  const photos = await prisma.photo.findMany({
    take: limit,
    skip: skip,
    orderBy: {
      rating: "desc",
    },
  });

  return NextResponse.json(
    {
      photos,
      pagination: {
        total: totalPhotos,
        page,
        limit,
        totalPages: Math.ceil(totalPhotos / limit),
      },
    },
    { status: 200 },
  );
}
