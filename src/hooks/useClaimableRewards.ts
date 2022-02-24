import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { ZERO } from "utils/bigNumber";
import { useStakingContract } from "./useContract";
import usePoller from "./usePoller";
import { useWeb3 } from "./useWeb3";
import { Pool } from "config/constants/pools";

export interface TokenBalanceState {
  balance: BigNumber;
  fetchStatus: FetchStatus;
}

export enum FetchStatus {
  NOT_FETCHED = "not-fetched",
  SUCCESS = "success",
  FAILED = "failed",
}

export const useClaimableRewards = (pool: Pool) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [balanceState, setBalanceState] = useState<TokenBalanceState>({
    balance: ZERO,
    fetchStatus: NOT_FETCHED,
  });
  const { fastRefresh } = usePoller();
  const { account } = useWeb3();

  const contract = useStakingContract(pool.poolAddress);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const result = await contract.rewards(account);
        setBalanceState({
          balance: new BigNumber(result.toString()),
          fetchStatus: SUCCESS,
        });
      } catch (e) {
        console.error(e);
        setBalanceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }));
      }
    };
    if (account) {
      fetchBalance();
    }
  }, [account, fastRefresh, contract, SUCCESS, FAILED]);

  return balanceState;
};
