// src/app/(context)/UpdateCreditUsageContext.tsx
import { createContext } from "react";

export interface UpdateCreditUsageContextType {
  updateCreditUsage: number;
  setUpdateCreditUsage: (val: number) => void;
}

export const UpdateCreditUsageContext = createContext<UpdateCreditUsageContextType>({
  updateCreditUsage: 0,
  setUpdateCreditUsage: () => {},
});
