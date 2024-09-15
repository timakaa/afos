"use client";

import React from "react";
import { getTruePathname } from "../lib/comparePathnamesDeep";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ShopHeader = () => {
  const pathname = usePathname();

  return (
    <div className='w-full sticky top-0 px-4 grid grid-cols-2 py-3 z-20 bg-black'>
      <div
        className={`absolute w-1/2 h-[3px] duration-100 ${
          getTruePathname(pathname) === "/shop/boosts" ? "left-1/2" : "left-0"
        } bg-yellow-500 bottom-0`}
      ></div>
      <Link
        href={"/shop/pics"}
        className='flex items-center justify-center gap-x-2 font-bold'
      >
        <span>
          <svg
            width='20'
            height='20'
            viewBox='0 0 72 72'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
          >
            <rect width='72' height='72' fill='url(#pattern0_8_20141)' />
            <defs>
              <pattern
                id='pattern0_8_20141'
                patternContentUnits='objectBoundingBox'
                width='1'
                height='1'
              >
                <use xlinkHref='#image0_8_20141' transform='scale(0.0138889)' />
              </pattern>
              <image
                id='image0_8_20141'
                width='72'
                height='72'
                xlinkHref='data:image/png;base64,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'
              />
            </defs>
          </svg>
        </span>
        <span className='text-xl'>Pics</span>
      </Link>
      <Link
        href={"/shop/boosts"}
        className='flex items-center justify-center gap-x-1 font-bold'
      >
        <span>
          <svg
            width='20'
            height='20'
            viewBox='0 0 72 72'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
          >
            <rect width='72' height='72' fill='url(#pattern0_14_963)' />
            <defs>
              <pattern
                id='pattern0_14_963'
                patternContentUnits='objectBoundingBox'
                width='1'
                height='1'
              >
                <use xlinkHref='#image0_14_963' transform='scale(0.0138889)' />
              </pattern>
              <image
                id='image0_14_963'
                width='72'
                height='72'
                xlinkHref='data:image/png;base64,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'
              />
            </defs>
          </svg>
        </span>
        <span className='text-xl'>Boosts</span>
      </Link>
    </div>
  );
};

export default ShopHeader;
