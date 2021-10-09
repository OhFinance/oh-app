import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { ZERO } from "utils/bigNumber";
import { getERC20Contract } from "utils/contractHelper";
import { useERC20Contract } from "./useContract";
import usePoller from "./usePoller";
import { useWeb3 } from "./useWeb3";

type UseTokenBalanceState = {
  balance: BigNumber;
  fetchStatus: FetchStatus;
};

export enum FetchStatus {
  NOT_FETCHED = "not-fetched",
  SUCCESS = "success",
  FAILED = "failed",
}

export const useTokenBalance = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: ZERO,
    fetchStatus: NOT_FETCHED,
  });
  const { account } = useWeb3();
  const { fastRefresh } = usePoller();
  const contract = useERC20Contract(tokenAddress);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const result = await contract.balanceOf(account);
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
  }, [account, fastRefresh, contract, tokenAddress, SUCCESS, FAILED]);

  return balanceState;
};
