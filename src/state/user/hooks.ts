import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";
import { toggleDarkMode, updateUserEarnViewMode } from "./state";
import { ViewMode } from "./types";

export const useUserEarnViewMode = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userEarnViewMode = useSelector<
    AppState,
    AppState["user"]["userEarnViewMode"]
  >((state) => state.user.userEarnViewMode);

  const setUserEarnViewMode = useCallback(
    (viewMode: ViewMode) => {
      dispatch(updateUserEarnViewMode({ userEarnViewMode: viewMode }));
    },
    [dispatch]
  );

  return [userEarnViewMode, setUserEarnViewMode];
};

export const useThemeManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector<AppState, AppState["user"]["isDarkMode"]>(
    (state) => state.user.isDarkMode
  );

  const toggleTheme = useCallback(() => {
    dispatch(toggleDarkMode());
  }, [dispatch]);

  return [isDark, toggleTheme];
};

export const useGasPrice = () => {};

export const useGasPriceManager = () => {};
