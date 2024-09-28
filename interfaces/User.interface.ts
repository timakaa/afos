export interface IUserData {
  telegramId: number;
  username?: string;
  coins: number;
  coinsBalance: number;
  energy: number;
  energyLimitIndex: number;
  multitapLevelIndex: number;
  referrals: IUserData[];
  referredBy?: IUserData;
  refferedById?: number;
  lastCoinsUpdateTimestamp: number;
  lastEnergyUpdateTimestamp: number;
  tasks?: ITask[];
  userPacks?: IUserPack[];
}

export interface ITask {
  id: number;
  name: string;
  reward: number;
  usersCompleted: IUserData[];
}

export interface IUserPack {
  id: number;
  name: string;
  packInstance: number;
  usersCompleted: IUserData[];
  photos: IPhoto[];
}

export interface IPack {
  id: number;
  name: string;
  previewUrl: string;
  usersBought: IUserData[];
  userPacks: IUserPack[];
  photos: IPhoto[];
}

export interface IPhoto {
  id: number;
  url: string;
  usersBought: IUserData[];
  userPacks: IUserPack[];
  pack: IPack;
}
