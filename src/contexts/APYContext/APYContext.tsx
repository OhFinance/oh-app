import { createContext } from "react";

export interface APYData {
  apy?: number;
  timespan_days?: number;
}

export interface APYStore {
  [bank: string]: APYData[];
}

export interface IAPYContext {
  [chainId: number]: APYStore;
}

export const APYContext = createContext<IAPYContext>({});
