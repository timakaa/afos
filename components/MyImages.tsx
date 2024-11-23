"use client";

import React from "react";
import ProfileImageCard from "./ui/ProfileImageCard";
import { userStore } from "@/store/user.store";

const MyImages = () => {
  const photos = userStore((state) => state.user.boughtPhotos);

  return (
    <div className='mt-6'>
      <div className='text-center font-bold text-3xl'>My Photos</div>
      <div className='flex flex-col items-center mt-10 gap-y-10'>
        {photos?.length ? (
          photos.map((photo) => (
            <ProfileImageCard key={photo.id} photo={photo} />
          ))
        ) : (
          <div className='flex justify-center text-lg font-semibold mt-10'>
            You dont have any yet
          </div>
        )}
      </div>
    </div>
  );
};

export default MyImages;
