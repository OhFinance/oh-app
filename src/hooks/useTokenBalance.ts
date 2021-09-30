import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { getErc20Contract } from "helpers/contractHelper";
import { useEffect, useState } from "react";
import { ZERO } from "utils/bigNumber";
import useWeb3 from "./useWeb3";

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
  const { account } = useWeb3React();
  const web3 = useWeb3();

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getErc20Contract(tokenAddress, web3);
      console.log(contract);
      try {
        const res = await contract.methods.balanceOf(account).call();
        console.log(res);
        setBalanceState({
          balance: new BigNumber(res.toString()),
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
  }, [account, tokenAddress, web3, SUCCESS, FAILED]);

  return balanceState;
};
