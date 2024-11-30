import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(
  request: Request,
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
      ratedPhotos: true,
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (user.ratedPhotos.find((photo: any) => photo.id === Number(photoId)))
    return NextResponse.json({ error: "Photo already rated" }, { status: 400 });

  const photo = await prisma.photo.findUnique({
    where: {
      id: Number(photoId),
    },
  });

  if (!photo)
    return NextResponse.json({ error: "Photo not found" }, { status: 404 });

  const updatedUser = await prisma.user.update({
    where: {
      telegramId: session.user.telegramId,
    },
    data: {
      ratedPhotos: {
        connect: {
          id: Number(photoId),
        },
      },
    },
    include: {
      ratedPhotos: true,
    },
  });

  const { rating: newRating } = await request.json();

  if (!newRating || newRating < 1 || newRating > 10) {
    return NextResponse.json(
      { error: "Rating must be between 1 and 10" },
      { status: 400 },
    );
  }

  const allRatings = [...photo.ratingStore, newRating];
  const averageRating = Math.min(
    10,
    allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length,
  );

  const updatedPhoto = await prisma.photo.update({
    where: {
      id: Number(photoId),
    },
    data: {
      ratingStore: {
        push: newRating,
      },
      rating: averageRating,
      reviews: {
        increment: 1,
      },
    },
  });

  // Принудительное обновление всех маршрутов, связанных с фотографиями
  revalidatePath("/api/photos/[page]", "layout");
  // Если у вас есть другие маршруты, которые тоже нужно обновить
  revalidatePath("/shop/pics", "page"); // если у вас есть страница магазина

  return NextResponse.json(
    { success: true, user: updatedUser, photo: updatedPhoto },
    { status: 200 },
  );
}
