import { useMemo } from "react";
import { getBankContract, getErc20Contract } from "helpers/contractHelper";
import { useWeb3 } from "./useWeb3";

export const useERC20Contract = (address: string) => {
  const { library } = useWeb3();
  return useMemo(() => getErc20Contract(address, library), [address, library]);
};

export const useBankContract = (address: string) => {
  const { library } = useWeb3();
  return useMemo(() => getBankContract(address, library), [address, library]);
};
