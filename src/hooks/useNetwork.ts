import { getBlockExplorerUrl } from "helpers/networkHelper";
import { useWeb3 } from "./useWeb3";

export const useNetwork = () => {
  const { chainId } = useWeb3();

  return {
    blockExplorerUrl: getBlockExplorerUrl(chainId),
  };
};
