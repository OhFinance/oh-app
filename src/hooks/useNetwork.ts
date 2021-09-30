import { useWeb3React } from "@web3-react/core";
import { getBlockExplorerUrl } from "helpers/networkHelper";

export const useNetwork = () => {
  const { chainId } = useWeb3React();

  return {
    blockExplorerUrl: getBlockExplorerUrl(chainId),
  };
};
