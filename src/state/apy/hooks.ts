import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";
import { UpdateHistoryAPY } from "./actions";
import { APYState, updateHistoryAPY } from "./state";

export const useHistoryAPY = (): [
  APYState,
  (tvls: UpdateHistoryAPY[]) => void
] => {
  const dispatch = useDispatch<AppDispatch>();
  const historyAPY = useSelector<AppState, AppState["apy"]>(
    (state) => state.apy
  );

  const setHistoryAPY = useCallback(
    (apys) => {
      dispatch(updateHistoryAPY(apys));
    },
    [dispatch]
  );

  return [historyAPY, setHistoryAPY];
};
