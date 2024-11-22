"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ShopImageCard from "./ui/ShopImageCard";
import { Photo } from "@prisma/client";
import CircleLoader from "./ui/CircleLoader/CircleLoader";

const ShopPics = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const fetchPhotos = async () => {
    try {
      console.log("Fetching page:", currentPage); // Для отладки

      const res = await fetch(`/api/photos?page=${currentPage}&limit=${limit}`);
      const data = await res.json();

      const newPhotos = data.photos;

      setPhotos((prevPhotos) => {
        const uniquePhotos = [...prevPhotos];
        newPhotos.forEach((photo: Photo) => {
          if (!prevPhotos.some((p) => p.id === photo.id)) {
            uniquePhotos.push(photo);
          }
        });
        return uniquePhotos;
      });

      // Проверяем, есть ли еще фотографии для загрузки
      const hasMorePhotos =
        photos.length + newPhotos.length < data.pagination.total;
      setHasMore(hasMorePhotos);

      if (hasMorePhotos && newPhotos.length > 0) {
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div id='scrollableDiv' style={{ height: "100vh", overflow: "auto" }}>
      <InfiniteScroll
        dataLength={photos.length}
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
        {photos.map((photo) => (
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
};

export default ShopPics;
