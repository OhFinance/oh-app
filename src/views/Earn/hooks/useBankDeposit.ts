import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { deposit } from "helpers/callHelper";
import { useBankContract } from "hooks/useContract";
import { useCallback } from "react";

export const useBankDeposit = (bankAddress: string) => {
  const { account } = useWeb3React();
  const contract = useBankContract(bankAddress);

  const handleDeposit = useCallback(
    async (amount: BigNumber) => {
      const txHash = await deposit(contract, amount, account);
      console.info(txHash);
    },
    [account, contract]
  );

  return {
    onDeposit: handleDeposit,
  };
};
