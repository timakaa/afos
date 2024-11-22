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
  referredById?: number;
  lastCoinsUpdateTimestamp: Date;
  lastEnergyUpdateTimestamp: Date;
  tasks?: ITask[];
  createdAt: Date;
  boughtPhotos?: IPhoto[];
  ratedPhotos?: IPhoto[];
}

export interface ITask {
  id: number;
  name: string;
  reward: number;
  usersCompleted: IUserData[];
}

export interface IPhoto {
  id: number;
  defaultUrl: string;
  nakedUrl: string;
  name: string;
  price: number;
  rating: number;
  ratingStore: number[];
  reviews: number;
  usersBought: IUserData[];
  usersRated: IUserData[];
}
