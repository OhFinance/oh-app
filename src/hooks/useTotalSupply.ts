import { useERC20Contract } from "./useContract";
import { useSingleCallResult } from "../state/multicall/hooks";
import BigNumber from "bignumber.js";
import { useMemo } from "react";

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
function useTotalSupply(address?: string) {
  const contract = useERC20Contract(address);

  const totalSupplyResult = useSingleCallResult(contract, "totalSupply").result;

  const totalSupply = useMemo(
    () =>
      address && totalSupplyResult
        ? new BigNumber(totalSupplyResult.toString())
        : undefined,
    [address, totalSupplyResult]
  );

  return totalSupply;
}

export default useTotalSupply;
