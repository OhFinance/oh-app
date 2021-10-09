import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";
import { toggleViewMode } from "./state";

export const useEarnViewManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isCardView = useSelector<AppState, AppState["earn"]["isCardView"]>(
    (state) => state.earn.isCardView
  );

  const toggleView = useCallback(() => {
    dispatch(toggleViewMode());
  }, [dispatch]);

  return [isCardView, toggleView];
};
