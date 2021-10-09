import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateGasPrice, UpdateUserEarnViewMode } from "./actions";
import { ViewMode } from "./types";

export interface UserState {
  account: string;
  connector: string;
  gasPrice: number;
  isDarkMode: boolean;
  isDrawerOpen: boolean;
  userEarnViewMode: ViewMode;
}

const initialState: UserState = {
  account: null,
  connector: null,
  gasPrice: null,
  isDarkMode: false,
  isDrawerOpen: false,
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
    toggleDrawerMode: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
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
  toggleDrawerMode,
  updateGasPrice,
  updateUserEarnViewMode,
} = userSlice.actions;

export default userSlice.reducer;
