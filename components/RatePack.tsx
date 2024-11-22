"use client";

import { userStore } from "@/store/user.store";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaStarHalf, FaRegStarHalf } from "react-icons/fa";
import CircleLoader from "./ui/CircleLoader/CircleLoader";

const RatePack = ({
  reviews,
  photoId,
  rate,
}: {
  reviews: number;
  photoId: number;
  rate: number;
}) => {
  const [ratedRate, setRatedRate] = useState(rate);
  const [ratedReviews, setRatedReviews] = useState(reviews);
  const [currentIndex, setCurrentIndex] = useState(rate || 0);
  const [isRated, setIsRated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setRatedPhotos } = userStore();

  const handleRate = async (photoId: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/photos/rate/${photoId}`, {
        method: "POST",
        body: JSON.stringify({ rating: currentIndex }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        setRatedPhotos(data.user.ratedPhotos);
        setRatedRate(data.photo.rating);
        setRatedReviews(data.photo.reviews);
        toast.success("Photo rated successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setIsRated(false);
    }
  };

  return (
    <div className='flex items-center justify-between px-6'>
      <div className='flex justify-center items-center mt-2'>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div className='flex' key={index}>
              <div
                className='w-[18px] overflow-hidden text-yellow-500 text-4xl cursor-pointer'
                onClick={() => {
                  setIsRated(true);
                  setCurrentIndex(index * 2 + 1);
                }}
              >
                {index * 2 + 1 <= (isRated ? currentIndex : ratedRate) ? (
                  <FaStarHalf />
                ) : (
                  <FaRegStarHalf />
                )}
              </div>
              <div
                className='w-[18px] -scale-x-100 text-yellow-500 overflow-hidden text-4xl cursor-pointer'
                onClick={() => {
                  setIsRated(true);
                  setCurrentIndex(index * 2 + 2);
                }}
              >
                {index * 2 + 2 <= (isRated ? currentIndex : ratedRate) ? (
                  <FaStarHalf />
                ) : (
                  <FaRegStarHalf />
                )}
              </div>
            </div>
          ))}
      </div>
      {isRated ? (
        <div className='pt-3'>
          <button
            className='btn btn-primary rounded-full py-2 px-6 font-semibold'
            onClick={() => handleRate(photoId)}
          >
            {isLoading ? <CircleLoader /> : <span>Rate</span>}
          </button>
        </div>
      ) : (
        <div className='flex flex-col items-end pt-2'>
          <div className='text-xl font-bold'>
            {Math.floor((isRated ? currentIndex : ratedRate) * 5) / 10 > 5
              ? 5
              : Math.floor((isRated ? currentIndex : ratedRate) * 5) / 10}
            /5
          </div>
          <div className='text-xs text-gray-500'>{ratedReviews} reviews</div>
        </div>
      )}
    </div>
  );
};

export default RatePack;
