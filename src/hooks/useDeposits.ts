import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { useStakingContract } from "./useContract";
import usePoller from "./usePoller";
import { useWeb3 } from "./useWeb3";

export interface DepositsState {
  deposits: { amount: BigNumber; start: BigNumber; end: BigNumber }[];
  fetchStatus: FetchStatus;
}

export enum FetchStatus {
  NOT_FETCHED = "not-fetched",
  SUCCESS = "success",
  FAILED = "failed",
}

export const useDeposits = (address: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [balanceState, setBalanceState] = useState<DepositsState>({
    deposits: [],
    fetchStatus: NOT_FETCHED,
  });
  const { account } = useWeb3();
  const { fastRefresh } = usePoller();
  const contract = useStakingContract(address);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const result = await contract.getDepositsOf(account);
        setBalanceState({
          deposits: result.map((item) => ({
            amount: new BigNumber(item.amount.toString()),
            end: new BigNumber(item.end.toString()),
            start: new BigNumber(item.start.toString()),
          })),
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
