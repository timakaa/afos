import { Suspense } from "react";
import CircleLoader from "@/components/ui/CircleLoader/CircleLoader";
import ShopPics from "@/components/ShopPics";
import { IPhoto } from "@/interfaces/User.interface";
import { getPhotos } from "@/app/actions/photos";

export const revalidate = 30;

export async function generateStaticParams() {
  const photos: IPhoto[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/photos/1`,
  ).then((res) => res.json());
  return photos.map((photo) => ({
    id: String(photo.id),
  }));
}

export default async function ShopPage() {
  const initialData = await getPhotos();

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
