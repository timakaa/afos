import { Suspense } from "react";
import CircleLoader from "@/components/ui/CircleLoader/CircleLoader";
import ShopPics from "@/components/ShopPics";
import { getPhotos } from "@/app/actions/photos";
import { IPhoto } from "@/interfaces/User.interface";
import { IPagination } from "@/interfaces/Pagination.interface";

export const revalidate = 30;

export default async function ShopPage() {
  let initialData: { photos: IPhoto[]; pagination: IPagination } = {
    photos: [],
    pagination: { total: 0, page: 1, limit: 30, totalPages: 1 },
  };

  try {
    initialData = await getPhotos();
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    // Continue with empty array
  }

  return (
    <Suspense
      fallback={
        <div className='flex justify-center pt-10'>
          <CircleLoader />
        </div>
      }
    >
      <div className='pb-20'>
        <ShopPics initialData={initialData} />
      </div>
    </Suspense>
  );
}
