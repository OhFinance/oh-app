import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";
import { PriceState, updatePrices } from "./state";

export const usePriceManager = (): [PriceState, (data: PriceState) => void] => {
  const dispatch = useDispatch<AppDispatch>();
  const prices = useSelector<AppState, AppState["prices"]>(
    (state) => state.prices
  );

  const setPrices = useCallback(
    (data: PriceState) => {
      dispatch(updatePrices(data));
    },
    [dispatch]
  );

  return [prices, setPrices];
};
