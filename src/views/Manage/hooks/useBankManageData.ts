import { Contract } from "@ethersproject/contracts";
import BigNumber from "bignumber.js";
import { useMemo } from "react";
import { useSingleCallResult } from "state/multicall/hooks";

export const useBankManageData = (bank: Contract) => {
  const underlyingBalanceResult = useSingleCallResult(
    bank,
    "underlyingBalance"
  ).result;
  const totalStrategiesResult = useSingleCallResult(
    bank,
    "totalStrategies"
  ).result;

  const underlyingBalance = useMemo(
    () =>
      bank && underlyingBalanceResult
        ? new BigNumber(underlyingBalanceResult.toString())
        : undefined,
    [bank, underlyingBalanceResult]
  );

  const totalStrategies = useMemo(
    () =>
      bank && totalStrategiesResult
        ? new BigNumber(totalStrategiesResult.toString())
        : undefined,
    [bank, totalStrategiesResult]
  );

  return { underlyingBalance, totalStrategies };
};
