"use client";

import React from "react";
import Image from "next/image";
import CountDown from "./CountDown";
import { Photo } from "@prisma/client";

const ProfileImageCard = ({ photo }: { photo: Photo }) => {
  return (
    <>
      <button className={`w-full text-center relative h-[300px]`}>
        <div className='absolute top-0 left-0 right-0 flex justify-center z-20 -translate-y-6'>
          <div className='btn btn-primary !bg-yellow-600 py-1 px-4 rounded-full'>
            {photo.name}
          </div>
        </div>
        <div>
          <Image
            alt=''
            src={photo.defaultUrl}
            width={0}
            height={0}
            unoptimized
            className={`absolute h-[300px] w-full mx-auto inset-0 rounded-lg object-cover`}
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/90' />
          <div className='grid place-items-center relative z-20'>
            <div>
              <div className='mb-2 font-semibold'>You will see it in</div>
              <CountDown />
            </div>
          </div>
        </div>
      </button>
    </>
  );
};

export default ProfileImageCard;
