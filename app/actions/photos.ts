import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPhotos(page: number = 1) {
  const limit = 30;
  const skip = (page - 1) * limit;
  const [photos, totalPhotos] = await Promise.all([
    prisma.photo.findMany({
      take: limit,
      skip: skip,
      orderBy: {
        rating: "desc",
      },
    }),
    prisma.photo.count(),
  ]);

  revalidatePath("/shop/pics", "page");

  return {
    photos,
    pagination: {
      total: totalPhotos,
      page,
      limit,
      totalPages: Math.ceil(totalPhotos / limit),
    },
  };
}
