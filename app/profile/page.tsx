"use client";

import SubscribeChannel from "@/components/SubscribeChannel";
import ProfileImageCard from "@/components/ui/ProfileImageCard";
import { telegram } from "@/lib/telegram";
import React from "react";

const page = () => {
  const { user } = telegram();

  return (
    <div className='px-4 py-5'>
      <div className='text-5xl font-bold'>Hello</div>
      <div className='text-4xl font-bold'>@{user?.username}</div>
      <hr className='border-b-[2px] my-6 border-b-zinc-400 border-t-0' />
      <SubscribeChannel />
      <div className='mt-6'>
        <div className='text-center font-bold text-3xl'>My Photos</div>
        <div className='flex flex-col items-center mt-3 gap-y-5'>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <ProfileImageCard key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;
