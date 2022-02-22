import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { load, save } from "redux-localstorage-simple";
import { isLocalhost } from "utils/misc";
import updateVersion from "./actions";

import apy from "./apy/state";
import banks from "./banks/state";
import block from "./block/state";
import multicall from "./multicall/state";
import prices from "./prices/state";
import supply from "./supply/state";
import transactions from "./transactions/state";
import tvl from "./tvl/state";
import user from "./user/state";
import application from "./application/reducer";
import staking from "./staking/reducer";

const PERSISTED_KEYS: string[] = ["user", "transactions"];

const store = configureStore({
  devTools: isLocalhost(),
  reducer: {
    application,
    apy,
    banks,
    block,
    multicall,
    prices,
    supply,
    transactions,
    tvl,
    user,
    staking,
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
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
