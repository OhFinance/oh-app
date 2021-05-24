import { useMemo } from "react";
import useWeb3 from "./useWeb3";
import { getErc20Contract } from "utils/contractHelper";

export const useERC20 = (address: string) => {
  const web3 = useWeb3();
  return useMemo(() => getErc20Contract(address, web3), [address, web3]);
};
