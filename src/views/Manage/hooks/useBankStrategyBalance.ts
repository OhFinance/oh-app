import { Contract } from "@ethersproject/contracts";
import BigNumber from "bignumber.js";
import { useMemo } from "react";
import { useSingleCallResult } from "state/multicall/hooks";

export const useBankStrategyBalance = (bank: Contract, i: number) => {
  const inputs = useMemo(() => [i], [i]);
  const strategyBalanceResult = useSingleCallResult(
    bank,
    "strategyBalance",
    inputs
  ).result;

  const strategyBalance = useMemo(
    () =>
      bank && strategyBalanceResult
        ? new BigNumber(strategyBalanceResult.toString())
        : undefined,
    [bank, strategyBalanceResult]
  );

  return strategyBalance;
};
