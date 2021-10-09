import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";
import {
  toggleDarkMode,
  toggleDrawerMode,
  updateUserEarnViewMode,
} from "./state";
import { ViewMode } from "./types";

export const useGasPrice = () => {};

export const useGasPriceManager = () => {};

export const useDrawerManager = (): [boolean, () => void] => {
  const dispatch = useDispatch<AppDispatch>();
  const isDrawerOpen = useSelector<AppState, AppState["user"]["isDrawerOpen"]>(
    (state) => state.user.isDrawerOpen
  );

  const toggleDrawer = useCallback(() => {
    dispatch(toggleDrawerMode());
  }, [dispatch]);

  return [isDrawerOpen, toggleDrawer];
};

export const useThemeManager = (): [boolean, () => void] => {
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector<AppState, AppState["user"]["isDarkMode"]>(
    (state) => state.user.isDarkMode
  );

  const toggleTheme = useCallback(() => {
    dispatch(toggleDarkMode());
  }, [dispatch]);

  return [isDark, toggleTheme];
};

export const useUserEarnViewMode = (): [
  ViewMode,
  (viewMode: ViewMode) => void
] => {
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
