import BigNumber from "bignumber.js";
import { useMemo } from "react";
import { useSingleCallResult } from "state/multicall/hooks";
import { useEscrowContract } from "./useContract";

import { useWeb3 } from "./useWeb3";

export const useLocks = (
  address: string
): { amount: BigNumber; end: number }[] | null => {
  const { account } = useWeb3();
  const contract = useEscrowContract(address);

  const counterResult = useSingleCallResult(contract, "counter", [account]);

  const counter = useMemo(
    () =>
      counterResult?.error || counterResult?.loading
        ? undefined
        : counterResult?.result?.[0],
    [counterResult]
  );
  const locks = useSingleCallResult(
    counter !== undefined ? contract : undefined,
    "locks",
    [account, counter]
  );
  return useMemo(() => {
    if (locks?.loading || locks?.error || !locks) {
      return null;
    } else {
      return locks?.result?.[0].map((lock) => ({
        amount: new BigNumber(lock.amount.toString()),
        end: lock.end.toNumber(),
      }));
    }
  }, [locks]);
};
