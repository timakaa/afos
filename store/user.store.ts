"use client";

import { ITask, IUserData } from "@/interfaces/User.interface";
import { debounce } from "@/lib/debounce";
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
  debouncedSync: () => void;
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
    lastCoinsUpdateTimestamp: 0,
    lastEnergyUpdateTimestamp: 0,
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
      debouncedSync: debounce(async () => {
        const {
          user: { coinsBalance, energy },
        } = get();
        try {
          const response = await fetch("/api/sync", {
            method: "POST",
            body: JSON.stringify({
              unsynchronizedCoins: coinsBalance,
              syncTimestamp: Date.now(),
              currentEnergy: energy,
            }),
          });
          if (response.ok) {
            toast.success("Coins saved");
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
