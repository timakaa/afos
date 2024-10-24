"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { useClickAway } from "../hooks/useClickAway";
import Modal from "./ui/Modal";
import { userStore } from "@/store/user.store";
import toast from "react-hot-toast";
import {
  calculateLevelCost,
  DEFAULT_ENERGY_LIMIT_BASE_COST,
} from "@/lib/calculateLevelCost";
import CircleLoader from "./ui/CircleLoader/CircleLoader";
import { maxPossibleEnergyTable } from "@/lib/boosts";
import { priceFormatter } from "@/lib/priceFormatter";
import ConfirmModal from "./ui/ConfirmModal";

const EnergyLimitBoost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    user: { energyLimitIndex },
    setEnergyLimit,
    setCoins,
  } = userStore((state) => state);
  const [level, setLevel] = useState(energyLimitIndex);
  const [maxLevelReached, setMaxLevelReached] = useState(
    energyLimitIndex === Object.keys(maxPossibleEnergyTable).length - 1,
  );

  useEffect(() => {
    setLevel(energyLimitIndex);
    setMaxLevelReached(
      energyLimitIndex === Object.keys(maxPossibleEnergyTable).length - 1,
    );
  }, [energyLimitIndex]);

  const cost = calculateLevelCost({
    level: level + 1,
    baseCost: DEFAULT_ENERGY_LIMIT_BASE_COST,
  });

  const handleBuy = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/boosts/energy-limit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        if (data) {
          setCoins(data.coinsBalance);
          setEnergyLimit(data.energyLimitIndex);
        }
        setIsModalOpen(false);
        toast.success("Energy limit upgraded successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const infoButtonRef = useRef(null);
  const infoRef = useRef(null);

  useClickAway({
    func: () => setIsOpen(false),
    refs: [infoButtonRef, infoRef],
  });

  return (
    <>
      <div className='w-full bg-zinc-900 border border-zinc-800 py-4 rounded-lg px-5'>
        <div className='flex justify-between items-center'>
          <div>
            <div className='relative'>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className='text-zinc-400'
                ref={infoButtonRef}
              >
                <FiInfo />
              </button>
              <AnimatePresence mode='wait'>
                {isOpen ? (
                  <motion.div
                    initial='from'
                    animate='to'
                    exit='from'
                    variants={{
                      from: { y: "10px", opacity: 0 },
                      to: { y: "0", opacity: 1 },
                    }}
                    ref={infoRef}
                    transition={{
                      duration: 0.1,
                      ease: "easeInOut",
                      bounce: true,
                    }}
                    className='absolute w-[200px] -left-3 top-6 z-20 bg-zinc-950 border border-zinc-800 p-3 rounded-md'
                  >
                    <span>Increases the energy limit</span>
                    <br />
                    <br />
                    <span>0. 500 energy</span>
                    <br />
                    <span>1. 1000 energy</span>
                    <br />
                    <span>2. 2000 energy</span>
                    <br />
                    <span>3. 3000 energy</span>
                    <br />
                    <span>4. 4000 energy</span>
                  </motion.div>
                ) : (
                  ""
                )}
              </AnimatePresence>
            </div>
            <div className='text-xl font-bold'>Energy Limit</div>
          </div>
          <div>
            {maxLevelReached ? (
              <div className='bg-yellow-600 text-white font-bold px-5 py-2 rounded-md'>
                Max
              </div>
            ) : (
              <button
                disabled={maxLevelReached}
                onClick={() => setIsModalOpen(true)}
                className='btn btn-primary px-5 py-2 font-bold'
              >
                {level === 0 ? "Buy" : "Upgrade"}
              </button>
            )}
          </div>
        </div>
        <div className='grid grid-cols-4 gap-x-2 mt-4'>
          <div
            className={`h-2 w-full -skew-x-[50deg] ${
              level > 0 ? "bg-yellow-400" : "bg-zinc-700"
            }`}
          ></div>
          <div
            className={`h-2 w-full -skew-x-[50deg] ${
              level > 1 ? "bg-yellow-400" : "bg-zinc-700"
            }`}
          ></div>
          <div
            className={`h-2 w-full -skew-x-[50deg] ${
              level > 2 ? "bg-yellow-400" : "bg-zinc-700"
            }`}
          ></div>
          <div
            className={`h-2 w-full -skew-x-[50deg] ${
              level > 3 ? "bg-yellow-400" : "bg-zinc-700"
            }`}
          ></div>
        </div>
        {maxLevelReached ? (
          ""
        ) : (
          <div className='flex justify-end mt-4 text-lg font-bold'>
            {priceFormatter.format(cost)}
          </div>
        )}
      </div>
      <ConfirmModal
        isVisible={isModalOpen}
        setIsVisible={setIsModalOpen}
        title={`Are you sure you want ${
          level === 0 ? "to buy" : "to upgrade"
        } the Energy Limit?`}
        description={`To level ${level + 1}`}
        onConfirm={handleBuy}
        btnText={level === 0 ? "Buy" : "Upgrade"}
        btnClass={level === 0 ? "min-w-[90px]" : "min-w-[120px]"}
        isLoading={isLoading}
      />
    </>
  );
};

export default EnergyLimitBoost;
