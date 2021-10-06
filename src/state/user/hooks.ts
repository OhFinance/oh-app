import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";
import { toggleColorMode } from "./state";

export const useThemeManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const colorMode = useSelector<AppState, AppState["user"]["colorMode"]>(
    (state) => state.user.colorMode
  );

  const toggleTheme = useCallback(() => {
    dispatch(toggleColorMode());
  }, [dispatch]);

  return [colorMode, toggleTheme];
};
