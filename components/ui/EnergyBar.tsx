"use client";

import { maxPossibleEnergyTable } from "@/lib/boosts";
import { userStore } from "@/store/user.store";
import { useEffect, useState } from "react";
import LightIcon from "./LightIcon";

const EnergyBar = () => {
  const user = userStore((state) => state.user);
  const [isEnergyRecharging, setIsEnergyRecharging] = useState(false);
  const [prevEnergy, setPrevEnergy] = useState<number | null>(null);

  useEffect(() => {
    if (
      prevEnergy &&
      prevEnergy < user.energy &&
      user.energy <
        maxPossibleEnergyTable[
          user.energyLimitIndex as keyof typeof maxPossibleEnergyTable
        ]
    ) {
      setIsEnergyRecharging(true);
    } else {
      setIsEnergyRecharging(false);
    }
    setPrevEnergy(user.energy);
  }, [user.energy]);

  return (
    <div className='flex flex-col w-full px-6 gap-y-2 mt-10'>
      <div className='flex justify-start items-center font-semibold'>
        <div className='w-6 h-6 mr-1'>
          <LightIcon />
        </div>
        <div>
          {user.energy}/
          {
            maxPossibleEnergyTable[
              user.energyLimitIndex as keyof typeof maxPossibleEnergyTable
            ]
          }
        </div>
      </div>
      <div className='relative overflow-hidden w-full bg-zinc-900 rounded-full h-5'>
        <div
          style={{
            width: `${
              (user.energy /
                maxPossibleEnergyTable[
                  user.energyLimitIndex as keyof typeof maxPossibleEnergyTable
                ]) *
              100
            }%`,
          }}
          className={`absolute inset-0 h-5 duration-100 bg-gradient-to-r ${
            isEnergyRecharging
              ? "from-green-400 to-green-600"
              : "from-yellow-400 to-yellow-600"
          } `}
        ></div>
      </div>
    </div>
  );
};

export default EnergyBar;
