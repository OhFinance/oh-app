import BigNumber from "bignumber.js";
import { useTimelockContract } from "hooks/useContract";
import { useWeb3 } from "hooks/useWeb3";
import { useMemo } from "react";
import { useSingleCallResult } from "state/multicall/hooks";
import { ZERO } from "utils/bigNumber";

export const useClaimData = (timelockAddress: string) => {
  const { account } = useWeb3();
  const timelock = useTimelockContract(timelockAddress);

  // the total amount of claimable tokens for a user
  const balancesResult = useSingleCallResult(timelock, "balances", [
    account,
  ]).result;

  // the amount of tokens already claimed
  const claimedResult = useSingleCallResult(timelock, "claimed", [
    account,
  ]).result;

  // the amount of tokens claimable right now
  const claimableResult = useSingleCallResult(timelock, "claimable", [
    account,
  ]).result;

  const totalClaimBalance = useMemo(() => {
    return timelockAddress && balancesResult
      ? new BigNumber(balancesResult.toString())
      : ZERO;
  }, [timelockAddress, balancesResult]);

  const claimedBalance = useMemo(() => {
    return timelockAddress && claimedResult
      ? new BigNumber(claimedResult.toString())
      : ZERO;
  }, [timelockAddress, claimedResult]);

  const claimableBalance = useMemo(() => {
    return timelockAddress && claimableResult
      ? new BigNumber(claimableResult.toString())
      : ZERO;
  }, [timelockAddress, claimableResult]);

  return {
    totalClaimBalance,
    claimedBalance,
    claimableBalance,
  };
};
