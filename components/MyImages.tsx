"use client";

import { Photo } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ProfileImageCard from "./ui/ProfileImageCard";
import CircleLoader from "./ui/CircleLoader/CircleLoader";

const MyImages = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/photos/user`, {
          method: "GET",
        });
        const data = await response.json();
        setPhotos(data.photos);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className='mt-6'>
      <div className='text-center font-bold text-3xl'>My Photos</div>
      <div className='flex flex-col items-center mt-10 gap-y-10'>
        {!isLoading ? (
          photos?.length ? (
            photos.map((photo) => (
              <ProfileImageCard key={photo.id} photo={photo} />
            ))
          ) : (
            <div className='flex justify-center text-lg font-semibold mt-10'>
              You dont have any yet
            </div>
          )
        ) : (
          <div className='mt-10'>
            <CircleLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyImages;
