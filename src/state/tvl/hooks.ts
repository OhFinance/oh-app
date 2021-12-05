import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";
import { updateCombinedTVL } from "./state";

export const useCombinedTVL = (): [number, (tvl: number) => void] => {
  const dispatch = useDispatch<AppDispatch>();
  const tvl = useSelector<AppState, AppState["tvl"]["combined"]>(
    (state) => state.tvl.combined
  );

  const setCombinedTVL = useCallback(
    (tvl: number) => {
      dispatch(updateCombinedTVL(tvl));
    },
    [dispatch]
  );

  return [tvl, setCombinedTVL];
};
