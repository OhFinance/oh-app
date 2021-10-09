import BigNumber from "bignumber.js";
import { depositBank } from "utils/calls";
import { useBankContract } from "hooks/useContract";
import { useCallback } from "react";

export const useBankDeposit = (bankAddress: string) => {
  const contract = useBankContract(bankAddress);

  const handleDeposit = useCallback(
    async (amount: BigNumber) => {
      const txHash = await depositBank(contract, amount);
      console.info(txHash);
    },
    [contract]
  );

  return {
    onDeposit: handleDeposit,
  };
};
