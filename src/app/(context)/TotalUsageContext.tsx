// src/app/(context)/TotalUsageContext.tsx
import { createContext } from "react";

export interface TotalUsageContextType {
  totalUsage: number;
  setTotalUsage: (val: number) => void;
}

export const TotalUsageContext = createContext<TotalUsageContextType>({
  totalUsage: 0,
  setTotalUsage: () => {},
});
  