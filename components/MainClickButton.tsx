"use client";

import { useState } from "react";

const MainClickButton = () => {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    [],
  );

  const pointsToAdd = 1;

  const handleCardClick = (touches: React.TouchList) => {
    const newClicks: any = [];

    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      const card = touch.target as HTMLDivElement;
      const rect = card.getBoundingClientRect();
      const x = touch.clientX - rect.left - rect.width / 2;
      const y = touch.clientY - rect.top - rect.height / 2;
      card.style.transform = `perspective(1000px) rotateX(${
        -y / 6.7
      }deg) rotateY(${x / 6.7}deg)`;

      setTimeout(() => {
        card.style.transform = "";
      }, 100);

      newClicks.push({ id: Date.now() + i, x: touch.pageX, y: touch.pageY });
    }

    setCount((prev) => prev + touches.length);
    setClicks((prevClicks) => [...prevClicks, ...newClicks]);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    handleCardClick(e.changedTouches);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  return (
    <div className='grid pt-40 place-items-center'>
      <div className='flex justify-center font-bold text-3xl mb-5'>{count}</div>
      <div
        onTouchStart={(e) => handleTouchStart(e)}
        className='w-72 h-72 from-zinc-700 duration-[0.05s] to-zinc-800 bg-gradient-to-br rounded-full relative flex justify-center items-center text-black text-9xl font-bold before-image'
      ></div>
      {clicks.map((click) => (
        <div
          key={click.id}
          className='absolute text-4xl z-30 font-bold opacity-0 text-white pointer-events-none'
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 0.5s ease-out`,
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          +{pointsToAdd}
        </div>
      ))}
    </div>
  );
};

export default MainClickButton;
