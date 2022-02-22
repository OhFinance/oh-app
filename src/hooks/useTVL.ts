import BigNumber from "bignumber.js";
import { useEffect, useMemo, useState } from "react";
import { ZERO } from "utils/bigNumber";
import { useERC20Contract } from "./useContract";
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

export const useTVL = (pool: Pool) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [balanceState, setBalanceState] = useState<TokenBalanceState>({
    balance: ZERO,
    fetchStatus: NOT_FETCHED,
  });
  const { fastRefresh } = usePoller();
  const { chainId } = useWeb3();
  const tokenAddress: string | null = useMemo(
    () => pool.token.address?.[chainId] || null,
    [chainId, pool]
  );
  const contract = useERC20Contract(tokenAddress);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const result = await contract.balanceOf(pool.poolAddress);
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
    if (tokenAddress) {
      fetchBalance();
    }
  }, [pool.poolAddress, tokenAddress, fastRefresh, contract, SUCCESS, FAILED]);

  return balanceState;
};
