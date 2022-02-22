import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";
import { UpdateHistoryTVL } from "./actions";
import { TVLState, updateHistoryTVL, updateLatestTVL } from "./state";

export const useLatestTVL = (): [number, (tvl: number) => void] => {
  const dispatch = useDispatch<AppDispatch>();
  const tvl = useSelector<AppState, AppState["tvl"]["latest"]>(
    (state) => state.tvl.latest
  );

  const setLatestTVL = useCallback(
    (tvl: number) => {
      dispatch(updateLatestTVL(tvl));
    },
    [dispatch]
  );

  return [tvl, setLatestTVL];
};

export const useHistoryTVL = (): [
  TVLState,
  (tvls: UpdateHistoryTVL[]) => void
] => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useSelector<AppState, AppState["tvl"]>((state) => state.tvl);

  const setHistoryTVL = useCallback(
    (tvls: UpdateHistoryTVL[]) => {
      dispatch(updateHistoryTVL(tvls));
    },
    [dispatch]
  );

  return [history, setHistoryTVL];
};
