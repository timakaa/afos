"use client";

import { multitapBoostCoinsPerClick } from "@/lib/boosts";
import { isMobileDevice } from "@/lib/isMobileDevice";
import { userStore } from "@/store/user.store";
import { useState } from "react";

const MainClickButton = () => {
  const {
    debouncedSync,
    user: { coinsBalance, multitapLevelIndex, energy },
    setCoins,
    setEnergy,
  } = userStore();
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    [],
  );
  const [unsyncCoins, setUnsyncCoins] = useState(0);

  const pointsToAdd =
    multitapBoostCoinsPerClick[
      multitapLevelIndex as keyof typeof multitapBoostCoinsPerClick
    ] || 1;

  const handleCardClick = (touches: React.TouchList) => {
    const newClicks: { id: number; x: number; y: number }[] = [];

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

      // Check if there is enough energy before processing the click
      if (energy > 0) {
        setEnergy(energy - 1);
        newClicks.push({ id: Date.now() + i, x: touch.pageX, y: touch.pageY });
      }
    }

    // Update coins only for the clicks that were processed
    setCoins(coinsBalance + newClicks.length * pointsToAdd);
    setClicks((prevClicks) => [...prevClicks, ...newClicks]);
    setUnsyncCoins((prev) => prev + newClicks.length);
    debouncedSync(unsyncCoins, setUnsyncCoins);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    handleCardClick(e.changedTouches);
  };

  const handleCardClickByMouse = async (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    const newClicks: { id: number; x: number; y: number }[] = [];

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${
      -y / 6.7
    }deg) rotateY(${x / 6.7}deg)`;

    setTimeout(() => {
      card.style.transform = "";
    }, 100);

    newClicks.push({ id: Date.now(), x: e.clientX, y: e.clientY });

    setCoins(coinsBalance + pointsToAdd);
    setClicks((prevClicks) => [...prevClicks, ...newClicks]);
    setUnsyncCoins((prev) => prev + 1);
    debouncedSync(unsyncCoins, setUnsyncCoins);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleCardClickByMouse(e);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  const priceFormatter = new Intl.NumberFormat("ja-JP", {});

  return (
    <>
      <div className='flex justify-center mb-10'>
        <div className='flex items-center gap-x-5 -ml-4'>
          <span>
            <div className='w-12 h-12 shadow-[inset_0px_-10px_30px_rgba(0,0,0,0.2)] from-zinc-700 duration-[0.05s] to-[#232329] bg-gradient-to-b rounded-full relative flex justify-center items-center text-black text-9xl font-bold before:bg-gradient-to-br before:shadow-[inset_0px_0px_30px_rgba(10,10,10,0.7)] before:from-zinc-800 before:to-zinc-600 before:content-[""] before:absolute before:block before:w-8 before:h-8 before:rounded-full before:left-1/2 before:-translate-x-1/2 before:bg-center'></div>
          </span>
          <span className='font-bold text-5xl'>
            {priceFormatter.format(coinsBalance)}
          </span>
        </div>
      </div>
      <div
        {...(isMobileDevice()
          ? { onTouchStart: (e) => handleTouchStart(e) }
          : { onMouseDown: (e) => handleMouseDown(e) })}
        className='w-80 h-80 from-[#29292b] duration-[0.1s] to-[#111113] bg-gradient-to-b rounded-full relative flex justify-center items-center text-black text-9xl font-bold main-button'
      ></div>
      {clicks.map((click) => (
        <div
          key={click.id}
          className='absolute text-4xl z-30 font-bold opacity-0 text-white pointer-events-none'
          style={{
            top: `${click.y - 128}px`,
            left: `${click.x - 28}px`,
            animation: `float 0.5s ease-out`,
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          +{pointsToAdd}
        </div>
      ))}
    </>
  );
};

export default MainClickButton;
