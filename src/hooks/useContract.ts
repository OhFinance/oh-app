import { Contract } from "@ethersproject/contracts";
import { useMemo } from "react";
import { getContract } from "utils/contractHelper";
import { useWeb3 } from "./useWeb3";
import ERC20Abi from "config/abi/IERC20.json";
import ERC20PermitAbi from "config/abi/IERC20Permit.json";
import ERC20FaucetAbi from "config/abi/IERC20Faucet.json";
import OhBankAbi from "config/abi/OhBank.json";
import MulticallAbi from "config/abi/Multicall.json";
import OhGovernorAbi from "config/abi/OhGovernor.json";
import OhForumAbi from "config/abi/OhForum.json";
import OhLiquidatorAbi from "config/abi/OhLiquidator.json";
import OhManagerAbi from "config/abi/OhManager.json";
import OhTimelockAbi from "config/abi/OhTimelock.json";
import OhTokenAbi from "config/abi/OhToken.json";
import { useAddress } from "./useAddress";
import contracts from "config/constants/contracts";

export const useContract = (address?: string, abi?: any): Contract | null => {
  const { library, account } = useWeb3();

  return useMemo(() => {
    try {
      return getContract(abi, address, library, account);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, abi, account, library]);
};

export const useERC20Contract = (address: string) => {
  return useContract(address, ERC20Abi);
};

export const useERC20PermitContract = (address: string) => {
  return useContract(address, ERC20PermitAbi);
};

export const useERC20FaucetContract = (address: string) => {
  return useContract(address, ERC20FaucetAbi);
};

export const useMulticallContract = () => {
  const address = useAddress(contracts.multicall);
  return useContract(address, MulticallAbi);
};

export const useTimelockContract = (address: string) => {
  return useContract(address, OhTimelockAbi);
};

export const useBankContract = (address: string) => {
  return useContract(address, OhBankAbi);
};

export const useManagerContract = (address: string) => {
  return useContract(address, OhManagerAbi);
};
