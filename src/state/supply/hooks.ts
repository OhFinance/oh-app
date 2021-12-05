import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";
import { updateCirculatingSupply } from "./state";

export const useCirculatingSupply = (): [number, (supply: number) => void] => {
  const dispatch = useDispatch<AppDispatch>();
  const circulatingSupply = useSelector<
    AppState,
    AppState["supply"]["circulatingSupply"]
  >((state) => state.supply.circulatingSupply);

  const setCirculatingSupply = useCallback(
    (supply: number) => {
      dispatch(updateCirculatingSupply(supply));
    },
    [dispatch]
  );

  return [circulatingSupply, setCirculatingSupply];
};
