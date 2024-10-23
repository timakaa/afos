"use client";

import { maxPossibleEnergyTable } from "@/lib/boosts";
import { userStore } from "@/store/user.store";
import React from "react";
import LightIcon from "./LightIcon";

const EnergyBar = () => {
  const user = userStore((state) => state.user);

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
          className='absolute inset-0 h-5 duration-100 bg-gradient-to-r from-yellow-400 to-yellow-600'
        ></div>
      </div>
    </div>
  );
};

export default EnergyBar;
