import { createSlice } from "@reduxjs/toolkit";

export interface SupplyState {
  circulatingSupply?: number;
}

export const initialState: SupplyState = {};

const supplySlice = createSlice({
  name: "supply",
  initialState,
  reducers: {
    updateCirculatingSupply: (state, action: { payload: number }) => {
      state.circulatingSupply = action.payload;
    },
  },
});

export const { updateCirculatingSupply } = supplySlice.actions;

export default supplySlice.reducer;
