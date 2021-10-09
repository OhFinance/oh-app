import { createSlice } from "@reduxjs/toolkit";
import { EarnState } from "state/types";

const initialState: EarnState = {
  isCardView: true,
};

export const earnSlice = createSlice({
  name: "earn",
  initialState,
  reducers: {
    toggleViewMode: (state) => ({
      ...state,
      isCardView: !state.isCardView,
    }),
  },
});

export const { toggleViewMode } = earnSlice.actions;

export default earnSlice.reducer;
