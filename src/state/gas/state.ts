import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GasState } from "state/types";

const initialState: GasState = {
  gasPrice: "auto",
};

export const gasSlice = createSlice({
  name: "gas",
  initialState,
  reducers: {},
});

export const {} = gasSlice.actions;

export default gasSlice.reducer;
