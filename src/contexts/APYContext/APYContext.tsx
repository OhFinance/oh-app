import { createContext } from "react";

export interface APYData {
  apy?: number;
  timespan_days?: number;
}

export interface APYStore {
  [bank: string]: APYData[];
}

export interface IAPYContext {
  banks?: APYStore;
}

export const APYContext = createContext<IAPYContext>({ banks: {} });
