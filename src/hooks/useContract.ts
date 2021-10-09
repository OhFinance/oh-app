import { useMemo } from "react";
import {
  getBankContract,
  getERC20Contract,
  getERC20PermitContract,
} from "utils/contractHelper";
import { useWeb3 } from "./useWeb3";

export const useERC20Contract = (address: string) => {
  const { library } = useWeb3();
  return useMemo(
    () => getERC20Contract(address, library.getSigner()),
    [address, library]
  );
};

export const useERC20PermitContract = (address: string) => {
  const { library } = useWeb3();
  return useMemo(
    () => getERC20PermitContract(address, library.getSigner()),
    [address, library]
  );
};

export const useBankContract = (address: string) => {
  const { library } = useWeb3();
  return useMemo(
    () => getBankContract(address, library.getSigner()),
    [address, library]
  );
};
