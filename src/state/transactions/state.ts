import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionState } from "state/types";

const initialState: TransactionState = {};

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<any>) => {},
  },
});

export const { addTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
