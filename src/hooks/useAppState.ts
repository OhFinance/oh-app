import { useState } from "react";

export interface AppState {
  gasPrice: number;
  pendingTransactions: string[];
  pollingRate: number;
  colorMode: "light" | "dark";
}

export const useAppState = () => {
  return {};
};
