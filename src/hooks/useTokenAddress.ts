import { useWeb3React } from "@web3-react/core";
import { Address } from "config/constants/types";
import { useMemo } from "react";

export const useTokenAddress = (addresses: Address): string => {
  const { chainId } = useWeb3React();

  return useMemo(() => addresses[chainId] ?? undefined, [chainId, addresses]);
};
