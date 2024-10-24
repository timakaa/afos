"use client";

import { useState } from "react";
import { FaStarHalf, FaRegStarHalf } from "react-icons/fa";

const RatePack = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className='flex items-center justify-between px-6'>
      <div className='flex justify-center items-center mt-2'>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div className='flex' key={index}>
              <div
                className='w-[18px] overflow-hidden text-yellow-500 text-4xl cursor-pointer'
                onClick={() => setCurrentIndex(index * 2 + 1)}
              >
                {index * 2 + 1 <= currentIndex ? (
                  <FaStarHalf />
                ) : (
                  <FaRegStarHalf />
                )}
              </div>
              <div
                className='w-[18px] -scale-x-100 text-yellow-500 overflow-hidden text-4xl cursor-pointer'
                onClick={() => setCurrentIndex(index * 2 + 2)}
              >
                {index * 2 + 2 <= currentIndex ? (
                  <FaStarHalf />
                ) : (
                  <FaRegStarHalf />
                )}
              </div>
            </div>
          ))}
      </div>
      <div className='pt-3'>
        <button className='btn btn-primary rounded-full py-2 px-6 font-semibold'>
          Rate
        </button>
      </div>
    </div>
  );
};

export default RatePack;
