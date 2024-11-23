"use client";

import { useEffect, useState } from "react";
import RatePack from "../RatePack";
import ConfirmModal from "./ConfirmModal";
import toast from "react-hot-toast";
import { userStore } from "@/store/user.store";
import Image from "next/image";

const ShopImageCard = ({
  rate = 0,
  reviews = 0,
  name = "",
  price = 0,
  photoId = 0,
  url = "",
}: {
  rate: number;
  reviews: number;
  name: string;
  price: number;
  url: string;
  photoId: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    setBoughtPhotos,
    setCoins,
    user: { boughtPhotos },
  } = userStore();
  const [isBought, setIsBought] = useState(
    !!boughtPhotos?.find((el) => el.id == photoId),
  );

  const handleGetNaked = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/photos/buy/${photoId}`, {
        method: "POST",
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
        setIsVisible(false);
      } else {
        setBoughtPhotos(data.user.boughtPhotos);
        setCoins(data.user.coinsBalance);
        toast.success("Photo bought successfully");
        setIsVisible(false);
      }
    } catch (error) {
      console.error(error);
      setIsVisible(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const found = !!boughtPhotos?.find((el) => el.id == photoId);
    console.log("boughtPhotos changed:", { boughtPhotos, photoId, found });
    setIsBought(found);
  }, [boughtPhotos, photoId]);

  return (
    <>
      <div className='w-full'>
        <div className='relative h-[300px] rounded-lg bg-center bg-no-repeat bg-cover'>
          <Image
            src={url}
            alt={name}
            fill
            className='object-cover absolute inset-0'
          />
          <div className='w-full flex justify-center'>
            <div className='btn opacity-80 active:bg-yellow-500 btn-primary px-6 text-lg min-w-1/2 py-2 rounded-full absolute top-4 font-bold'>
              {name}
            </div>
            <button
              onClick={() => {
                if (isBought) return;
                setIsVisible(true);
              }}
              className={`btn p-4 min-w-1/2 rounded-full absolute bottom-4 font-bold ${
                isBought ? "btn-success" : "btn-primary"
              }`}
            >
              {isBought ? "Bought" : "Get Naked"}
            </button>
          </div>
        </div>

        <RatePack rate={rate} reviews={reviews} photoId={photoId} />
      </div>
      <ConfirmModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        title='Get Naked'
        btnText='Undress'
        isLoading={isLoading}
        description={`Are you sure you want to undress ${name}?`}
        onConfirm={handleGetNaked}
        price={price}
      />
    </>
  );
};

export default ShopImageCard;
