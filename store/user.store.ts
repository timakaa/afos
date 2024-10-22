"use client";

import { ITask, IUserData } from "@/interfaces/User.interface";
import { multitapBoostCoinsPerClick } from "@/lib/boosts";
import { debounce } from "@/lib/debounce";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserState {
  user: IUserData;
  isAuth: boolean;
}

export interface UserActions {
  setUser: (user: IUserData) => void;
  setIsAuth: (isAuth: boolean) => void;
  setTasks: (tasks: ITask[]) => void;
  setCoins: (coins: number) => void;
  debouncedSync: (
    unsyncCoins: number,
    setUnsyncCoins: Dispatch<SetStateAction<number>>,
  ) => void;
}

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  user: {
    telegramId: 0,
    refferedById: undefined,
    referredBy: undefined,
    username: "",
    referrals: [],
    coins: 0,
    tasks: [],
    coinsBalance: 0,
    energy: 0,
    energyLimitIndex: 0,
    multitapLevelIndex: 0,
    lastCoinsUpdateTimestamp: new Date(),
    lastEnergyUpdateTimestamp: new Date(),
    createdAt: new Date(),
  },
  isAuth: false,
};

export const userStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...defaultInitState,
      setUser: (user) => set(() => ({ user })),
      setIsAuth: (isAuth) => set(() => ({ isAuth })),
      setTasks: (tasks) => set((state) => ({ user: { ...state.user, tasks } })),
      setCoins: (coins) =>
        set((state) => ({ user: { ...state.user, coinsBalance: coins } })),
      debouncedSync: debounce(async (unsyncCoins, setUnsyncCoins) => {
        const {
          user: { energy, multitapLevelIndex },
        } = get();
        try {
          const response = await fetch("/api/sync", {
            method: "POST",
            body: JSON.stringify({
              coins:
                (unsyncCoins + 1) *
                  multitapBoostCoinsPerClick[
                    multitapLevelIndex as keyof typeof multitapBoostCoinsPerClick
                  ] || 1,
              timeStamp: Date.now(),
              energy: energy,
            }),
          });
          if (response.ok) {
            toast.success("Coins saved");
            setUnsyncCoins(0);
          } else {
            toast.error("Error while saving coins");
          }
        } catch (error) {
          toast.error("Error while saving coins");
          console.error("Error while saving coins:", error);
        }
      }, 2000),
    }),
    {
      name: "user",
    },
  ),
);
