import BigNumber from "bignumber.js";
import { useBankContract } from "hooks/useContract";
import useTotalSupply from "hooks/useTotalSupply";
import { useCallback, useMemo } from "react";
import { useSingleCallResult } from "state/multicall/hooks";
import { TEN, ZERO } from "utils/bigNumber";

export const useBankValue = (bankAddress: string) => {
  const bank = useBankContract(bankAddress);
  const totalSupply = useTotalSupply(bankAddress);
  const virtualPriceResult = useSingleCallResult(bank, "virtualPrice").result;
  const virtualBalanceResult = useSingleCallResult(
    bank,
    "virtualBalance"
  ).result;

  const virtualPrice = useMemo(
    () =>
      bankAddress && virtualPriceResult
        ? new BigNumber(virtualPriceResult.toString())
        : undefined,
    [bankAddress, virtualPriceResult]
  );

  const virtualBalance = useMemo(
    () =>
      bankAddress && virtualBalanceResult
        ? new BigNumber(virtualBalanceResult.toString())
        : undefined,
    [bankAddress, virtualBalanceResult]
  );

  const getTokenValue = useCallback(
    (tokens: BigNumber) => {
      return bankAddress && virtualBalance
        ? new BigNumber(tokens).times(totalSupply).div(virtualBalance)
        : undefined;
    },
    [bankAddress, totalSupply, virtualBalance]
  );

  const getShareValue = useCallback(
    (shares: BigNumber, decimals?: number) => {
      return bankAddress && virtualPrice
        ? new BigNumber(shares).times(virtualPrice).div(TEN.pow(decimals))
        : undefined;
    },
    [bankAddress, virtualPrice]
  );

  const getTotalBankShare = useCallback(
    (shares: BigNumber, decimals?: number) => {
      return bankAddress && totalSupply
        ? new BigNumber(shares).times(TEN.pow(decimals)).div(totalSupply)
        : undefined;
    },
    [bankAddress, totalSupply]
  );

  return {
    virtualBalance,
    virtualPrice,
    getTokenValue,
    getShareValue,
    getTotalBankShare,
  };
};
