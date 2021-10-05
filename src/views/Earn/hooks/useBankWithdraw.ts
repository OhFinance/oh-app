import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { withdraw } from "helpers/callHelper";
import { useBankContract } from "hooks/useContract";
import { useCallback } from "react";

export const useBankWithdraw = (bankAddress: string) => {
  const { account } = useWeb3React();
  const contract = useBankContract(bankAddress);

  const handleWithdraw = useCallback(
    async (amount: BigNumber) => {
      const txHash = await withdraw(contract, amount, account);
      console.info(txHash);
    },
    [account, contract]
  );

  return {
    onWithdraw: handleWithdraw,
  };
};
