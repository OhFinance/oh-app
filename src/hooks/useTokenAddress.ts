import { Address } from "config/constants/types";
import { useMemo } from "react";
import { useWeb3 } from "./useWeb3";

export const useTokenAddress = (addresses: Address): string => {
  const { chainId } = useWeb3();

  return useMemo(() => addresses[chainId] ?? undefined, [chainId, addresses]);
};
