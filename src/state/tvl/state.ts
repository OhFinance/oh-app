import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TVLState {
  combined?: number;
  combinedHistory?: number[];
  [chainId: number]: number;
}

export const initialState: TVLState = {};

export const tvlSlice = createSlice({
  name: "tvl",
  initialState,
  reducers: {
    updateCombinedTVL: (state, action: PayloadAction<number>) => {
      const tvl = action.payload;
      state.combined = tvl;
    },
    // setCombinedTVLHistory: ()
  },
});

export const { updateCombinedTVL } = tvlSlice.actions;

export default tvlSlice.reducer;
