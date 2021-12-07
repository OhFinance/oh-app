import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateHistoryTVL } from "./actions";
import { TVLHistoryData } from "./types";

export interface TVLState {
  latest?: number;
  [chainId: number]: TVLHistoryData[];
}

export const initialState: TVLState = {};

export const tvlSlice = createSlice({
  name: "tvl",
  initialState,
  reducers: {
    updateLatestTVL: (state, action: PayloadAction<number>) => {
      const tvl = action.payload;
      state.latest = tvl;
    },
    updateHistoryTVL: (state, action: PayloadAction<UpdateHistoryTVL[]>) => {
      const tvls = action.payload;

      tvls.forEach(({ chainId, data }) => {
        state[chainId] = data;
      });
    },
  },
});

export const { updateLatestTVL, updateHistoryTVL } = tvlSlice.actions;

export default tvlSlice.reducer;
