import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateHistoryAPY } from "./actions";
import { APYHistoryData } from "./types";

export interface APYState {
  [chainId: number]: APYHistoryData[];
}

export const initialState: APYState = {};

const apySlice = createSlice({
  name: "apy",
  initialState,
  reducers: {
    updateHistoryAPY: (state, action: PayloadAction<UpdateHistoryAPY[]>) => {
      const apys = action.payload;
      apys.forEach(({ chainId, data }) => {
        state[chainId] = data;
      });
    },
  },
});

export const { updateHistoryAPY } = apySlice.actions;

export default apySlice.reducer;
