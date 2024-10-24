"use client";

import { useState } from "react";
import ConfirmModal from "./ui/ConfirmModal";
import { priceFormatter } from "@/lib/priceFormatter";
import aphos_logo from "@/public/aphos_logo_remove_bg.png";
import Image from "next/image";

const BuyImageButton = ({ price }: { price: number | string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        className='btn btn-primary px-6 py-3 text-lg min-w-1/2 rounded-full absolute bottom-4 font-bold'
        onClick={() => setIsModalOpen(true)}
      >
        Buy
      </button>
      <ConfirmModal
        isVisible={isModalOpen}
        setIsVisible={setIsModalOpen}
        title='Are you sure you want to buy this image?'
        onConfirm={() => {}}
        btnText='Buy'
        btnClass='min-w-[90px]'
        description={
          <div className='flex items-center gap-x-1 text-white justify-center'>
            <div>{priceFormatter.format(Number(price))}</div>
            <div>
              <Image src={aphos_logo} alt='aphos_logo' width={10} height={10} />
            </div>
          </div>
        }
      />
    </>
  );
};

export default BuyImageButton;
