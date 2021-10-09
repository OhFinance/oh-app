import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "state";
import { useIsBrowserTabActive } from "hooks/useIsBrowserTabActive";
import { simpleRpcProvider } from "utils/web3Providers";
import { setBlock } from "./state";

export const usePollBlockNumber = (refreshTime = 6000) => {
  const timer = useRef(null);
  const dispatch = useAppDispatch();
  const isBrowserTabActiveRef = useIsBrowserTabActive();

  useEffect(() => {
    if (isBrowserTabActiveRef) {
      timer.current = setInterval(async () => {
        const blockNumber = await simpleRpcProvider.getBlockNumber();
        dispatch(setBlock(blockNumber));
      }, refreshTime);
    } else {
      clearInterval(timer.current);
    }

    return () => clearInterval(timer.current);
  }, [dispatch, timer, isBrowserTabActiveRef, refreshTime]);
};

export const useBlock = () => {
  return useSelector((state: AppState) => state.block);
};

export const useInitialBlock = () => {
  return useSelector((state: AppState) => state.block.initialBlock);
};
