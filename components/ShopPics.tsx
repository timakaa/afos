"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ShopImageCard from "@/components/ui/ShopImageCard";
import CircleLoader from "@/components/ui/CircleLoader/CircleLoader";
import { Photo } from "@prisma/client";

interface ShopPicsClientProps {
  initialData: {
    photos: Photo[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export default function ShopPics({ initialData }: ShopPicsClientProps) {
  const [currentPage, setCurrentPage] = useState(initialData.pagination.page);
  const [allPhotos, setAllPhotos] = useState<Photo[]>(initialData.photos);
  const [hasMore, setHasMore] = useState(
    currentPage < initialData.pagination.totalPages,
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchPhotos = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;

      // Используем параллельный маршрут для загрузки данных
      const response = await fetch(`/api/photos/${nextPage}`);
      const data = await response.json();

      if (data.photos?.length > 0) {
        setAllPhotos((prevPhotos) => {
          const uniquePhotos = [...prevPhotos];
          data.photos.forEach((photo: Photo) => {
            if (!prevPhotos.some((p) => p.id === photo.id)) {
              uniquePhotos.push(photo);
            }
          });
          return uniquePhotos;
        });

        setCurrentPage(nextPage);
        setHasMore(
          data.photos.length > 0 && nextPage < data.pagination.totalPages,
        );
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id='scrollableDiv' style={{ height: "100vh", overflow: "auto" }}>
      <InfiniteScroll
        dataLength={allPhotos.length}
        next={fetchPhotos}
        hasMore={hasMore}
        loader={
          <div className='flex justify-center py-4'>
            <CircleLoader />
          </div>
        }
        endMessage={
          <div className='text-center text-gray-500 py-4'>No more photos</div>
        }
        scrollThreshold={0.6}
        className='flex flex-col px-4 py-5 gap-y-5'
        scrollableTarget='scrollableDiv'
      >
        {allPhotos.map((photo) => (
          <ShopImageCard
            key={photo.id}
            photoId={photo.id}
            rate={photo.rating}
            reviews={photo.reviews}
            url={photo.defaultUrl}
            name={photo.name}
            price={photo.price}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
