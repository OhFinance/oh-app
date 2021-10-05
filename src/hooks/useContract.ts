import { useMemo } from "react";
import useWeb3 from "./useWeb3";
import { getBankContract, getErc20Contract } from "helpers/contractHelper";
import { useWeb3React } from "@web3-react/core";

export const useERC20Contract = (address: string) => {
  const web3 = useWeb3();
  return useMemo(() => getErc20Contract(address, web3), [address, web3]);
};

export const useBankContract = (address: string) => {
  const web3 = useWeb3();
  return useMemo(() => getBankContract(address, web3), [address, web3]);
};
