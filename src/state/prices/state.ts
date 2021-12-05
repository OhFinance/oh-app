import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PriceState {
  [symbol: string]: number;
}

export const initialState: PriceState = {};

const pricesSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<PriceState>) => {
      const data = action.payload;
      Object.keys(data).forEach((key) => {
        state[key] = data[key];
      });
    },
  },
});

export const { updatePrices } = pricesSlice.actions;

export default pricesSlice.reducer;
