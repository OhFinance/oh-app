import { SupportedTestNetworks } from "config/constants/networks";
import { useMemo } from "react";
import { getBlockExplorerUrl } from "utils/networkHelper";
import { useWeb3 } from "./useWeb3";

export const useNetwork = () => {
  const { chainId } = useWeb3();

  const blockExplorerUrl = useMemo(() => {
    if (chainId) {
      return getBlockExplorerUrl(chainId);
    }
    return "";
  }, [chainId]);

  const isTestnet = useMemo(() => {
    return SupportedTestNetworks.includes(chainId);
  }, [chainId]);

  return {
    blockExplorerUrl,
    isTestnet,
  };
};
