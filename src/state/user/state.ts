import {
  DEFAULT_COLOR_MODE,
  DEFAULT_POLLING_INTERVAL,
} from "config/constants/values";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAccount, UserState } from "state/types";

const initialState: UserState = {
  account: null,
  connector: null,
  colorMode: DEFAULT_COLOR_MODE,
  pollingInterval: DEFAULT_POLLING_INTERVAL,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAccount: (state, action: PayloadAction<UserAccount>) => {
      const { account, connector } = action.payload;

      return {
        ...state,
        account,
        connector,
      };
    },
    clearAccount: (state) => ({
      ...state,
      account: null,
      connector: null,
    }),
    clearUser: () => ({
      ...initialState,
    }),
    toggleColorMode: (state) => ({
      colorMode: state.colorMode === "light" ? "dark" : "light",
    }),
  },
});

export const { updateAccount, clearAccount, clearUser, toggleColorMode } =
  userSlice.actions;

export default userSlice.reducer;
