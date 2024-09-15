"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className='grid pt-40 place-items-center'>
      <div className='flex justify-center font-bold text-3xl mb-5'>{count}</div>
      <button
        onClick={() => setCount((prev) => prev + 1)}
        className='w-72 h-72 bg-white rounded-full active:bg-gray-300 flex justify-center items-center text-black text-9xl font-bold'
      >
        A
      </button>
    </div>
  );
}
