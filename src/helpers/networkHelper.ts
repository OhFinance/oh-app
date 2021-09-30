import { Networks } from "config/constants/networks";

export const getBlockExplorerUrl = (chainId: number) => {
  return Networks[chainId].blockExplorerUrls[0];
};
