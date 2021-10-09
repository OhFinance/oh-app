import BigNumber from "bignumber.js";
import { withdrawBank } from "utils/calls";
import { useBankContract } from "hooks/useContract";
import { useCallback } from "react";

export const useBankWithdraw = (bankAddress: string) => {
  const contract = useBankContract(bankAddress);

  const handleWithdraw = useCallback(
    async (amount: BigNumber) => {
      const txHash = await withdrawBank(contract, amount);
      console.info(txHash);
    },
    [contract]
  );

  return {
    onWithdraw: handleWithdraw,
  };
};
