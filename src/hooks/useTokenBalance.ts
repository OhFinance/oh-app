import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { balanceOf } from "helpers/callHelper";
import { getErc20Contract } from "helpers/contractHelper";
import { useEffect, useState } from "react";
import { ZERO } from "utils/bigNumber";
import { useERC20Contract } from "./useContract";
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
  const contract = useERC20Contract(tokenAddress);

  useEffect(() => {
    const fetchBalance = async () => {
      // const contract = getErc20Contract(tokenAddress, web3);
      try {
        const result = await balanceOf(contract, account);
        setBalanceState({
          balance: new BigNumber(result),
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

    if (account && contract) {
      fetchBalance();
    }
  }, [
    account,
    tokenAddress,
    contract,
    // web3,
    SUCCESS,
    FAILED,
  ]);

  return balanceState;
};
