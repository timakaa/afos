import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { IPhoto } from "@/interfaces/User.interface";
import { IPagination } from "@/interfaces/Pagination.interface";

export async function getPhotos(
  page: number = 1,
): Promise<{ photos: IPhoto[]; pagination: IPagination }> {
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
    photos: photos as IPhoto[],
    pagination: {
      total: totalPhotos,
      page,
      limit,
      totalPages: Math.ceil(totalPhotos / limit),
    },
  };
}
