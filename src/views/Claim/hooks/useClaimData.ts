import BigNumber from "bignumber.js";
import { useTimelockContract } from "hooks/useContract";
import { useWeb3 } from "hooks/useWeb3";
import { useMemo } from "react";
import { useSingleCallResult } from "state/multicall/hooks";
import { ZERO } from "utils/bigNumber";

export const useClaimData = (timelockAddress: string) => {
  const { account } = useWeb3();
  const timelock = useTimelockContract(timelockAddress);
  const inputs = useMemo(() => [account], [account]);

  const timelockStartResult = useSingleCallResult(
    timelock,
    "timelockStart"
  ).result;

  // the total amount of claimable tokens for a user
  const balancesResult = useSingleCallResult(
    timelock,
    "balances",
    inputs
  ).result;

  // the amount of tokens already claimed
  const claimedResult = useSingleCallResult(timelock, "claimed", inputs).result;

  // the amount of tokens claimable right now
  const claimableResult = useSingleCallResult(
    timelock,
    "claimable",
    inputs
  ).result;

  const timelockStart = useMemo(() => {
    return timelockAddress && timelockStartResult
      ? +timelockStartResult.toString()
      : undefined;
  }, [timelockAddress, timelockStartResult]);

  const totalClaimBalance = useMemo(() => {
    return timelockAddress && balancesResult
      ? new BigNumber(balancesResult.toString())
      : undefined;
  }, [timelockAddress, balancesResult]);

  const claimedBalance = useMemo(() => {
    return timelockAddress && claimedResult
      ? new BigNumber(claimedResult.toString())
      : undefined;
  }, [timelockAddress, claimedResult]);

  const claimableBalance = useMemo(() => {
    return timelockAddress && claimableResult
      ? new BigNumber(claimableResult.toString())
      : undefined;
  }, [timelockAddress, claimableResult]);

  return {
    timelockStart,
    totalClaimBalance,
    claimedBalance,
    claimableBalance,
  };
};
