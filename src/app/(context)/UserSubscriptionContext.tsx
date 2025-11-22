import { createContext } from "react";

export interface UserSubscriptionContextType {
  userSubscription: boolean;
  setUserSubscription: (val: boolean) => void;
}

export const UserSubscriptionContext =
  createContext<UserSubscriptionContextType>({
    userSubscription: false,
    setUserSubscription: () => {},
  });
