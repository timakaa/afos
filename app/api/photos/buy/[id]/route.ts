import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const photoId = params.id;

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

  if (user.boughtPhotos.find((photo) => photo.id === Number(photoId)))
    return NextResponse.json(
      { error: "Photo already bought" },
      { status: 400 },
    );

  const photo = await prisma.photo.findUnique({
    where: {
      id: Number(photoId),
    },
  });

  if (!photo)
    return NextResponse.json({ error: "Photo not found" }, { status: 404 });

  if (user.coinsBalance < photo.price)
    return NextResponse.json({ error: "Not enough coins" }, { status: 400 });

  const updatedUser = await prisma.user.update({
    where: {
      telegramId: session.user.telegramId,
    },
    data: {
      coinsBalance: user.coinsBalance - photo.price,
      boughtPhotos: {
        connect: {
          id: Number(photoId),
        },
      },
    },
    include: {
      boughtPhotos: true,
    },
  });

  revalidatePath("/profile", "layout");

  return NextResponse.json(
    { success: true, user: updatedUser },
    { status: 200 },
  );
}
