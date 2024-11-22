"use client";

import { IPhoto, ITask, IUserData } from "@/interfaces/User.interface";
import { multitapBoostCoinsPerClick } from "@/lib/boosts";
import { debounce } from "@/lib/debounce";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserState {
  user: IUserData;
  isAuth: boolean;
  isEnergyRecovering: boolean;
}

export interface UserActions {
  setUser: (user: IUserData) => void;
  setIsAuth: (isAuth: boolean) => void;
  setTasks: (tasks: ITask[]) => void;
  setCoins: (coins: number) => void;
  setEnergyLimit: (energyLimit: number) => void;
  setMultitapLevel: (multitapLevel: number) => void;
  debouncedSync: (
    unsyncCoins: number,
    setUnsyncCoins: Dispatch<SetStateAction<number>>,
    initialTimestamp: number,
  ) => void;
  setEnergy: (energy: number) => void;
  setIsEnergyRecovering: (isEnergyRecovering: boolean) => void;
  setBoughtPhotos: (boughtPhotos: IPhoto[]) => void;
  setRatedPhotos: (ratedPhotos: IPhoto[]) => void;
}

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  user: {
    telegramId: 0,
    referredById: undefined,
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
    boughtPhotos: [],
    ratedPhotos: [],
  },
  isAuth: false,
  isEnergyRecovering: false,
};

export const userStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...defaultInitState,
      setUser: (user) => set(() => ({ user })),
      setIsAuth: (isAuth) => set(() => ({ isAuth })),
      setTasks: (tasks) => set((state) => ({ user: { ...state.user, tasks } })),
      setEnergyLimit: (energyLimit) =>
        set((state) => ({
          user: { ...state.user, energyLimitIndex: energyLimit },
        })),
      setMultitapLevel: (multitapLevel) =>
        set((state) => ({
          user: { ...state.user, multitapLevelIndex: multitapLevel },
        })),
      setCoins: (coins) =>
        set((state) => ({ user: { ...state.user, coinsBalance: coins } })),
      setEnergy: (energy) =>
        set((state) => ({ user: { ...state.user, energy } })),
      setIsEnergyRecovering: (isEnergyRecovering) =>
        set(() => ({ isEnergyRecovering })),
      debouncedSync: debounce(
        async (unsyncCoins, setUnsyncCoins, initialTimestamp) => {
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
                    ] || multitapBoostCoinsPerClick[0],
                timeStamp: initialTimestamp, // Use the initial timestamp
                energy: energy - 1,
              }),
            });
            if (response.ok) {
              toast.success("Coins saved");
              setUnsyncCoins(0);
            } else {
              toast.error("Error saving coins");
            }
          } catch (error) {
            toast.error("Error saving coins");
            console.error("Error saving coins:", error);
          }
        },
        2000,
      ),
      setBoughtPhotos: (boughtPhotos) =>
        set((state) => ({ user: { ...state.user, boughtPhotos } })),
      setRatedPhotos: (ratedPhotos) =>
        set((state) => ({ user: { ...state.user, ratedPhotos } })),
    }),
    {
      name: "user",
    },
  ),
);
