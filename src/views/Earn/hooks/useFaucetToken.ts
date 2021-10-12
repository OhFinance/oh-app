import BigNumber from "bignumber.js";
import { Address } from "config/constants/types";
import { useERC20FaucetContract } from "hooks/useContract";
import { useWeb3 } from "hooks/useWeb3";
import { useCallback } from "react";
import { allocateTo } from "utils/calls/token";

export const useFaucetToken = (tokenAddress: Address) => {
  const { account, chainId } = useWeb3();
  const faucet = useERC20FaucetContract(tokenAddress[chainId]);

  const handleMint = useCallback(
    async (amount: BigNumber) => {
      const txHash = await allocateTo(faucet, account, amount);
      console.info(txHash);
    },
    [faucet, account]
  );

  return {
    onMint: handleMint,
  };
};
