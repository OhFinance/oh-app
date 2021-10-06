import { createSlice } from "@reduxjs/toolkit";
import { EarnState } from "state/types";

const initialState: EarnState = {
  displayMode: "table",
};

export const earnSlice = createSlice({
  name: "earn",
  initialState,
  reducers: {
    toggleDisplay: (state) => ({
      displayMode: state.displayMode === "table" ? "card" : "table",
    }),
  },
});

export const { toggleDisplay } = earnSlice.actions;

export default earnSlice.reducer;
