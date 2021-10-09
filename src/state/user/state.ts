import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateGasPrice, UpdateUserEarnViewMode } from "./actions";
import { ViewMode } from "./types";

export interface UserState {
  account: string;
  connector: string;
  gasPrice: number;
  isDarkMode: boolean;
  userEarnViewMode: ViewMode;
}

const initialState: UserState = {
  account: null,
  connector: null,
  gasPrice: null,
  isDarkMode: false,
  userEarnViewMode: ViewMode.TABLE,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state = initialState;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    updateGasPrice: (state, action: PayloadAction<UpdateGasPrice>) => {
      state.gasPrice = action.payload.gasPrice;
    },
    updateUserEarnViewMode: (
      state,
      action: PayloadAction<UpdateUserEarnViewMode>
    ) => {
      state.userEarnViewMode = action.payload.userEarnViewMode;
    },
  },
});

export const {
  clearUser,
  toggleDarkMode,
  updateGasPrice,
  updateUserEarnViewMode,
} = userSlice.actions;

export default userSlice.reducer;
