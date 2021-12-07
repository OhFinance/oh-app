import { TVLHistoryData } from "./types";

export interface UpdateHistoryTVL {
  chainId: number;
  data: TVLHistoryData[];
}
