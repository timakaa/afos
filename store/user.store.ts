"use client";

import { IUserData } from "@/interfaces/User.interface";
import { create } from "zustand";

export interface UserState {
  user: IUserData;
  isAuth: boolean;
}

export interface UserActions {
  setUser: (user: IUserData) => void;
  setIsAuth: (isAuth: boolean) => void;
}

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  user: {
    telegramId: 0,
    first_name: "",
    is_premium: false,
    language_code: "",
    last_name: "",
    username: "",
  },
  isAuth: false,
};

export const userStore = create<UserStore>()((set) => ({
  ...defaultInitState,
  setUser: (user) => set(() => ({ user })),
  setIsAuth: (isAuth) => set(() => ({ isAuth })),
}));
