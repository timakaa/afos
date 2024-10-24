"use client";

import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

const BackButton = () => {
  const router = useRouter();

  return (
    <button className='text-2xl' onClick={() => router.back()}>
      <IoArrowBackOutline />
    </button>
  );
};

export default BackButton;
