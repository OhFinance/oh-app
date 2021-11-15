import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { load, save } from "redux-localstorage-simple";
import { isLocalhost } from "utils/misc";
import updateVersion from "./actions";

import banks from "./banks/state";
import block from "./block/state";
import multicall from "./multicall/state";
import transactions from "./transactions/state";
import user from "./user/state";

const PERSISTED_KEYS: string[] = ["user", "transactions"];

const store = configureStore({
  devTools: isLocalhost(),
  reducer: {
    banks,
    block,
    multicall,
    user,
    transactions,
  },
  middleware: (getDefaultMiddleware) => {
    return [
      ...getDefaultMiddleware({ thunk: true }),
      save({ states: PERSISTED_KEYS }),
    ];
  },
  preloadedState: load({
    states: PERSISTED_KEYS,
  }),
});

store.dispatch(updateVersion());

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch();

export default store;
