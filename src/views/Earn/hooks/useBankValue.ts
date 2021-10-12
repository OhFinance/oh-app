import BigNumber from "bignumber.js";
import { useBankContract } from "hooks/useContract";
import { useCallback, useMemo } from "react";
import { useSingleCallResult } from "state/multicall/hooks";
import { TEN, ZERO } from "utils/bigNumber";

export const useBankValue = (bankAddress: string) => {
  const bank = useBankContract(bankAddress);
  const virtualPriceResult = useSingleCallResult(
    bank,
    "virtualPrice",
    []
  ).result;
  const virtualBalanceResult = useSingleCallResult(
    bank,
    "virtualBalance",
    []
  ).result;

  const virtualPrice = useMemo(
    () =>
      bankAddress && virtualPriceResult
        ? new BigNumber(virtualPriceResult.toString())
        : ZERO,
    [bankAddress, virtualPriceResult]
  );

  const virtualBalance = useMemo(
    () =>
      bankAddress && virtualBalanceResult
        ? new BigNumber(virtualBalanceResult.toString())
        : ZERO,
    [bankAddress, virtualBalanceResult]
  );

  const getShareValue = useCallback(
    (shares: BigNumber, decimals?: number) => {
      return bankAddress && virtualPrice
        ? new BigNumber(shares).times(virtualPrice).div(TEN.pow(decimals))
        : ZERO;
    },
    [bankAddress, virtualPrice]
  );

  return {
    virtualBalance,
    virtualPrice,
    getShareValue,
  };
};
